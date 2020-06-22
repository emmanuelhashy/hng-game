
// add useContext
import React, {useContext} from 'react';
import {firebaseAuth} from '../provider/AuthProvider'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './Signup.css'

const Signup = (props) => {


  const {handleSignup, inputs, setInputs, errors} = useContext(firebaseAuth)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('handleSubmit')
    //wait to signup 
    await handleSignup()
    //push home
    props.history.push('/')
  }
  const handleChange = e => {
    const {name, value} = e.target
    console.log(inputs)
    setInputs(prev => ({...prev, [name]: value}))
  }

  return (
    <div> 
        <div className="form-style-6">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" name="email" onChange={handleChange} placeholder='email' value={inputs.email}  />
        <input type="password" name="password" onChange={handleChange} placeholder='password' value={inputs.password} />
        <input type="submit" value="Send" />
        {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
        </form>

        <div>
          <p>Dont have an account? </p> 
          <Link to={"/signin"}>Signin</Link>
        </div>
        </div>
      </div>


      

  );
};

export default withRouter(Signup);