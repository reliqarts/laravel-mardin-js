/**
 * Inbox Actions
 */

import store from '../store';

export function fetchThreads(view) {
    let type = view || 'all';

    return {
        type: 'FETCH_THREADS',
        payload: axios.get(`/${mardinBase}/in/${type}.json`)
            .then((response) => {
                store.dispatch({type: 'FETCHED_THREADS', payload: response.data.data});
            })
            .catch((error) => {
                store.dispatch({type: 'FETCH_THREADS_ERROR', payload: error});
            })
    }
}

export function changeTitle(title) {
    return {
        type: 'CHANGE_TITLE',
        payload: title
    }
}

export function changeSubtitle(subtitle) {
    return {
        type: 'CHANGE_SUBTITLE',
        payload: subtitle
    }
}

export function changeView(pathname) {
    return {
        type: 'CHANGE_VIEW',
        payload: pathname
    }
}

export function threadSelected(threadId) {
    return {
        type: 'THREAD_SELECTED',
        payload: threadId
    }
}

export function allThreadsSelected() {
    return {
        type: 'ALL_THREADS_SELECTED',
        payload: 'all'
    }
}

export function openThread(threadId) {
    return {
        type: 'OPEN_THREAD',
        payload: threadId
    }
}

export function fooRef() {
    return {
        type: 'REFRESH',
        payload: 'ha'
    }
}

export function newMessage(message) {
    return {
        type: 'NEW_MESSAGE',
        payload: message
    }
}

export function markSelectedAsRead(threads) {
    let url  = `/${mardinBase}/mr`,
        data = {threads: threads};
    return {
        type: 'MARK_AS_READ',
        payload: axios.post(url, data)
            .then((response) => {
                store.dispatch({
                    type: 'MARKED_AS_READ', 
                    payload: {
                        threads: response.data.data
                    }
                });
                noty.success(`Selection successfully marked as read.`);
            })
            .catch((error) => {
                store.dispatch({type: 'MARK_AS_READ_ERROR', payload: error});
            })
    }
}

export function markSelectedAsUnread(threads) {
    let url  = `/${mardinBase}/mur`,
        data = {threads: threads};
    return {
        type: 'MARK_AS_UNREAD',
        payload: axios.post(url, data)
            .then((response) => {
                store.dispatch({
                    type: 'MARKED_AS_UNREAD', 
                    payload: {
                        threads: response.data.data
                    }
                });
                noty.success(`Selection successfully marked as unread.`);
            })
            .catch((error) => {
                store.dispatch({type: 'MARK_AS_UNREAD_ERROR', payload: error});
            })
    }
}

export function deleteSelected(threads) {
    let url  = `/${mardinBase}/del`,
        data = {threads: threads};
    return {
        type: 'DELETE_SELECTED',
        payload: axios.post(url, data)
            .then((response) => {
                store.dispatch({
                    type: 'SELECTION_DELETED', 
                    payload: {
                        threads: response.data.data
                    }
                });
                noty.success(`Selection deleted successfully.`);
            })
            .catch((error) => {
                store.dispatch({type: 'DELETE_SELECTED_ERROR', payload: error});
            })
    }
}