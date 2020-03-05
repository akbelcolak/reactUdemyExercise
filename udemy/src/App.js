import React, {useState} from 'react';


function App() {
  const [count,setCount] = useState(0)
  const [isOn,setOn] = useState(false)

  const toggleLight = ()=>{
    //setOn( isOn===false ? style= {bacground:'grey'} : style={bacground:'green'} )

    setOn(prevIsOn => !prevIsOn)
  }

  return(
    <>
      <h2>counter</h2>
      <button onClick={()=>setCount(prevCount => prevCount+1)}>I was clicked {count} times</button>
      
      <h2> toggle light</h2>
      <img
        alt='FlashLight'
        src={
          isOn ? 'https:icon.now.sh/highlight/fd0' : 'https:icon.now.sh/highlight/aaa'
        }
        style={{height:50 ,
        width:50
        }}
        onClick={toggleLight}
      />

      

    </>
  )
}

export default App;
