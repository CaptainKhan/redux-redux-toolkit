const redux = require('redux')
const { createStore } = require('redux');
const produce = require('immer').produce;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = redux('redux-logger')
const logger = reduxLogger.createLogger();


const initialState = {
    name: 'Vishwas',
    address: {
        street: '123 Main Str',
        city: 'Boston',
        state: 'MA'
    },
}

const STREET_UPDATED = 'STREET_UPDATED';
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     },
            // }
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default:
            return state

    };
}

const store = createStore(reducer);
console.log('Initial State', store.getState());
const unsubscribe = store.subscribe(() => {
    console.log('Updated state', store.getState())
});
store.dispatch(updateStreet('456 Main Str'));
unsubscribe();