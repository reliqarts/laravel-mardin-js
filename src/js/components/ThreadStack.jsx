/**
 * Mardin Inbox - Inbox
 *
 * @type {Component}
 */
import React, { Component } from 'react';

import ThreadRow from './ThreadRow';
import Checkbox from './Checkbox';

export default class ThreadStack extends Component {
    render() {
        let { threads, selected, onSelectThread, onSelectAll, onThreadRowClicked, userId, loading } = this.props,
            stackClasses = 'table mardin thread-list row';

        let threadRows = threads.map(t => 
            <ThreadRow 
                key={t.id} 
                thread={t} 
                selected={selected.includes(t.id)} 
                onSelect={ev => onSelectThread(ev, t)}
                onClick={ev => onThreadRowClicked(ev, t)}
                userId={userId}
                hidden={t.hidden} />
        );

        return (
            <div> 
                {/* Render threads or appropriate status. */}
                { threads.length ?
                <table className={stackClasses}>
                    <thead>
                        <tr>
                            <th className="cbx" colSpan="2" onClick={ev => onSelectAll(ev, threads)}>
                                <Checkbox 
                                    selected={threads.length && (selected.length == threads.length)} 
                                    onSelect={ev => onSelectAll(ev, threads)} 
                                    label="all" 
                                    iconClass="double" />
                            </th>
                            <th className="sndr">Sender</th>
                            <th className="lst">Last Message</th>
                            <th className="upd">Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {threadRows}
                    </tbody>
                </table>
                : !loading ?
                <p className="empty">
                    <span className="icon icon-3x icon-only icon-quill-ink"></span>
                    <span>Empty... isn't it?</span>
                </p> 
                : ''}
            </div>
        );
    }
};
