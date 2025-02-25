import React from 'react'
import './Signup.css'
import email from "../../../images/mail.png";
import pass from "../../../images/pw.png";
import name from "../../../images/username.png";
import { useState } from 'react';
import { handleError } from './utils';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
      };

      console.log('signupInfo ->', signupInfo)

      const handleSignup = async (e) => {
        e.preventDefault();
        const {name, email, password}   = signupInfo;
        if(!name || !email || !password){
            return handleError('All fields are required!')
        }

      try{
        const url = "http://localhost:8080/auth/signup"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        });
        const result = await response.json();
        const {success, message, error} = result;
        
        if (success) {
            toast.success(message);
            setTimeout(() => {
              navigate('/log-in');
            }, 1000);
          } else if(error){
            const details = error?.details[0].message;
            handleError(details)
          } else if(!success){
            handleError(message);
          }

        console.log(result);
      } catch (err) {
        handleError(err);
      }
    }
  return (
    <>
        <div className="main">
                <div className="container">
                    <div className="boxes">
                    <div className="box2">
                         
                    </div>
                    <div className="box1">
                    <div className="userForm">
                            <div className="show">
                                <h1 className='txt-login'>Signup</h1>
                                <p className='sub'>Sign Up to your account!</p>
                            </div>
                            <div className="userData">
                                <form onSubmit={handleSignup}>
                                <div className="email">
                                        <img src={name} alt="" height= '20px' width = '20px' />
                                        <input type="text" name="name" placeholder="Username" autoFocus onChange={handleChange} value={signupInfo.name}/>
                                    </div>
                                    <div className="email">
                                        <img src={email} alt="" height= '20px' width = '20px' />
                                        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={signupInfo.email}/>
                                    </div>
                                    <div className="password">
                                            <img src={pass} alt=" " height= '20px' width = '20px'/>
                                            <input type="password" name="password" placeholder="Set Password" onChange={handleChange} value={signupInfo.password}/>
                                    </div>
                                <div className="button1">
                                    <button type="submit" className='btn-text'>Sign up</button>
                                </div>
                                </form>
                            </div>
                            <div className="signup">
                                <p>already have an account?  <a href ="/log-in">Log In</a></p>
                            </div>
                            
                        </div>   
                    </div>
                    </div>
                </div>
                <ToastContainer/>
                </div>
    </>    
    

  )
}

export default Signup;