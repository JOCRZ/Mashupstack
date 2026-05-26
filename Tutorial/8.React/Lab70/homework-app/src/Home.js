function Home() {
  function showEnthusiasm() {
    document.getElementById('heading-home').style.backgroundColor = 'lightblue';
    document.getElementById('message-home').innerText = 'Hello from React! I love this page!';
  }

  return (
    <div className="card p-4 mb-4">
      <h1 id="heading-home">This is the Home Page</h1>
      <p id="message-home">Click the button to see my enthusiasm!</p>
      <button className="btn btn-primary" onClick={showEnthusiasm}>Show Enthusiasm</button>
    </div>
  );
}

export default Home;
