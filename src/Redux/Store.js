import { createStore, applyMiddleware } from 'redux';
import reducer from './Reducers';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../ReduxSaga/RootSaga';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,

    applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
export default store;