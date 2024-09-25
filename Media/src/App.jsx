import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import SignIn from './page/auth/login';
import SignUp from './page/auth/sign';
import Dashboard from './page/dashboard/dashboard';
import Profile from './page/account/account';

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/sign' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>

  )
}

export default App
