/**
 * Mardin Inbox - MessageRow
 *
 * @type {Component}
 */
import React, { Component } from 'react';
import TimeAgo from 'timeago-react'

export default class MessageRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNew: false
        }
    }

    componentDidMount() {
        this.setState({isNew: this.props.message.isNew});

        setTimeout(() => this.setState({isNew: false}), 5000);
    }

    render() {
        let { message, userId, onClick, messageLength } = this.props,
            { isNew } = this.state,
            sender = message.sender.data,
            mine = sender.id == userId,
            messageClasses = 'message' + (mine ? ' mine' : '') + (isNew ? ' new' : ''),
            senderName = mine ? 'Me' : sender.name
            onClick = onClick || false;
        
        return (
            <div className={messageClasses} data-message-id={message.id} onClick={onClick}>
                <div className="sndr">
                    <a href={sender.url}>
                        <img src={sender.avatar_64} className="sender-image avatar" width="64" height="64" alt={senderName} />
                    </a>
                </div>
                <div className="bdy-upd">
                    <span className="sndr-name">{senderName}</span>
                    <p className="bdy">{messageLength ? trimString(message.body) : message.body}</p>
                    <small className="upd">
                        <TimeAgo datetime={message.created_at_raw.date} />
                    </small>
                </div>
            </div>
        );
    }
};
