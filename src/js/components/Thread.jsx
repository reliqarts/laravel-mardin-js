/**
 * Mardin Inbox - Thread
 *
 * @type {Component}
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';

import Ad from './Ad';
import MessageRow from './MessageRow';
import * as threadActions from '../actions/threadActions';

@connect((store) => {
    return {
        ...store.thread
    }
})
export default class Thread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newMessageLength: 0,
            isNew: false
        }
    }

    componentWillMount() {
        const { thread } = this.props;

        if (thread) {
            this.props.dispatch(threadActions.fetchMessages(thread.id));
            this.props.dispatch(threadActions.threadOpened(thread));
        }
    }

    componentDidMount() {
        const { app, isNew } = this.props;

        this.setState({isNew: isNew});

        if (app.polish !== undefined) app.polish();
    }

    componentDidUpdate() {
        this.markAsRead()
        this.scrollToBottom();
    }
    
    render() {
        let { subject, messages, loading, userId, sending, maxText, minText, participants, created_at, infoLine } = this.props,
            { isNew, newMessageLength } = this.state,
            threadClasses = 'messages results sr-card',
            messageRows   = messages.map(m => <MessageRow key={m.id} message={m} userId={userId} />),
            sendBtnIcon   = 'icon ' + (sending ? 'icon-f-email-send-3' : 'icon-f-email-send-2'),
            teCharCounterClasses = 'char-count' + (newMessageLength > maxText || newMessageLength < minText ? ' red' : ''),
            subjectClasses = 'subject' + (isNew ? ' new' : '');

        if (loading) threadClasses += ' loading';
        if (sending) threadClasses += ' sending';


        return (
            <section id="mardin-in" className={threadClasses} data-loadable="true">
                <div className="card-title">
                    <h1 className={subjectClasses} contentEditable={isNew} ref="subjectHeading">{subject}</h1>
                    <div className="info-bar">
                        <small>
                            { infoLine ? 
                            <span>{infoLine}</span> 
                            : <span>Started {created_at} with {participants} and You</span>
                            }
                        </small>

                        <ul id="mardin-in-actions" className="mardin-actions">
                            <li>
                                <a href="#" title="Mark this thread as unread." onClick={this.handleMarkAsUnread.bind(this)}>
                                    <span className="icon-email-2 icon-only"></span>
                                </a>
                            </li>
                            {/*<li>
                                <a href="#" title="Delete this thread. This action may be permanent." onClick={this.handleDelete.bind(this)}>
                                    <span className="icon-bin-1 icon-only"></span>
                                </a>
                            </li>*/}
                        </ul>
                    </div>
                </div>

                {/* Render messages or appropriate status. */}
                { messages.length ?
                <div id="thread-messages" 
                    className="card-core thread-messages" 
                    ref={(el) => { this.messageList = el; }}>
                    { messageRows }
                </div>
                : !loading ? 
                <p className="empty">
                    <span className="icon icon-3x icon-only icon-quill-ink"></span>
                    <span>This is the very begining of this thread. Write away...</span>
                </p> 
                : '' }

                <div id="thread-updater" className="card-footer thread-updater">
                    {/*<Ad classes="mt-0"></Ad>*/}
                    <form className="card-form">
                        <div className="field new-message te">
                            <textarea 
                                ref="newMessageTextarea" 
                                placeholder="Type your message here..." 
                                disabled={sending}
                                minLength={minText}
                                maxLength={maxText}
                                onKeyUp={ev => this.handleNewMessageTextUpdated(ev)}/>
                            <div className="te-companion">
                                <small>
                                    <span>Character count: </span>
                                    <span className={teCharCounterClasses}>{newMessageLength}</span> / <span>{maxText}</span>
                                </small>
                            </div>
                        </div>
                        <div className="actions">
                            <div className="action-info">
                                <span>
                                    <span className="icon icon-delete-2"></span> 
                                    <span>Never share sensitive information via this medium.</span>
                                    </span>
                            </div>
                            <div className="buttons">
                                <button type="submit" className="btn btn-primary" onClick={ev => this.handleSendNewMessage(ev)} disabled={sending}>
                                    <span className={sendBtnIcon}></span>
                                    <span>Send</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }

    /**
     * Send a new message.
     * @param  {object} ev Click event.
     */
    handleSendNewMessage(ev) {
        ev.preventDefault();

        let { newMessageTextarea, subjectHeading } = this.refs,
            { thread, recipients, minText, maxText, id } = this.props,
            { isNew } = this.state,
            messageText = newMessageTextarea.value,
            threadSubject = subjectHeading.innerText;

        if (messageText.length >= minText && messageText.length < maxText) {
            this.refs.newMessageTextarea.value = '';
            if (!id) this.props.dispatch(threadActions.newThreadStarted());
            this.props.dispatch(threadActions.sendMessage(messageText, id, recipients, threadSubject));
        } else {
            window.noty.error(`Please check the length of your message. Must be ${minText} - ${maxText} characters in length.`);
        }
    }

    /**
     * When a new message is updated.
     * @param  {[type]} ev [description]
     * @return {[type]}    [description]
     */
    handleNewMessageTextUpdated(ev) {
        ev.preventDefault();
        this.setState({
            newMessageLength: this.refs.newMessageTextarea.value.length
        });
    }

    /**
     * Handle mark as unread.
     * @param  {object} ev 
     * @return {void}    
     */
    handleMarkAsUnread(ev) {
        ev.preventDefault();
        this.props.dispatch(threadActions.markAsUnread(this.props.id));
    }

    /**
     * Mark this thread as read.
     */
    markAsRead() {
        if (this.props.unread) {
            this.props.dispatch(threadActions.markAsRead(this.props.id));
        }
    }

    /**
     * Handle delete.
     * @param  {object} ev
     * @return {void}   
     */
    handleDelete(ev) {
        ev.preventDefault();
        let { props } = this;

        window.noty({
            text: 'Are you sure you want to delete this thread?',
            buttons: [
                {
                    addClass: 'btn btn-primary', 
                    text: 'Yes',
                    onClick: function($noty) {
                        $noty.close();
                        props.dispatch(threadActions.deleteThread(props.id));
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

    /**
     * Scroll to bottom of message container.
     */
    scrollToBottom() {
        if (!this.messageList) return;
        const scrollHeight = this.messageList.scrollHeight,
            height = this.messageList.clientHeight,
            maxScrollTop = scrollHeight - height;

        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
}