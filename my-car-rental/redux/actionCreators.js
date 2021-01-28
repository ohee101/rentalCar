import axios from 'axios';
import * as actionTypes from './actionTypes';

export const addcarType = igtype => {
    return {
        type: actionTypes.ADD_CARTYPE,
        payload: igtype,
    }
}

export const removecarType = igtype => {
    return {
        type: actionTypes.REMOVE_CARTYPE,
        payload: igtype,
    }
}

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}

export const resetcarType = () => {
    return {
        type: actionTypes.RESET_CARTYPE,
    }
}


export const loadRents = rents => {
    return {
        type: actionTypes.LOAD_RENTS,
        payload: rents,
    }
}

export const rentLoadFailed = () => {
    return {
        type: actionTypes.RENT_LOAD_FAILED,
    }
}

export const fetchRents = (token, userId) => dispatch => {
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    axios.get(`http://127.0.0.1:8000/api/rent?id=${userId}`, header)
        .then(response => {
            dispatch(loadRents(response.data));
        })
        .catch(err => {
            dispatch(rentLoadFailed());
        })
}

