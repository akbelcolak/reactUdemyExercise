import React, { useState, useEffect } from "react";
// we can set an object inside useEffect as we did in mouse pozition
// if our object is bigger we can write it before our app function and call it in useState
const initialLocationState ={
  latitude : null,
  longitude : null,
  speed : null
}


function App() {
  const [count, setCount] = useState(0);
  const [isOn, setOn] = useState(false);
  const [mousePozition, setMousePozition] = useState({ x:null, y:null})
  const [status, setStatus] = useState(navigator.onLine)
  const [{latitude, longitude,speed}, setLocation] = useState(initialLocationState)

  let mounted = true // to clear geoLocation after using
  useEffect( ()=> {
    //websayfasinin basligini degistirmek icin
    // bu Effecti sonrasinda silmemize gerek yok cunku sadece click ile calisiyor
    document.title = `${count} times clicked`;
    // mouse hareketlerinin sayfadaki yerini gormek icin
    window.addEventListener('mousemove', handleMouseMove)
    // online olup olmadigimizi gormek icin
    //useState  navigator.onLine'i gosteriyor. direk objenin ismi
    //active listenerlar olduklari icin sonrasinda silmemiz gerekiyor
    window.addEventListener('online',handleOnline)
    window.addEventListener('offline',handleOffline)
    //for my real position(geolocation) and speed
    navigator.geolocation.getCurrentPosition(handleGeoLocation)
    // also for geolocation
    const watchId = navigator.geolocation.watchPosition(handleGeoLocation)

    
    return () => {
      //componentWillUnmount- mouse'un x ve y pozisyonunu gostermesi bittiginde eventi temizlemek icin
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('online',handleOnline)
      window.removeEventListener('offline',handleOffline)
      //to be able to clean geo location we add watchlocation whic can be deleted with id
      navigator.geolocation.clearWatch(watchId)
      mounted = false

    }
  }, [count])
  /* sayfayi her actiginda componentin temizlenmesini istiyorsan sondaki [] koyma
  aralikli olarak temizlemesini istiyorsan [] bu sekilde koy
  count ile ilgili olan effecti etkilemesini istemiyorsan [count] yaz
  */
 
  const handleGeoLocation = event => {
    //we added mounted to be able to delete setLocation afterwards
    if(mounted) {
      setLocation({
        latitude : event.coords.latitude,
        longitude : event.coords.longitude,
        speed : event.coords.speed
      })
    }
  }

  const handleOnline = ()=>{
    setStatus(true)
  }
  const handleOffline = ()=>{
    setStatus(false)
  }

  const handleMouseMove = (event)=>{
    setMousePozition( {
      x: event.pageX,
      y: event.pageY
    })
  }

  const toggleLight = () => {
    setOn(prevIsOn => !prevIsOn);
  };

  return (
    <>
      <h2>Counter</h2>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        I was clicked {count} times
      </button>

      <h2> Toggle Light</h2>
      <img
        alt="FlashLight"
        src={
          isOn
            ? "https:icon.now.sh/highlight/fd0"
            : "https:icon.now.sh/highlight/aaa"
        }
        style={{ height: 50, width: 50 }}
        onClick={toggleLight}
      />

      <h2> Mouse Position </h2>
      {JSON.stringify(mousePozition, null, 2)}

      <h2> network status </h2>
      <p>you are currently: <strong>{status ? 'online' : 'offline'}</strong></p>

      <h2> Location and Speed</h2>
      <p>latitude : {latitude}</p>
      <p>longitude : {longitude} </p>
      <p>your speed : {speed? speed : "0"} </p>
      
    </>
  );
}

export default App;
