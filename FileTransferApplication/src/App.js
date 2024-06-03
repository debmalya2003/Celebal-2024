import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

function App({ socket }) {
  const [title, setTitle] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("socket_connection", (data) => {
        setTitle(data);
      });
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </header>
    </div>
  );
}

export default App;
