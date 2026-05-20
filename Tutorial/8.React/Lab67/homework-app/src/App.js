import './App.css';

function App() {

  const favoriteFoods = [
    "Pizza",
    "Burger",
    "Pasta",
    "Ice Cream",
    "Biriyani"
  ];

  function showFoodMessage(foodName) {

    document.getElementById("message").innerHTML =
      `I love ${foodName}!`;

  }

  return (

    <div className="container d-flex justify-content-center align-items-center min-vh-100">

      <div className="card food-card shadow p-4">

        <h1 className="text-center mb-4">
          Favorite Foods
        </h1>

        <ul className="list-group">

          {
            favoriteFoods.map((food, index) => {

              return (

                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >

                  <span>{food}</span>

                  <button
                    className="btn btn-primary"
                    onClick={() => showFoodMessage(food)}
                  >
                    Love It
                  </button>

                </li>

              );

            })
          }

        </ul>

        <p id="message" className="message mt-4">
          Select a food that you love!
        </p>

      </div>

    </div>

  );
}

export default App;