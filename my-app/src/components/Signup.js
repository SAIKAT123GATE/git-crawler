import React, { useState } from 'react';
import "../scss/login.css";
import { Link,useHistory } from "react-router-dom";

export default function Signup() {
  var history=useHistory();
  var [users,setUsers]=useState({
    email:"",
    password:"",
    cpassword:""
  })
  const handleInput=async(e)=>{
    var fieldname=e.target.name;
    var fieldvalue=e.target.value;
    setUsers({...users,[fieldname]:fieldvalue});
  }

  const postData=async(e)=>{
    console.log("from signupdata");
    e.preventDefault();
    var email=users.email;
    var password=users.password;
    var cpassword=users.cpassword;
    var res=await fetch("/signup",{
      method:"POST",
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:email,
        password:password,
        cpassword:cpassword
      })
    })
    var data=await res.json();
    console.log("printing from frontend",data);
    
    window.alert(data.status);
    if(data.status==="User Saved Successfully"){
    history.push("/");
    }
    setUsers({
      email:"",
      password:"",
      cpassword:""
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
            <form>
              <div>
                <div className='iconandinput'>
                  <i className='fa fa-envelope' aria-hidden='true'></i>
                  <input placeholder='Enter Your Email' type='email' name="email" value={users.email} onChange={handleInput} autoFocus required/>
                </div>

                <div className='iconandinput'>
                  <i className='fa fa-key' aria-hidden='true'></i>
                  <input placeholder='Enter Your Password' type='password' name="password" value={users.password} 
                  onChange={handleInput}
                  required />
                </div>

                <div className='iconandinput'>
                  <i className='fa fa-key' aria-hidden='true'></i>
                  <input placeholder='Confirm Password' type='text' name="cpassword" value={users.cpassword} onChange={handleInput} required/>
                </div>
              </div>

              <div className="actionbutton">
                <button className="linked-button" onClick={postData}>S U B M I T</button>
              </div>
            </form>
          </div>

          <div className="signuplink">
            <p>Already have an Account?</p>
            <Link to="/" className="linktag"><span>Log In</span></Link>
          </div>
        </div>
      </section>
    </>
  )
}
