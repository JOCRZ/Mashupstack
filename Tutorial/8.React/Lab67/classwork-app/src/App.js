

function App() {

  const name = "Alex";
  const age = 20;
  const isStudent = true;
   const favhob = ["Reading", "Hiking", "Coding"]



  const favhobList = [];

  for (let i = 0; i < favhob.length; i++) {
    favhobList.push(
      <li key={i}>{favhob[i]}</li>
    );
  }

  return (

    <div>

      <p>Name : {name}</p>

      <p>Age : {age}</p>

      <p>is Student : {isStudent.toString()}</p>

      <div>
        <p> </p>
        {favhob.map((item, index) => {
          return <ul key={index}>{item}</ul>;
        })}
      </div>

      <div>
        <ul>{favhobList}</ul>
      </div>

    </div>

  );
}

export default App;