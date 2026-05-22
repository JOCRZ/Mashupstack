import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState('Guest');

  useEffect(() => {
    console.log('User changed to Alice');
  }, [user]);

  return (
    <div className="App">
      <h1>Welcome, {user}!</h1>
      <button onClick={() => setUser('Alice')}>Login as Alice</button>
    </div>
  );
}

export default App;
