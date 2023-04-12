const { applyMiddleware } = require('redux');

redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const state = require('./state');

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';


function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}


// const initialState = {
//     numofCakes: 10,
//     numofIceCreams: 20,
// }

const initialCakeState = {
    numofCakes: 10
}

const initialIceCreamState = {
    numofIceCreams: 20
}
//* (previous state, action) => newState

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED: return {
            ...state,
            numofCakes: state.numofCakes - 1
        }
        case CAKE_RESTOCKED: return {
            ...state,
            numofCakes: state.numofCakes + action.payload
        }
        default:
            return state
    }

}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED: return {
            ...state,
            numofIceCreams: state.numofIceCreams - 1
        }
        case ICECREAM_RESTOCKED: return {
            ...state,
            numofIceCreams: state.numofIceCreams + action.payload
        }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(() =>{})
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch);
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(3)

unsubscribe()