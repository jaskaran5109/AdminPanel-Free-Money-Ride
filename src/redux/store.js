import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { adminReducer } from "../redux/reducers/adminReducer";
const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});

export default store;
export const server = "https://free-money-ride.onrender.com/api/admin";
export const server2 = "https://free-money-ride.onrender.com/api";
// export const server = "http://localhost:4000/api/admin";
