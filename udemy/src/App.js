import React, {useState} from 'react';


function App() {
  const [count,setCount] = useState(0)

  return(
    <div>
      <button onClick={()=>setCount(count+1)}>I was clicked {count} times</button>
    </div>
  )
}

export default App;
