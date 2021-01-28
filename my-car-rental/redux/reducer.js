import * as actionTypes from './actionTypes';

const CAR_PAYMENT = {
    private: 20000,
    micro: 40000,
    jeep: 90000,
}

const INITIAL_STATE = {
    carType: [
        { type: 'private', amount: 0 },
        { type: 'micro', amount: 0 },
        { type: 'jeep', amount: 0 },
    ],
    rents: [],
    rentLoading: true,
    rentErr: false,
    totalPayment: 80,
    purchasable: false,
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null,
}

export const reducer = (state = INITIAL_STATE, action) => {
    const carType = [...state.carType];
    switch (action.type) {
        case actionTypes.ADD_CARTYPE:
            for (let item of carType) {
                if (item.type === action.payload) item.amount++;
            }
            return {
                ...state,
                carType: carType,
                totalPayment: state.totalPayment + CAR_PAYMENT[action.payload],
            }
        case actionTypes.REMOVE_CARTYPE:
            for (let item of carType) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount--;
                }
            }
            return {
                ...state,
                carType: carType,
                totalPayment: state.totalPayment - CAR_PAYMENT[action.payload],
            }
        case actionTypes.UPDATE_PURCHASABLE:
            const sum = state.carType.reduce((sum, element) => {
                return sum + element.amount;
            }, 0)
            return {
                ...state,
                purchasable: sum > 0,
            }
        case actionTypes.RESET_CARTYPE:
            return {
                ...state,
                carType: [
                    { type: 'private', amount: 0 },
                    { type: 'micro', amount: 0 },
                    { type: 'jeep', amount: 0 },
                ],
                totalPayment: 80,
                purchasable: false,
            }
        case actionTypes.LOAD_RENTS:
            let rents = [...action.payload];
            return {
                ...state,
                rents: rents,
                rentLoading: false,
            }
        case actionTypes.RENT_LOAD_FAILED:
            return {
                ...state,
                rentErr: true,
                rentLoading: false,
            }

        //Auth Cases
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                authFailedMsg: null,
                token: null,
                userId: null,
            }
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload,
            }
        default:
            return state;
    }

}