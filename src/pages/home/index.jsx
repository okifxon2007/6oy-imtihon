import React, { useRef, useState, useEffect } from 'react';
import '../home/index.css';
import user from '../../assets/img/user.webp';
import defaultCar from '../../assets/img/cargif.gif';
import { useNavigate } from 'react-router-dom';

function Home() {
  const Navigate = useNavigate('')
  const nameRef = useRef('');
  const ageRef = useRef('');
  const colorRef = useRef('');
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    const storedCars = localStorage.getItem('carList');
    if (storedCars) {
      setCarList(JSON.parse(storedCars));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carList', JSON.stringify(carList));
  }, [carList]);

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accesstoken');
    window.location.href = '/login';
  }

  function validate() {
    if (nameRef.current.value.length > 8) {
      alert('Sizning mashinangizning nomi 8ta harfdan katta');
      nameRef.current.focus();
      return false;
    }
    if (nameRef.current.value.length < 2) {
      alert('Sizning mashinangizning nomi 2ta harfdan kichik');
      nameRef.current.focus();
      return false;
    }
    if (ageRef.current.value > 2024) {
      alert('Mashina yili 2024 katta bolishi mumkin emas');
      ageRef.current.focus();
      return false;
    }
    if (!isNaN(colorRef.current.value)) {
      alert('Siz rang kiritmadingiz');
      colorRef.current.focus();
      return false;
    }
    return true;
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const carObj = {
      name: nameRef.current.value,
      age: ageRef.current.value,
      color: colorRef.current.value,
      image: defaultCar
    };

    setCarList([...carList, carObj]);

    nameRef.current.value = '';
    ageRef.current.value = '';
    colorRef.current.value = '';
  }
  function clear(){
    localStorage.removeItem('carList')
  }
  function regbut(){
    Navigate('/register')
  }
  function logbut(){
    Navigate('/login')
  }
  function prem(){
    navigate('/premium')
  }
  return (
    <div className='homepage'>
      <div className="homepagedf">
        <div className="menu">
          <img src={user} alt="User" />
          <h1>User</h1>
          <ul>
            <li><i className="fa-solid fa-house"></i> User uchun xizmatlar</li> <br />
            <li><i className="fa-solid fa-keyboard"></i> Inputdan ma'lumot qo'shish</li> <br />
            <li><i className="fa-solid fa-floppy-disk"></i> Ma'lumot saqlash</li> <br />
          </ul>
          <button onClick={logout}>Logout</button>
        </div>
        <div className="conta">
          <div className="malumot">
           <div className="mbutdf">
           <button onClick={regbut}>Register</button>
            <button onClick={logbut}>Login</button>
           </div>
            <button className="button" onClick={prem}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
              </svg>
              Pro versiya
            </button>

            <div className="twofromdf">
              <div className="card">
                <p className="time-text"><span>04:00</span><span className="time-sub-text">PM</span></p>
                <p className="day-text">15 avgust</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" className="moon">
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
                  <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
                </svg>
              </div>

              <form className="twofrom" onSubmit={handleAdd}>
                <label></label><br />
                <input ref={nameRef} type="text" placeholder="Mashina Nomi" /> <br />
                <label></label><br />
                <input ref={ageRef} type="number" placeholder="Mashina Yili" /> <br />
                <label></label><br />
                <input ref={colorRef} type="text" placeholder="Mashina rangi" /> <br />
               <div className="twobt">
               <button type="submit">Qo'shish</button>
               
               </div>
              </form>
              <button className='carclear' onClick={clear}>Clear</button>
            </div>

            <div className="cardingdf">
              {carList.map((car, index) => (
                <div key={index} className="carding">
                  <img src={car.image} alt={car.name} />
                  <h3>{car.name}</h3>
                  <p>Yili: {car.age}</p>
                  <p>Rangi: {car.color}</p>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
