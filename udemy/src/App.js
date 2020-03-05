import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isOn, setOn] = useState(false);
  const [mousePozition, setMousePozition] = useState({ x:null, y:null})

  useEffect( ()=> {
    //websayfasinin basligini degistirmek icin
    // bu Effecti sonrasinda silmemize gerek yok cunku sadece click ile calisiyor
    document.title = `${count} times clicked`;
    // mouse hareketlerinin sayfadaki yerini gormek icin
    window.addEventListener('mousemove', handleMouseMove)

    //componentWillUnmount- mouse'un x ve y pozisyonunu gostermesi bittiginde eventi temizlemek icin
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [count])
  /* sayfayi her actiginda componentin temizlenmesini istiyorsan sondaki [] koyma
  aralikli olarak temizlemesini istiyorsan [] bu sekilde koy
  count ile ilgili olan effecti etkilemesini istemiyorsan [count] yaz
  */
 
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
      <h2>counter</h2>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        I was clicked {count} times
      </button>

      <h2> toggle light</h2>
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

      <h2> mouse position </h2>
      {JSON.stringify(mousePozition, null, 2)}
      
    </>
  );
}

export default App;
