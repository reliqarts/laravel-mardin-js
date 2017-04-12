/**
 * Thread Reducer
 */

import update from 'immutability-helper';

import { threadInList } from './inboxReducer';

/**
 * Initial state.
 * @type {Object}
 */
const initialState = {
    title: 'Messages',
    new: 0,
    count: 0,
    threads: [],
    opened: false,
    loading: false,
    loaded: false,
    error: false
};

/**
 * Sort messages is ascending order (latest last).
 * @param  {array} messages) The messages.
 * @return {array}           Sorted messages.
 */
let sortLatestLast = (messages) => messages.sort((a,b) => {
    return new Date(a.created_at_raw.date) - new Date(b.created_at_raw.date);
});

/**
 * The reducer.
 * @param  {object} state  The initial state.
 * @param  {object} action 
 * @return {object}        Next state.
 */
export default (state = initialState, action) => {

    /**
     * Switch on action type to perform relevant actions.
     * @param  {any} action.type
     */
    switch (action.type) {
        case "FETCH_TRAY_THREADS_PENDING": {
            state = {
                ...state, 
                loading: true, 
                loaded: false, 
                count: 0
            };
            break;
        }
        case "FETCHED_TRAY_THREADS":
        case "RECIEVED_TRAY_THREADS": {
            let threads = action.payload;

            // Remove thread user is already reading.
            for (let i = threads.length -1; i >= 0; i--) {
                let thread = threads[i];
                if (thread.url == window.location.href) {
                    threads = update(threads, {$splice: [[i, 1]]});
                }
            }
            // Change state
            state = {
                ...state, 
                loading: false, 
                loaded: true, 
                threads: threads,
                count: threads.length
            };

            break;
        }
        case "FETCH_TRAY_THREADS_ERROR": {
            state = {
                ...state, 
                loading: false, 
                loaded: true, 
                threads: [],
                count: 0,
                error: action.payload
            };
            
            let errorMessage = 'An unexpected error occured while trying to load your messages. Please try again or contact support.';
            switch (action.payload.response.status) {
                case 403:
                    errorMessage = 'Oops! You are not allowed to send or receive messages at this time. Forbidden.';
                    break;
                default: 
                    errorMessage = errorMessage;
                    break;
            }
            alert(errorMessage);

            break;
        }
        case "NEW_MESSAGE": {
            state = {...state};
            const threads = state.threads;

            if (threads) {
                let message = action.payload,
                    thread = message.thread.data,
                    foundAt = threadInList(thread, threads);

                message.isNew = true;
                thread = {
                    ...thread,
                    latestMessage: {data: message},
                    updated_at: message.created_at,
                    updated_at_raw: message.created_at_raw,
                    unread: true
                }

                // Remove from state if found
                if (foundAt >= 0) {
                    state.threads = update(state.threads, {$splice: [[foundAt, 1]]});
                }
                state.threads = update(state.threads, {$unshift: [thread]});
            }

            // Remove thread user is already reading.
            for (let i = state.threads.length -1; i >= 0; i--) {
                let thread = state.threads[i];
                if (thread.url == window.location.href) {
                    state.threads = update(state.threads, {$splice: [[i, 1]]});
                }
            }

            break;
        }
        case "MARKED_THREAD_READ": {
            state = {...state};
            const threads = state.threads,
                thread = action.payload;

            if (threads) {
                let foundAt = threadInList(thread, threads);
                if (foundAt >= 0) {
                    state.threads = update(state.threads, {$splice: [[foundAt, 1]]});
                }
            }

            break;
        }
    }
    return state;
};
