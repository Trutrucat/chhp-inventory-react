import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm'
import * as authService from '../src/services/authService';
import WalkInRefrigerator from './components/WalkInRefrigerator';
import WalkInFreezer from './components/WalkInFreezer';
import StoreRoom from './components/StoreRoom';
import Beer from './components/Beer';
import DiningArea from './components/DiningArea';
import Kitchen from './components/Kitchen';

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      
      <Routes>
        { user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/walk-in-refrigerator" element={<WalkInRefrigerator user={user} />} />
            <Route path="/walk-in-freezer" element={<WalkInFreezer user={user} />} />
            <Route path="/store-room" element={<StoreRoom user={user} />} />
            <Route path="/beer" element={<Beer user={user} />} />
            <Route path="/dining-area" element={<DiningArea user={user} />} />
            <Route path="/kitchen" element={<Kitchen user={user} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignupForm setUser={setUser} />} />
            <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;

