function Contact() {
  function showEnthusiasm() {
    document.getElementById('heading-contact').style.backgroundColor = 'lightblue';
    document.getElementById('message-contact').innerText = 'Hello from React! I love this page!';
  }

  return (
    <div className="card p-4 mb-4">
      <h1 id="heading-contact">This is the Contact Page</h1>
      <p id="message-contact">Click the button to see my enthusiasm!</p>
      <button className="btn btn-primary" onClick={showEnthusiasm}>Show Enthusiasm</button>
    </div>
  );
}

export default Contact;
