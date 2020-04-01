import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null) //username ve passwordu bir yere kaydedebilmek icin olusturdugum state

  //bu handle'i form'a ekledigim onSubmit ile aldigim datayi kullanabilmek icin kurdum
  const handleSubmit = (event)=> {
      event.preventDefault()
      const userData= {
          username,
          password
      }
      setUser(userData)
      setUsername("") // alani temizleme
      setPassword("") // alani temizleme
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={ handleSubmit } >
        <input
          type="text"
          placeholder="Username"
          onChange={event => setUsername(event.target.value)}
          value={username} // sonrasinda alani temizlemek icin olusturuldu
        />
        <input
          type="password"
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
          value={password} // submite bastiktan sonra alani temizlemek icin
        />
        <button type="submit"> Submit </button>
      </form>

      {user && JSON.stringify(user)} 
    </div>
  );
}
