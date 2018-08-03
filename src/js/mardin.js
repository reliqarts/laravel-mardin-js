/**
 * Mardin
 * Laravel Messenger pigeon. ^.^
 * @author ReliQ (@IAmReliQ)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory, useBasename } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import { Route, Router, IndexRoute, hashHistory, Redirect } from 'react-router';

import store from './store';
import Tray from './components/Tray';
import Inbox from './components/Inbox';
import Thread from './components/Thread';
import ThreadStack from './components/ThreadStack';
import * as inboxActions from './actions/inboxActions';

export default class Mardin {
    /**
     * Constructor
     * @param  {object} app Application instance.
     */
    constructor(app) {
        this.Echo = window.Echo;
        this.app = app || {};
        this.listen();

        if (this.loaded && window.mardinBase) {
            if (log === undefined) {
                var log = console.log.bind(this);
            }
            log('Mardin ready ^_^');
        }
    }

    /**
     * Listen/run mardin.
     * @return {object} Instance of self.
     */
    listen() {
        let _self = this,
            trayRoot = $('div[data-mardin-inbox-tray="true"]');
        if (trayRoot.length && trayRoot.data('mardin-user') && trayRoot.data('mardin-base')) {
            // User is authenticated
            const user = trayRoot.data('mardin-user'),
                mardinBase = trayRoot.data('mardin-base'),
                mardinAd = trayRoot.data('mardin-ad'),
                mardinTrayRoot = trayRoot,
                mardinInboxRoot = $('div[data-mardin-inbox="true"]'),
                mardinThreadRoot = $('div[data-mardin-inbox-thread="true"]');

            // Avail global (window) props
            window.mardinBase = mardinBase;
            window.mardinAd = mardinAd || false;

            // Listen for user messages
            this.Echo.private(`Mardin.Messages.User.${user}`).listen('.newMessage', e => {
                let message = e.message.data;
                store.dispatch(inboxActions.newMessage(message));
            });

            // Mardin Inbox
            if (mardinInboxRoot.length) {
                // Set basename for use with Router
                const browserHistory = useBasename(createHistory)({
                    basename: `/${mardinBase}`
                });

                // Create an enhanced history that syncs navigation events with the store
                const history = syncHistoryWithStore(browserHistory, store);

                history.listen(location => this.handleInboxViewChanged(location));

                // Render Inbox
                ReactDOM.render(
                    <Provider store={store}>
                        <Router history={history}>
                            <Route
                                path="/"
                                component={Inbox}
                                onViewChanged={this.handleInboxViewChanged.bind(this)}
                                userId={user}
                                app={this.app}
                            >
                                <IndexRoute component={ThreadStack} />
                                <Route path="unread" component={ThreadStack} />
                                <Route path="starred" component={ThreadStack} />
                                <Route path="archived" component={ThreadStack} />
                                <Route path="trashed" component={ThreadStack} />
                            </Route>
                        </Router>
                    </Provider>,
                    mardinInboxRoot.get(0)
                );
            }

            // Mardin Inbox Thread
            if (mardinThreadRoot.length) {
                // Set update url
                const thread = mardinThreadRoot.data('thread'),
                    recipients = mardinThreadRoot.data('recipients') || null,
                    subject = mardinThreadRoot.data('subject') || thread.subject,
                    infoLine = mardinThreadRoot.data('info-line') || null,
                    isNew = !thread;

                // Render Inbox
                ReactDOM.render(
                    <Provider store={store}>
                        <Thread
                            thread={thread}
                            userId={user}
                            recipients={recipients}
                            app={this.app}
                            isNew={isNew}
                            subject={subject}
                            infoLine={infoLine}
                        />
                    </Provider>,
                    mardinThreadRoot.get(0)
                );
            }

            // Mardin tray
            if (mardinTrayRoot.length) {
                ReactDOM.render(
                    <Provider store={store}>
                        <Tray userId={user} app={this.app} />
                    </Provider>,
                    mardinTrayRoot.get(0)
                );
            }

            _self.loaded = true;
        }
        return _self;
    }

    /**
     * On changing view, fire actions to update state.
     *
     * @param  {object} location
     * @return {void}
     */
    handleInboxViewChanged(location) {
        let view = location.pathname.replace(/\//, '') || 'all';
        store.dispatch(inboxActions.changeView(view));
        store.dispatch(inboxActions.fetchThreads(view));
        store.dispatch(inboxActions.changeSubtitle(view));
    }
}
