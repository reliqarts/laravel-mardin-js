/**
 * Mardin Inbox - ThreadRow
 *
 * @type {Component}
 */
import React, { Component } from 'react';
import TimeAgo from 'timeago-react';
import { FiCornerDownLeft } from 'react-icons/fi';

import Checkbox from './Checkbox';
import { trimString } from '../utils';

export default class ThreadRow extends Component {
    render() {
        let { thread, selected, onSelect, onClick, userId, hidden } = this.props;
        let lastMessage = thread.latestMessage.data,
            threadClasses = 'thread' + (selected ? ' selected' : '') + (thread.unread ? ' new' : ''),
            senderName = lastMessage.sender.data.name;
        
        if (!hidden) {
            return (
                <tr className={threadClasses} data-thread-id={thread.id} onClick={onClick}>
                    <td className="cbx" colSpan="2" onClick={onSelect}>
                        <Checkbox selected={selected} onSelect={onSelect} label={thread.id}/>
                    </td>
                    <td className="sndr">
                        <img src={lastMessage.sender.data.avatar_24} className="sender-image avatar" width="24" height="24" alt={senderName} />
                        <span>{senderName}</span>
                    </td>
                    <td className="lst">
                        <span className="light">{ (lastMessage.sender.data.id == userId ? <span><FiCornerDownLeft/> </span> : '') }</span>
                        <span>{ trimString(lastMessage.body, 55) }</span>
                    </td>
                    <td className="upd">
                        <span><TimeAgo datetime={thread.updated_at_raw.date} /></span>
                    </td>
                </tr>
            );
        } else return;
    }
};
