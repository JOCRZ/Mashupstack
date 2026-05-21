import { useState } from 'react';
import Child from './Child';
import './App.css';

function App() {

  const [isBright, setIsBright] = useState(false);

  function toggleLight() {
    setIsBright(!isBright);
  }

  return (

    <div className="container">

      <div className="card">

        <h1>Room</h1>

        <p className="status">
          {isBright
            ? "The room is bright"
            : "The room is dark"}
        </p>

        <Child
          isBright={isBright}
          toggleLight={toggleLight}
        />

      </div>

    </div>

  );

}

export default App;