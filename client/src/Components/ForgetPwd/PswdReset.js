import React, { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import './PswdReset.css';
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const PswdReset = () => {
    const navigate = useNavigate();
    const[email,setEmail] = useState('')
    const handleSubmit=()=>{
        console.log(email)
        axios.put('http://localhost:5000/sendotp',
        {
            email:email,
        })
        .then(res =>{
            console.log(res.data)
            if (res.code === 200){
                navigate("/forget-pass")
            }
        })

    }
  return (
    <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your Email</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email"  value={email} 
                            onChange={(e)=>{setEmail(e.target.value)}}
                            name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>

                        <button onClick={handleSubmit} className='button' >Send OTP</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
  )
}

export default PswdReset