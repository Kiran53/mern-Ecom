import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login,register } from "../../slices/auth";

import "../../static/loginStyle.css"
import validator from 'validator'
export default function Login(props) {

    useEffect(() => {
        if (props.page === "tab-2")
            document.getElementById("tab-2").click();
    })

    
    const dispatch=useDispatch();
    // const [successful, setSuccessful] = useState(false);
    const nav = useNavigate();

    const [pd, setpd] = useState('');


    const [errors, setError] = useState({
        name: '',
        email: '',
        password: '',
        rpassword: '',
    })
    const [formValues, setValues] = useState({
        name: '',
        email: '',
        password: '',
    })

// HANDLE_CHANGE    HANDLE_CHANGE   HANDLE_CHANGE
    const handleChange = (event) => {
        event.preventDefault();

        const { id, value } = event.target;
        let error = errors;
        let values = formValues;
        
        switch (id) {
            case 'name':
                if (value.length < 5) {

                    error.name = 'Full Name must be at least 5 characters long!'
                    values.name = value
                }
                else {
                    error.name = ''
                    values.name = value
                }
                break;
            case 'email':
                if (validator.isEmail(value)) {
                    error.email = ''
                    values.email = value
                }
                else {

                    error.email = 'Email is not valid!'
                    values.email = value;
                }
                break;
            case 'password':

                if (value.length > 7) {
                    error.password = '';
                    setpd(value);
                    document.getElementById("rpassword").disabled = false;
                }
                else {
                    error.password = 'Password must be at least 8 characters long!';
                    setpd(value)
                }
                break;
            case 'rpassword':
                if (value !== pd) {
                    error.rpassword = 'Password doesn\'t match'
                    values.password = value
                }
                else {
                    error.rpassword = ''
                    values.password = value
                }
                break;
            default:
                break;
        }
        setValues(old => ({
            ...old,
            name: values.name,
            password: values.password,
            email: values.email,
        }))
        setError(old => ({
            ...old,
            name: error.name,
            password: error.password,
            email: error.email,
            rpassword: error.rpassword,
        }))



    }

// ALERT    ALERT   ALERT 
    let alert= (message,type)=>{
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div id="alert-su"  class="alert alert-${type} alert-dismissible alert-su}" role="alert">`,
            ` <div>${message}</div>`,
            '   <button type="button" id="close-su-alert"  class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
        setTimeout(() => {
            document.getElementById("close-su-alert").click();
        }, 1500)
        
    }
// LOGIN        LOGIN      LOGIN    
    let LoginSubmit = async (e) => {
        e.preventDefault()
        const LoginDetails = {
            email: document.getElementById("Lemail").value,
            password: document.getElementById("Lpass").value
        }
        
        dispatch(login(LoginDetails))
        .then(()=>nav('/'))
        .catch(error => {
            alert('fill all details', 'danger')
            console.log(error)
        })
    }
    let handleSubmit = async (e) => {
        e.preventDefault()
        if (errors.name.length || errors.email.length || errors.password.length || errors.rpassword.length) {
            alert('fill all details', 'danger')
            return;
        }
        const user={
            name: formValues.name,
            password: formValues.password,
            email: formValues.email
        }   
        dispatch(register(user))
        .then(()=>nav('/'))
        
        // axios.post('/api/register', {
        //     name: formValues.name,
        //     password: formValues.password,
        //     email: formValues.email
        // }, {

        //     withCredentials: true
        // }
        // )
        //     .then(function (response) {
        //         nav("/");
        //         console.log(response.data);
        //     })
        .catch(function (error) {
            alert(error.response.data.msg, 'danger')

            console.log(error);
        })
    }
    
    return (
        <div className="login-signup">
            {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> */}
            <div className="row">
                <div className="col-md-6 mx-auto p-0">
                    <div className="card">
                        <div className="login-box">
                            <div className="login-snip">
                                <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Login</label>
                                <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Sign Up</label>
                                <div className="login-space">
                                    <div className="login">
                                        <div className="group">
                                            <label htmlFor="user" className="label">Email</label>
                                            <input id="Lemail" type="text" className="input" placeholder="Enter your email" />
                                        </div>
                                        <div className="group">
                                            <label htmlFor="pass" className="label">Password</label>
                                            <input id="Lpass" type="password" className="input" data-type="password" placeholder="Enter your password" />
                                        </div>
                                        <div className="group">
                                            <input id="check" type="checkbox" className="check" defaultChecked />
                                            <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                                        </div>
                                        <div className="group">
                                            <input type="submit" id="login" className="button" onClick={LoginSubmit} value="Sign In" />
                                        </div>
                                        <div className="hr"></div>
                                        <div className="foot">
                                            <Link to="#">Forgot Password?</Link>
                                        </div>
                                    </div>

                                    <div className="sign-up-form">
                                        <div className="group">
                                            <label htmlFor="user" className="label">Username</label>
                                            <input id="name" type="text" onChange={(e) => handleChange(e)} className="input" value={formValues.name} placeholder="Create your Username" />
                                            {errors.name.length > 0 ? (
                                                <span className='error'>{errors.name}</span>
                                            ) : null}
                                        </div>
                                        <div className="group">
                                            <label htmlFor="pass" className="label">Password</label>
                                            <input id="password" type="password" onChange={(e) => handleChange(e)} className="input" value={pd} data-type="password" placeholder="Create your password" />
                                            {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                                        </div>
                                        <div className="group">
                                            <label htmlFor="pass" className="label">Repeat Password</label>
                                            <input id="rpassword" onChange={(e) => handleChange(e)} type="password" className="input" data-type="password" placeholder="Repeat your password" />
                                            {errors.rpassword.length > 0 && <span className='error'>{errors.rpassword}</span>}
                                        </div>
                                        <div className="group">
                                            <label htmlFor="pass" className="label">Email Address</label>
                                            <input id="email" onChange={(e) => handleChange(e)} type="text" className="input" value={formValues.email} placeholder="Enter your email address" />
                                            {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                                        </div>
                                        <div className="group">
                                            <input type="submit" className="button" id="signup" value="Sign Up" onClick={handleSubmit} />
                                        </div>
                                        <div id="liveAlertPlaceholder" className="login-signup"></div>

                                        <div className="foot">
                                            <label htmlFor="tab-1">Already Member?</label>
                                        </div>
                                        <div className="hr"></div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

