import './App.css';
import Leaks from './components/Leaks';
import { useState } from 'react';
import Header from './components/Header'

function App() {
  const [email, setEmail] = useState('');
  const [leaks, setLeaks] = useState([]);

  const callAPI = async (email) => {
    const response = await fetch(`http://localhost:3001/breachedaccount/${email}`);
    const data = await response.json();
    setLeaks(data);
  };

  const buttonClick = async (email) => {
    await callAPI(email)
    const searchBar = document.getElementsByClassName("searchBar")[0]
    searchBar.style.margin = 0;
  }

  return (
    <div className="App">
      <Header email setEmail callAPI/>
      {/* <h1>Dark Web Scanner</h1> */}
      <div className="searchBar">
        <input className='input'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className='button' onClick={() => buttonClick(email)}>submit</button>
      </div>

      <Leaks data={leaks} />
    </div>
  );
}

export default App;
