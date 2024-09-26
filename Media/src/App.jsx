import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import SignIn from './page/auth/login';
import SignUp from './page/auth/sign';
import Dashboard from './page/dashboard/dashboard';
import Profile from './page/account/account';
import AddQ from './page/account/addQ';
import Testing from './page/profile/profile';
import Result from './page/result/result';

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/test' element={<Testing />} />
        <Route path='/sign' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/add-question' element={<AddQ />} />
        <Route path='/result/:soal' element={<Result />} />
      </Routes>
    </Router>

  )
}

export default App
