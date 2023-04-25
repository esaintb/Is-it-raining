import React, { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import CurrentWeather from './components/currentWeather.js'
import HourlyWeather from './components/hourlyWeather.js'
// import Login from './components/login.js'
// import Logout from './components/logout.js'
import Registration from './components/registration.js'
import { Route, Routes } from 'react-router-dom'
import AnimalLobby from './components/animalLobby.js'
import mainBackgroundImage from './assets/backgroundImages/4_edit_by_cleopatrawolf_dfut2ry.png'




function App() {
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const [token, setToken] = useLocalStorageState('loginToken', '')
  const [username, setUsername] = useLocalStorageState('userUsername', '')
  const [hourlyTemps, setHourlyTemps] = useState([])


  const setAuth = (token, username) => {
    setToken(token)
    setUsername(username)
  }


  useEffect(() => {
    const getData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      console.log("Latitude is:", lat)
      console.log("Longitude is:", long)
    }
    getData();
  }, [lat, long]);


  return (
    <>
      <CurrentWeather lat={lat} long={long} hourlyTemps={hourlyTemps} />
      <HourlyWeather lat={lat} long={long} setHourlyTemps={setHourlyTemps} />
      <div className="backgroundImage" style={{ backgroundImage: `url(${mainBackgroundImage})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 1200, width: 720 }}></div>
      {/* <Login setAuth={setAuth} />
      <Registration setAuth={setAuth} /> */}
    </>
  );
}
export default App;