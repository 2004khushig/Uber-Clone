import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import CaptainLogin from './pages/CaptainLogin';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainSignup from './pages/CaptainSignup';
import Home from './pages/home';
import { UserDataContext } from './context/userContext';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper';
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/riding" element={<Riding />} />
      
        
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        <Route path="/home" element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path="/user/logout" element={<UserProtectedWrapper>
          <UserLogout/>
          </UserProtectedWrapper>} />
          <Route path="/captain-home" element={
            <CaptainProtectedWrapper>
              <CaptainHome/>
            </CaptainProtectedWrapper>
          } />
      </Routes>

    </div>
  )
}
export default App;