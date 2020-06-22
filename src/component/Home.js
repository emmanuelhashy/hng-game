import React, {useContext} from 'react';
import {firebaseAuth} from '../provider/AuthProvider'
import App from './index'
import './home.css'

const Home = (props) => {

  const {handleSignout,} = useContext(firebaseAuth)
  return (
    <div className="text-center">
       login successful!!!!!!
       welcome Player1
      <button onClick={handleSignout}>sign out </button>

      <App/>
    </div>
  );
};

export default Home;