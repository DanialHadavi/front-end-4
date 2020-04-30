import React, { useState, useEffect } from 'react';
import axios from 'axios';

import * as yup from 'yup';
import './Register.css';
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import  axiosWithAuth from './utils/AxiosWithAuth';




const initialState = {
    username: '',
    password: '',
    email: '',
    // isFetching: false
}
const initialFormErrors = {

    username:'*Username is required',
    password:'*Password is required',
    email:'*Email is required'

}

const registerSchema = yup.object().shape({

    username: yup
        .string()
        .min(3, '*Username must include at least 3 characters')
        .required('*Username is required'),
    password: yup
        .string()
        .min(5, '*Password must include at least 5 characters')
        .required('*Password is required') ,
    email: yup
        .string()
        .email('*Must be a valid email address')
        .required('*Email is required')  

});

function Register(props) {

    const [register, setRegister] = useState(initialState)
    const [registerFormErrors, setRegisterFormErrors] = useState(initialFormErrors)
    const [buttonEnabled, setButtonEnabled] = useState(false)

    useEffect(() => {

        gsap.from(".register", {x:-500, duration:1.0, ease:"expo.out"})
        gsap.fromTo(".register", {autoAlpha:0}, {autoAlpha:1, duration:1.0})


    },[])

    useEffect(() => {

        registerSchema.isValid(register)
            .then(valid => {
                setButtonEnabled(valid)
            })

    }, [register])

    const handleChange = (e) => {

        e.persist()
        setRegister({ ...register, [e.target.name]: e.target.value })

        yup
            .reach(registerSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setRegisterFormErrors({...registerFormErrors, [e.target.name]:''})

            })
            .catch(err => {
                setRegisterFormErrors({...registerFormErrors, [e.target.name]: err.errors[0]})
            })
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(register);
        axiosWithAuth()
        .post('/register', register)
            .then(res => {
                props.history.push('/')
                console.log('Register data is returning', res)
            })
            .catch(err => {
                console.log('Register data is not returning!!!!', err)

            })
    }

    return (

        <div className='register'>

            <h1 className='register-header'>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className='form-div'>
                        <label>Username: </label><input className='register-textbx' placeholder='username' onChange={handleChange} type='text' name='username' value={register.username}></input>
                    </div>
                    <div className='form-div'>
                        <label>Password: </label><input className='register-textbx' placeholder='password' onChange={handleChange} type='password' name='password' value={register.password}></input>
                    </div>
                    <div className='form-div'>
                        <label>Email: </label><input className='register-textbx' placeholder='email' onChange={handleChange} type='text' name='email' value={register.email}></input>
                    </div>
                    <div className='form-div'>
                        <button className='register-btn' disabled={!buttonEnabled} type='submit'>Register</button>
                    </div>
                    <div className='form-errors'>{registerFormErrors.username}</div>
                    <div className='form-errors'>{registerFormErrors.password}</div>
                    <div className='form-errors'>{registerFormErrors.email}</div>
                
                    {register.isFetching && 'Loading register page...'}

                </form>

                <div className='no-account'>Already have an account? <Link className='login-link' to='/'>Login here</Link></div>

        </div>


    )



}
export default Register;