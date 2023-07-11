import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
import Offer from './Pages/Offer';
import Users from './Pages/Users';
import { DrawerModel } from './components/DrawerModel';
import { Divider } from '@chakra-ui/react';
import CreateOffer from './Pages/CreateOffer';
import Login from './Pages/Authentication/Login';
import { Register } from './Pages/Authentication/Register';
import { ProtectedRoute } from 'protected-route-react';
import { useDispatch, useSelector } from 'react-redux'
import { getMyProfile } from './redux/actions/user';
import { AdminUsers } from './Pages/AdminUsers';
import { Toaster } from 'react-hot-toast';
import OfferReport from './Pages/OfferReport';
import ResetPassword from './Pages/ResetPassword';
import PasswordChangedPage from './Pages/PasswordChangedPage';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);
  return (
    <div>
      <HashRouter>
        <DrawerModel isAuthenticated={isAuthenticated} user={user} />
        <Divider />

        <Routes>
          <Route exact path="/" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Offer user={user} />
            </ProtectedRoute>
          } />
          <Route exact path="/resetpassword/:token" element={
            <ResetPassword />
          } />
          <Route exact path="/passwordchangedsuccessfully" element={
            <PasswordChangedPage />
          } />
          <Route exact path="/offer" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateOffer />
            </ProtectedRoute>
          } />
          <Route exact path="/offer/report/:id" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OfferReport />
            </ProtectedRoute>
          } />
          <Route exact path="/users" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Users />
            </ProtectedRoute>
          } />
          <Route exact
            path="/login"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/"
              >
                <Login />
              </ProtectedRoute>
            } />
          <Route exact
            path="/register"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/"
              >
                <Register />
              </ProtectedRoute>
            } />
          <Route exact
            path="/admin-users"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminUsers user={user} />
              </ProtectedRoute>
            } />

        </Routes>
        <Toaster />
      </HashRouter>
    </div >
  )
}

export default App
