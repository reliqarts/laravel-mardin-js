/**
 * User Reducer
 */

import update from 'immutability-helper';

const initialState = {
    title: 'Inbox',
    subtitle: 'All',
    new: 0,
    loading: false,
    loaded: false,
    threads: [],
    view: 'all',
    error: false,
    selected: [],
    fooref: 0
};

/**
 * Checks if thread exists in list.
 * @param  {object} thread  As returned from Server.
 * @param  {array} threads State threads.
 * @return {int}         Integer index of thread in threads array.
 */
let threadInList = (thread, threads) => {
    let index = -1;
    threads.some((et, i) => {
        index = i;
        return et.id == thread.id;
    });
    return index;
};

export default (state = initialState, action) => {
    switch (action.type) {
        // A forced change of state.
        case "REFRESH": {
            state = {...state, fooref: state.fooref++};
            break;
        }
        case "CHANGE_TITLE": {
            state = {...state, title: action.payload.capitalizeFirstLetter()};
            break;
        }
        case "CHANGE_SUBTITLE": {
            state = {...state, subtitle: action.payload.capitalizeFirstLetter()};
            break;
        }
        case "NEW_THREAD": {
            state = {...state, count: state.new++};
            break;
        }
        case "FETCH_THREADS_PENDING": {
            state = {
                ...state, 
                loading: true, 
                loaded: false, 
                count: 0
            };
            break;
        }
        case "FETCHED_THREADS":
        case "RECIEVED_THREADS": {
            state = {
                ...state, 
                loading: false, 
                loaded: true, 
                threads: action.payload,
                count: action.payload.length
            };
            break;
        }
        case "FETCH_THREADS_ERROR": {
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
        case "CHANGE_VIEW": {
            state = {...state, view: action.payload};
            break;
        }
        case "THREAD_SELECTED": {
            state = {...state};
            const selected = state.selected;

            if (!selected.includes(action.payload))
                state.selected = [...selected, action.payload];
            else
                state.selected = update(selected, {$splice: [[selected.indexOf(action.payload), 1]]});
            break;
        }
        case "ALL_THREADS_SELECTED": {
            state = {...state};

            switch (state.selected.length) {
                case state.count:
                    state.selected = [];
                    break;
                default:
                    state.selected = state.threads.map(t => t.id);
                    break;
            }
            break;
        }
        case "OPEN_THREAD": {
            state = {...state};

            if (!state.threads.includes(action.payload))
                window.location = `${window.mardinBase}/view/${action.payload}`;
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

            break;
        }
        case "MARKED_AS_READ": {
            state = {...state};
            const selected = state.selected;

            state.threads.forEach((thread, i) => {
                if (selected.includes(thread.id)) {
                    thread = {...thread, unread: false};
                    state.threads = update(state.threads, {$splice: [[i, 1, thread]]});
                    state.selected = update(selected, {$splice: [[selected.indexOf(thread.id), 1]]});
                }
            });
            break;
        }
        case "MARKED_AS_UNREAD": {
            state = {...state};
            const selected = state.selected;

            state.threads.forEach((thread, i) => {
                if (selected.includes(thread.id)) {
                    thread = {...thread, unread: true};
                    state.threads = update(state.threads, {$splice: [[i, 1, thread]]});
                    state.selected = update(selected, {$splice: [[selected.indexOf(thread.id), 1]]});
                }
            });
            break;
        }
        case "SELECTION_DELETED": {
            state = {...state};
            const selected = state.selected;
            let threads = state.threads;

            for (var i = state.threads.length -1; i >= 0; i--) {
                var thread = state.threads[i];
                if (selected.includes(thread.id)) {
                    console.log('Attempt to remove '+ thread);
                    thread = {...thread, unread: false, hidden: true};
                    state.threads = update(state.threads, {$splice: [[i, 1]]});
                    state.selected = update(selected, {$splice: [[selected.indexOf(thread.id), 1]]});
                }
            }
            break;
        }
    }
    return state;
};

export { threadInList };