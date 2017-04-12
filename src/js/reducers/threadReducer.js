/**
 * Thread Reducer
 */

import update from 'immutability-helper';

/**
 * Initial state.
 * @type {Object}
 */
const initialState = {
    id: null,
    count: 0,
    messages: [],
    opened: false,
    loading: false,
    loaded: false,
    error: false,
    sending: false,
    minText: 2,
    maxText: 500,
    unread: false,
    justStarted: false
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
        case "NEW_MESSAGE": {
            let message = action.payload;

            state = {...state};
            message.isNew = true;
            if (state.id && state.id == message.thread_id)
                state.messages = update(state.messages, {$push: [message]});

            state = {
                ...state,
                unread: true
            }

            break;
        }
        case "THREAD_OPENED": {
            state = {
                ...state, 
                ...action.payload
            };
            break;
        }

        case "NEW_THREAD_STARTED": {
            state = {
                ...state, 
                justStarted: true
            };
            break;
        }

        case "FETCH_MESSAGES_PENDING": {
            state = {
                ...state, 
                loading: true, 
                loaded: false, 
                count: 0
            };
            break;
        }
        case "FETCHED_MESSAGES":
        case "RECIEVED_MESSAGES": {
            let { messages, thread } = action.payload

            messages = sortLatestLast(messages);
            state = {
                ...state, 
                ...thread,
                loading: false, 
                loaded: true, 
                count: state.count + messages.length
            };
            state.messages = update(state.messages, {$unshift: messages});

            break;
        }
        case "FETCH_MESSAGES_ERROR": {
            state = {
                ...state, 
                loading: false, 
                loaded: true, 
                messages: [],
                count: 0,
                error: action.payload
            };
            
            let errorMessage = 'An unexpected error occured while trying to load your messages. Please try again or contact support.';
            switch (action.payload.response.status) {
                case 403:
                    errorMessage = 'Oops! You are not allowed to receive messages at this time. Forbidden.';
                    break;
                default: 
                    errorMessage = errorMessage;
                    break;
            }
            alert(errorMessage);

            break;
        }
        case "SEND_MESSAGE_PENDING": {
            state = {...state, sending: true};
            break;
        }
        case "SENT_MESSAGE": {
            let { message } = action.payload;

            state = {...state, count: state.count + 1, sending: false};
            state.messages = update(state.messages, {$push: [message]});
            state.id = message.thread_id;

            if (state.justStarted) {
                console.log('Hooray!');
                window.noty.success('Message sent!');
                window.location = `${window.mardinBase}/view/${state.id}`;
            }

            break;
        }
        case "SEND_MESSAGE_ERROR": {
            state = {
                ...state, 
                loading: false, 
                loaded: true, 
                messages: [],
                count: 0,
                error: action.payload
            };
            
            let errorMessage = 'An unexpected error occured while trying to load your messages. Please try again or contact support.';
            switch (action.payload.response.status) {
                case 403:
                    errorMessage = 'Oops! You are not allowed to send messages at this time. Forbidden.';
                    break;
                default: 
                    errorMessage = errorMessage;
                    break;
            }
            alert(errorMessage);

            break;
        }
        case "MARKED_THREAD_READ": {
            state = {...state};
            const thread = action.payload;

            if (thread.id == state.id) {
                state = {
                    ...state,
                    unread: false
                }
            }

            break;
        }
    }
    return state;
};
