import { combineReducers } from 'redux';

import inbox from './inboxReducer';
import thread from './threadReducer';
import tray from './trayReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    inbox,
    thread,
    tray,
    routing: routerReducer
});

