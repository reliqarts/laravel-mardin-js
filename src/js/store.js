/**
 * Message Store
 */

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import { applyMiddleware, createStore } from 'redux';

import reducer from './reducers';

let middleware = [promise(), thunk],
    enableDevMiddleware = false;

// debugging middleware
if (enableDevMiddleware && /(localhost|\.dev)/i.test(location.href)) {
    middleware = [ 
        ...middleware, 
        logger()
    ];
}

export default createStore(reducer, applyMiddleware(...middleware));
