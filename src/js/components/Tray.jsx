/**
 * Mardin Inbox - Tray
 *
 * @type {Component}
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';

import MessageRow from './MessageRow';
import * as inboxActions from '../actions/inboxActions';
import * as trayActions from '../actions/trayActions';

@connect((store) => {
    return {
        ...store.tray
    }
})
export default class Tray extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    componentWillMount() {
        this.handleLoad();
    }

    componentDidMount() {
        const { app } = this.props;
        this._isMounted = true;
        // Allow tray auto-close
        this.allowAutoClose();
        // Polish app
        if ($.isFunction(app.polish)) {
            app.polish();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        let { loading, threads, title, userId } = this.props,
            { open } = this.state,
            trayClasses = 'dropdown-container tray-container inbox-m',
            trayTrayClasses = 'tray',
            count = threads.length,
            onThreadClicked = this.handleOpenThread.bind(this),
            messageRows = threads.map(t => {
                let m = t.latestMessage.data;
                return (
                    <li key={`${m.id}-li`}>
                        <MessageRow 
                            key={m.id} 
                            message={m} 
                            userId={userId} 
                            onClick={(ev) => onThreadClicked(ev, t.id)}
                            messageLength="50" />
                    </li>
                )
            });
        
        if (this.props.loading) {
            trayClasses += ' loading';
            trayTrayClasses += ' loading';
        }

        if (open) trayClasses += ' open';

        return (
            <div id="mardin-tray-container" className={trayClasses}>
                <a href="javascript:void(0)" className="tray-toggle dropdown-toggle" onClick={(ev) => this.handleTriggerClicked(ev)}>
                    <span className="icon fa fa-inbox fa-lg icon-only"></span>
                    { count ?
                    <aside className="tray-count">{count}</aside>
                    : ''}
                </a>
                <div id="mardin-tray" className={trayTrayClasses} data-loadable="true">
                    <div className="tray-inner">
                        <div className="tray-title">
                            <span>{title}</span>
                        </div>
                        <div className="tray-body">
                            {/* Render threads or appropriate status. */}
                            { count ?
                            <ul>
                                {messageRows}
                            </ul>
                            : !loading ?
                            <p className="empty">
                                <span className="icon icon-f-inbox-1 icon-3x icon-only"></span>
                                <span>You have no new messages.</span>
                            </p> 
                            : ''}
                        </div>
                        <div className="tray-footer">
                            <a href={window.mardinBase}>Open Inbox</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Allow tray auto-close.
     */
    allowAutoClose() {
        const tray = this;

        // Allow tray to auto-close
        $('body *').on('click', function(ev) {
            if (!$(ev.target).closest('div[data-mardin-inbox-tray="true"]').length && tray._isMounted) {
                tray.setState({
                    open: false
                });
            }
        });
    }

    /**
     * Handle tray loading.
     * @param  {object} app Application instance.
     * @return {void}
     */
    handleLoad(app) {
        this.props.dispatch(trayActions.fetchThreads('new'));
    }

    /**
     * Open thread for selected message.
     * @param  {object} ev  
     * @param  {int} threadId 
     * @return {void}    
     */
    handleOpenThread(ev, threadId) {
        ev.stopPropagation();
        this.props.dispatch(inboxActions.openThread(threadId));
    }

    /**
     * Handle opening and closing of tray.
     * @param  {object} ev Event
     */
    handleTriggerClicked(ev) {
        ev.stopPropagation();
        let { open } = this.state;

        this.setState({
            open: !open
        });
    }
}