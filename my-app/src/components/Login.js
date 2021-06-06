import React, { useState } from 'react';
import "../scss/login.css";
import { Link } from "react-router-dom";
export default function Login(props) {
  var [user,setUser]=useState({
      email:"",
      password:""
  })
  var name,value;
  const changeInput=async(e)=>{
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value});
  }


  const postData=async(e)=>{
    console.log("hi");
    e.preventDefault();
    var email=user.email;
    var password=user.password;
    var res=await fetch("/login",{
      method:"POST",
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:email,
        password:password
      })
    })
    var data=await res.json();
    console.log("printing from frontend",data.status);
    if(data.status==="Logged In"){
    props.setstatus(true);
    }
    window.alert(data.status);
    setUser({
      email:"",
      password:""
    })
    
  }
  return (
    <>
      <section className='loginsection'>
        <div className='formcontainer'>
          <div className='heading'>
            <h2>Login</h2>
          </div>
          <div className='formdiv'>
            <form method="POST">
              <div>
                <div className='iconandinput'>
                  <i className='fa fa-envelope' aria-hidden='true'></i>
                  <input placeholder='Enter Your Email' type='email' name="email" value={user.email} autoFocus required onChange={changeInput}/>
                </div>

                <div className='iconandinput'>
                  <i className='fa fa-key' aria-hidden='true'></i>
                  <input placeholder='Enter Your Password' type='password' name="password" value={user.password} required onChange={changeInput}/>
                </div>
              </div>

              <div className="actionbutton">
                <button className="linked-button" onClick={postData} type="reset">L O G I N</button>
              </div>
            </form>
          </div>

          <div className="signuplink">
            <p>Don't Have an account?</p>
            <Link to="/signup" className="linktag"><span>Sign Up</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
