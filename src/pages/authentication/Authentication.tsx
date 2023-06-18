import React, { useState } from "react";
import "./Authentication.scss";
// import axios from "axios";

function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (username === "israilst67@gmail.com" && password == "1234") {
      alert("your are connected");
    }

    // try {
    //   const url = "https://votre-api.com/authentification";
    //   const response = await axios.post(url, { username, password });
    //   localStorage.setItem("authToken", response.data.token);

    //   window.location.href = "/";
    // } catch (error) {
    //   setError("Erreur lors de la connexion");
    // }
  };

  return (
    <div className="authentication_container">
      <h1>Authentication</h1>
      <form onSubmit={handleSubmit} className="authentication_form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom d'utilisateur"
          className="authentication_username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="authentication_password"
        />
        <button type="submit">Se connecter</button>
        {/* {error && <p>{error}</p>} */}
      </form>
    </div>
  );
}

export default Authentication;
