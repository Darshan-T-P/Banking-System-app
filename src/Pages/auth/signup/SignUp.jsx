import React from 'react'
import AuthForm from '../../../components/AuthForm'
import './SignUp.css'

const SignUp = () => {
  return (
    <div >
      {/* <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div> */}
      <AuthForm type="signup" />
    </div>
  )
}

export default SignUp