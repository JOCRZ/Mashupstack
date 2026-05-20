import './App.css';

function App() {

  const name = "Alex";

  const age = 20;

  const isStudent = true;

  const headingColor = "lightblue";

  const favoriteHobbies = [
    "Reading",
    "Hiking",
    "Coding"
  ];

  // FOR LOOP LIST
  const hobbyListForLoop = [];

  for (let i = 0; i < favoriteHobbies.length; i++) {

    hobbyListForLoop.push(
      <li key={i}>{favoriteHobbies[i]}</li>
    );

  }

  // BUTTON FUNCTION
  function showMessage() {

    document.getElementById("message").innerHTML =
      "Hello from React! I love my hobbies!";

    document.getElementById("heading").style.backgroundColor =
      headingColor;

  }

  return (

    <div className="container d-flex justify-content-center align-items-center min-vh-100">

      <div className="card shadow p-4 profile-card">

        <h1 id="heading" className="text-center heading">
          Personal Profile
        </h1>

        <div className="card-body">

          <p>
            <strong>Name:</strong> {name}
          </p>

          <p>
            <strong>Age:</strong> {age}
          </p>

          <p>
            <strong>Is a Student:</strong> {isStudent.toString()}
          </p>

          <hr />

          

          <ul>
            {hobbyListForLoop}
          </ul>

          

          <ul>
            {
              favoriteHobbies.map((item, index) => {
                return (
                  <li key={index}>
                    {item}
                  </li>
                );
              })
            }
          </ul>

          <button
            className="btn btn-primary mt-3"
            onClick={showMessage}
          >
            Show Enthusiasm
          </button>

          <p id="message" className="message mt-3">
            Click the button to see my enthusiasm!
          </p>

        </div>

      </div>

    </div>

  );
}

export default App;