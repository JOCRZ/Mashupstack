function About() {
  function showEnthusiasm() {
    document.getElementById('heading-about').style.backgroundColor = 'lightblue';
    document.getElementById('message-about').innerText = 'Hello from React! I love this page!';
  }

  return (
    <div className="card p-4 mb-4">
      <h1 id="heading-about">This is the About Page</h1>
      <p id="message-about">Click the button to see my enthusiasm!</p>
      <button className="btn btn-primary" onClick={showEnthusiasm}>Show Enthusiasm</button>
    </div>
  );
}

export default About;
