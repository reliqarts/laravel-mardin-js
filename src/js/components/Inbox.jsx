/**
 * Mardin Inbox - Inbox
 *
 * @type {Component}
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Ad from './Ad';
import Nav from './InboxNav';
import StyledInbox from './styled/Inbox';
import { IoMdMailOpen, IoMdMailUnread } from 'react-icons/io';
import * as inboxActions from '../actions/inboxActions';

@connect(store => {
    return {
        ...store.inbox
    };
})
export default class Inbox extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // Initial View Setup
        this.props.route.onViewChanged(this.props.location);

        this.propsForChildren = {
            onSelectThread: this.handleSelectThread.bind(this),
            onSelectAll: this.handleSelectAllThreads.bind(this),
            onThreadRowClicked: this.handleOpenThread.bind(this),
            userId: this.props.route.userId
        };
    }

    componentDidMount() {
        const { app } = this.props.route;

        if ($.isFunction(app.polish)) {
            app.polish();
        }
    }

    render() {
        let subtitle = this.props.subtitle,
            inboxInnerClasses = 'threads results sec-card sr-card';

        if (this.props.loading) inboxInnerClasses += ' loading';

        return (
            <StyledInbox>
                <Nav />
                <main className="sec-main sr-main">
                    {window.adsbygoogle ? <Ad /> : ''}
                    <section id="mardin-in" className={inboxInnerClasses} data-loadable="true">
                        <div className="card-title">
                            <span>{subtitle}</span>
                            {this.props.selected.length ? (
                                <ul id="mardin-in-actions" className="mardin-actions">
                                    <li>
                                        <a
                                            href="#"
                                            title="Mark as Read"
                                            onClick={this.handleMarkSelectedAsRead.bind(this)}
                                        >
                                            <IoMdMailOpen/>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            title="Mark as Unread"
                                            onClick={this.handleMarkSelectedAsUnread.bind(this)}
                                        >
                                            <IoMdMailUnread/>
                                        </a>
                                    </li>
                                    {/*<li>
                                            <a href="#" title="Delete" onClick={this.handleDeleteSelected.bind(this)}>
                                                <span className="icon-bin-1 icon-only"></span>
                                            </a>
                                        </li>*/}
                                </ul>
                            ) : null}
                        </div>

                        {/* render children (this.props.children), while passing props to them: */}
                        {React.Children.map(this.props.children, child =>
                            React.cloneElement(child, {
                                ...this.props,
                                ...this.propsForChildren
                            })
                        )}
                    </section>
                </main>
            </StyledInbox>
        );
    }

    handleSelectThread(ev, thread) {
        ev.stopPropagation();
        this.props.dispatch(inboxActions.threadSelected(thread.id));
    }

    handleSelectAllThreads(ev, threads) {
        ev.stopPropagation();
        this.props.dispatch(inboxActions.allThreadsSelected());
    }

    handleOpenThread(ev, thread) {
        ev.stopPropagation();
        this.props.dispatch(inboxActions.openThread(thread.id));
    }

    handleMarkSelectedAsRead(ev) {
        ev.preventDefault();
        this.props.dispatch(inboxActions.markSelectedAsRead(this.props.selected));
    }

    handleMarkSelectedAsUnread(ev) {
        ev.preventDefault();
        this.props.dispatch(inboxActions.markSelectedAsUnread(this.props.selected));
    }

    handleDeleteSelected(ev) {
        ev.preventDefault();
        let { props } = this;

        noty({
            text: 'Are you sure you want to delete the selected threads?',
            buttons: [
                {
                    addClass: 'btn btn-primary',
                    text: 'Yes, delete them',
                    onClick: function($noty) {
                        $noty.close();
                        props.dispatch(inboxActions.deleteSelected(props.selected));
                    }
                },
                {
                    addClass: 'btn btn-danger',
                    text: 'Cancel',
                    onClick: function($noty) {
                        $noty.close();
                        return false;
                    }
                }
            ]
        });
    }
}
