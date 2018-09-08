import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import createHistory from 'history/createBrowserHistory';
// import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';

// import appModalMiddleware from 'middlewares/appModalMiddleware';
// import errorsHandlerMiddleware from 'middlewares/errorsHandlerMiddleware';
// import locationMiddleware from 'middlewares/locationMiddleware';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

//export const history = createHistory();
//const routerMiddleware = createRouterMiddleware(history);

export default function configureStore(initialState = {}) {
    const middlewares = [
        sagaMiddleware,
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV === 'development' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    /* eslint-enable */

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(...enhancers),
    );

    sagaMiddleware.run(rootSaga);

    // if (module.hot) {
    //     module.hot.accept('./reducers', () => {
    //         const nextReducers = require('./reducers'); // eslint-disable-line global-require
    //         store.replaceReducer(nextReducers);
    //     });
    // }

    return store;
}
