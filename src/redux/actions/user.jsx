import { server, server2 } from '../store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

export const getMyProfile = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response.data.error });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.post(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/register`, { name, email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};


export const resetPassword = (token, password) => async dispatch => {
  try {
    dispatch({ type: 'resetPasswordRequest' });

    const { data } = await axios.put(
      `${server}/resetpassword/${token}`,
      {
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'resetPasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'resetPasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const getTotalUserEarnings = () => async dispatch => {
  try {
    dispatch({ type: 'totalEarningsRequest' });

    const { data } = await axios.get(
      `${server2}/all-user-earnings`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'totalEarningsSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'totalEarningsFail', payload: error.response.data.error });
  }
}

export const getTotalAmountLeft = () => async dispatch => {
  try {
    dispatch({ type: 'totalAmountLeftRequest' });

    const { data } = await axios.get(
      `${server2}/all-user-amount-left`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'totalAmountLeftSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'totalAmountLeftFail', payload: error.response.data.error });
  }
}

export const getUserEarningsForTheDay = (date) => async dispatch => {
  try {
    dispatch({ type: 'earningsForTheDayRequest' });

    const { data } = await axios.post(
      `${server2}/all-user-earnings-for-todays-day`, { date },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
    dispatch({ type: 'earningsForTheDaySuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'earningsForTheDayFail', payload: error.response.data.error });
  }
}