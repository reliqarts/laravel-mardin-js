/**
 * Tray Actions
 */

import store from '../store';

export function fetchThreads(view) {
    let type = view || 'all';

    return {
        type: 'FETCH_TRAY_THREADS',
        payload: axios.get(`/${mardinBase}/in/${type}.json`)
            .then((response) => {
                store.dispatch({type: 'FETCHED_TRAY_THREADS', payload: response.data.data});
            })
            .catch((error) => {
                store.dispatch({type: 'FETCH_TRAY_THREADS_ERROR', payload: error});
            })
    }
}