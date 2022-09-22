import React from 'react';
import './forgetpwd.css';

const ForgetPwd = () => {
    
  return (
    <div>
        <form onSubmit={this.handleSubmit}>
        <h2>Forget Password</h2>
        <input type="email" placeholder='email' className='emailfield'/>
        <input type="submit" className='submitbtn'/>
        </form>
    </div>
  )
}

export default ForgetPwd