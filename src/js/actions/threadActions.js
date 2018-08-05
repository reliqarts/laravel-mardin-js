/**
 * Thread Actions
 */

import store from '../store';

export function fetchMessages(threadId, limit, p) {
    limit = limit || 100;
    p = p || 1;

    return {
        type: 'FETCH_MESSAGES',
        payload: axios
            .get(`/${mardinBase}/t/${threadId}/messages.json?limit=${limit}&p=${p}`)
            .then(response => {
                store.dispatch({
                    type: 'FETCHED_MESSAGES',
                    payload: {
                        messages: response.data.messages.data,
                        thread: response.data.thread.data
                    }
                });
            })
            .catch(error => {
                store.dispatch({ type: 'FETCH_MESSAGES_ERROR', payload: error });
            })
    };
}

export function threadOpened(thread) {
    return {
        type: 'THREAD_OPENED',
        payload: thread
    };
}

export function sendMessage(message, threadId, recipients, threadSubject) {
    threadId = threadId || false;
    let url = threadId ? `/${mardinBase}/u/${threadId}` : `/${mardinBase}`,
        data = { message: message };

    if (recipients && recipients.length) {
        data.recipients = recipients;
    }

    if (threadSubject && threadSubject.length) {
        data.subject = threadSubject;
    }

    return {
        type: 'SEND_MESSAGE',
        payload: axios
            .post(url, data)
            .then(response => {
                store.dispatch({
                    type: 'SENT_MESSAGE',
                    payload: {
                        message: response.data.data
                    }
                });
            })
            .catch(error => {
                store.dispatch({ type: 'SEND_MESSAGE_ERROR', payload: error });
            })
    };
}

export function markAsUnread(threadId) {
    let url = `/${mardinBase}/mur`,
        data = { threads: [threadId] };
    return {
        type: 'MARK_THREAD_UNREAD',
        payload: axios
            .post(url, data)
            .then(response => {
                store.dispatch({
                    type: 'MARKED_THREAD_UNREAD',
                    payload: {
                        threads: response.data.data
                    }
                });
                noty.success('Thread successfully marked as unread.');
                window.location.href = `/${mardinBase}`;
            })
            .catch(error => {
                store.dispatch({ type: 'MARK_THREAD_UNREAD_ERROR', payload: error });
            })
    };
}

export function markAsRead(threadId) {
    let url = `/${mardinBase}/mr`,
        data = { threads: [threadId] };
    return {
        type: 'MARK_THREAD_READ',
        payload: axios
            .post(url, data)
            .then(response => {
                store.dispatch({
                    type: 'MARKED_THREAD_READ',
                    payload: response.data.data[0]
                });
            })
            .catch(error => {
                store.dispatch({ type: 'MARK_THREAD_UNREAD_ERROR', payload: error });
            })
    };
}

export function deleteThread(threadId) {
    let url = `/${mardinBase}/del`,
        data = { threads: [threadId] };
    return {
        type: 'DELETE_THREAD',
        payload: axios
            .post(url, data)
            .then(response => {
                store.dispatch({
                    type: 'THREAD_DELETED',
                    payload: {
                        threads: response.data.data
                    }
                });
                noty.success('Thread deleted successfully.');
                window.location.href = `/${mardinBase}`;
            })
            .catch(error => {
                store.dispatch({ type: 'DELETE_THREAD_ERROR', payload: error });
            })
    };
}

export function newThreadStarted() {
    return {
        type: 'NEW_THREAD_STARTED',
        payload: true
    };
}
