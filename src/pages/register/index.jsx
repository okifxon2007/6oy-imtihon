import React, { useRef } from 'react';
import kema from '../../assets/img/gf.gif';
import avatar from '../../assets/img/Avatar-UI-Unicorn-V2.png';
import '../register/index.css';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Register() {
  const navigate = useNavigate();
  
  function loginclik() {
    navigate('/login');
  }

  const nameRef = useRef('');
  const imgRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');

  function validate() {
    if (nameRef.current.value.length < 4) {
      toast.error('Sizning malumotingiz kamida 4 ta belgidan iborat bolishi kerak');
      nameRef.current.focus();
      nameRef.current.style.outlineColor = 'red';
      return false;
    }
    const imgUrl = imgRef.current.value;
    if (!imgUrl.startsWith('http')) {
      toast.error('Togri rasm linkini kiriting');
      imgRef.current.focus();
      imgRef.current.style.outlineColor = 'red';
      return false;
    }
    const email = emailRef.current.value;
    if (!email.includes('@')) {
      toast.error('Togri email kiriting');
      emailRef.current.focus();
      emailRef.current.style.outlineColor = 'red';
      return false;
    }
    const password = passwordRef.current.value;
    if (password.length < 3) {
      toast.error('Parol kamida 3 ta belgidan iborat bolishi kerak');
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = 'red';
      return false;
    }
    return true;
  }

  function handlreg() {
    if (!validate()) {
      return;
    }
    const userdata = {
      name: nameRef.current.value,
      avatar: imgRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    fetch("https://api.escuelajs.co/api/v1/users/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        if (data.message === 'avatar must be a URL address') {
          toast.error(data.message);
        } else if (data.message === "password must be longer than or equal to 4 characters") {
          toast.error(data.message);
        } else if (data.message === "email must be an email") {
          toast.error(data.message);
        } else {
          toast.success('Muvaffaqiyatli royxatdan o\'tdingiz!');
          navigate('/login'); 
        }
      })
      .catch(error => {
        console.log(error);
        toast.error('Xatolik yuz berdi!');
      });
  }

  return (
    <div className="conta">
      <Toaster />
      <div className='register'>
        <div className="regdf">
          <div className="imgpage">
            <img src={kema} alt="" />
          </div>
          <div className="regpage">
            <div className="regpageimgdf">
              <img src={avatar} alt="" />
              <h1>UI Unicorn</h1>
            </div>
            <h2>Nice to see you again</h2>
            <div className="formvalue">
              <form>
                <label>name</label> <br />
                <input ref={nameRef} type="text" placeholder="Enter your username" /> <br />
                <label>image link</label> <br />
                <input ref={imgRef} type="text" placeholder="Enter your image link" /> <br />
                <label>Email</label> <br />
                <input ref={emailRef} type="email" placeholder="Enter your email" /> <br />
                <label>Password</label> <br />
                <input ref={passwordRef} type="password" placeholder="Enter your password" /> <br />
              </form>
              <form className="twoform">
                <input type="checkbox" placeholder="" />
                <label>Remember me</label>
                <p>Forgot password ?</p>
              </form>
              <button className="sign" onClick={handlreg}>Sign in</button>
              <button className="googlebut"><i className="fa-brands fa-google"></i> or sign in with Google</button>
              <h3>Dont have an account? <span onClick={loginclik}>Login</span></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
