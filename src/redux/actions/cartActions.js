import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASEURL;

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(baseURL + `/api/shoes/${id}`);

    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            shoe: data._id,
            name: data.name,
            imgUrl: data.imgUrl,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        }
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id,
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
}