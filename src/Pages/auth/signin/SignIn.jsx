import React from 'react'
import AuthForm from '../../../components/AuthForm'
import './SignIn.css'

const SignIn = () => {
  return (
    <div >
      {/* <div className='header'>
        <div className='text'>Sign In</div>
        <div className='underline'></div>
      </div> */}
      <AuthForm type="signin" />
    </div>
  )
}

export default SignIn