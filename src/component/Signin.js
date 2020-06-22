
// add useContext
import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import {firebaseAuth} from '../provider/AuthProvider'
import './Signin.css'

const Signin = () => {


  const {handleSignin, inputs, setInputs, errors} = useContext(firebaseAuth)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit')
    handleSignin()
    
  }
  const handleChange = e => {
    const {name, value} = e.target
    console.log(inputs)
    setInputs(prev => ({...prev, [name]: value}))
  }

  return (
    <div>
      

      <div className="form-style-6">
        <h1>Signin</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" name="email" onChange={handleChange} placeholder='email' value={inputs.email}  />
        <input type="password" name="password" onChange={handleChange} placeholder='password' value={inputs.password} />
        <input type="submit" value="Send" />
        {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
        </form>

        <div>
          <p>Dont have an account? </p> 
          <Link to={"/signup"}>Signup</Link>
        </div>
      </div>
    </div>
    
  );
};

export default Signin;