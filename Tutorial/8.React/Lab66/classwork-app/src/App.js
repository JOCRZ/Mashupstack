import './App.css';
import erenImage from './images/eren.jpg';

function App() {

    console.log("React app started");

    let name = "Eren Yeager";

    return (

        <div className="container py-5 d-flex justify-content-center">

            <div className="card welcome-card shadow p-4 text-center">

                <h1 className="title mb-4">
                    Welcome to React Learning, {name}
                </h1>

                {/* External Image */}
                <img
                    src="https://i.pinimg.com/736x/5d/b1/8d/5db18dcfb41ec7e1066f074200a643dd.jpg"
                    alt="External"
                    className="img-fluid rounded mb-3 card-image"
                />

                {/* Internal Image */}
                <img
                    src={erenImage}
                    alt="Internal"
                    className="img-fluid rounded mb-3 card-image"
                />

                <p className="description fw-bold">
                    This is your first card with images and styles!
                </p>

            </div>

        </div>
    );
}

export default App;