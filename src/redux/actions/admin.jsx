import { server } from '../store';
import axios from 'axios';

export const getAllUsers = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAllUsersRequest' });
    const { data } = await axios.get(`${server}/getalladminusers`, config);
    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFail',
      payload: error.response.data.message,
    });
  }
};

export const updateUserRole = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'updateUserRoleRequest' });
    const { data } = await axios.put(`${server}/user/${id}`, {}, config);

    dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteUserRequest' });
    const { data } = await axios.delete(`${server}/user/${id}`, config);

    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  }
};


export const getAllAppUsers = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAllAppUsersRequest' });
    const { data } = await axios.get(`${server}/getAllUsers`, config);
    dispatch({ type: 'getAllAppUsersSuccess', payload: data.user });
  } catch (error) {
    dispatch({
      type: 'getAllAppUsersFail',
      payload: error.response.data.message,
    });
  }
};


export const getAllOffers = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAllOfferRequest' });
    const { data } = await axios.get(`${server}/offers`, config);
    dispatch({ type: 'getAllOfferSuccess', payload: data.Offers });
  } catch (error) {
    dispatch({
      type: 'getAllOfferFail',
      payload: error.response.data.message,
    });
  }
}

export const updateOffer = (offerId, offerName,
  landingPage,
  logo,
  coverImage,
  offerLink,
  po,
  appDescription,
  task,
  geo,
  externalId,
  advertiser,
  isEnabled,
  os,
  conversionLimit,
  expiryDate) => async dispatch => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      };
      dispatch({ type: 'updateOfferRequest' });
      const { data } = await axios.put(
        `${server}/offer/${offerId}`,
        {
          offerName,
          landingPage,
          logo,
          coverImage,
          offerLink,
          po,
          appDescription,
          task,
          geo,
          externalId,
          advertiser,
          isEnabled,
          os,
          conversionLimit,
          expiryDate
        },
        config
      );
      dispatch({ type: 'updateOfferSuccess', payload: data.Offer });
    } catch (error) {
      dispatch({
        type: 'updateOfferFail',
        payload: error.response.data.message,
      });
    }
  }