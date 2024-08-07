import React from 'react';
import kema from '../../assets/img/Screenshot_2.jpg';
import avatar from '../../assets/img/Avatar-UI-Unicorn-V2.png';
import '../login/index.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef('');
  const passwordRef = useRef('');

  function loginclik() {
    navigate('/register');
  }

  function validate() {
    const email = emailRef.current.value;
    if (!email.includes('@')) {
      alert('Togri email kiriting');
      emailRef.current.focus();
      emailRef.current.style.outlineColor = 'red';
      return false;
    }
    const password = passwordRef.current.value;
    if (password.length < 3) {
      alert('Parol kamida 3 ta belgidan iborat bolishi kerak');
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = 'red';
      return false;
    }
    return true;
  }

  function loginclc() {
    if (!validate()) {
      return;
    }
    const logindata = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logindata)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        if (data.message === 'Unauthorized') {
          alert(data.message);
        }
        if (data.statusCode === 401) {
          alert('Parol hato');
        }
        if (data.access_token) {
          localStorage.setItem('user', JSON.stringify(logindata));
          localStorage.setItem('accesstoken', data.access_token);
          navigate('/');
          alert('siz muvafaqqiyatli royxatdan otdingiz')
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="conta">
      <div className='register'>
        <div className="regdf">
          <div className="imgpagee">
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
                <label>Email</label> <br />
                <input ref={emailRef} type="email" placeholder="Enter your email" /> <br />
                <br />
                <label>Password</label> <br />
                <input ref={passwordRef} type="password" placeholder="Enter your password" /> <br />
              </form>
              <form className="twoform">
                <input type="checkbox" placeholder="salom" />
                <label>Remember me</label>
                <p>Forgot password ?</p>
              </form>
              <button className="sign" onClick={loginclc}>Log in</button>
              <button className="googlebut"><i className="fa-brands fa-google"></i> or sign in with Google</button>
              <h3>Dont have an account? <span onClick={loginclik}>register</span></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
