import './App.css';
import NavBar from './NavBar';
import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import SignIn from './Forms/SignIn';
import SignUp from './Forms/SignUp';
import SignOut from './Forms/SignOut';
import HomePage from './HomePage';

function App() {
  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
  return (
    <div className="App">
      <NavBar userSignedIn={userSignedIn} accessToken={accessToken}/>
      <Routes>
        <Route path='/signin' element={<SignIn setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signout' element={<SignOut setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken}/>}/>
        <Route path='/' element={<HomePage/>}/>
      </Routes> 
    </div>
  );
}

export default App;
