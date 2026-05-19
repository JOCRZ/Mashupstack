import erenImage from './images/eren.jpg';

function App() {

    let personName = "Eren Yeager";

    let role = "Frontend Developer & Architect of Freedom";

    let description =
        "Passionate about breaking through rigid design walls, moving forward until every bug is eradicated, and engineering powerful, unstoppable web applications with React.";

    return (

        <div
            className="container-fluid d-flex justify-content-center align-items-center min-vh-100"
            style={{
                background: "linear-gradient(135deg, #0f172a, #1e293b)"
            }}
        >

            <div
                className="card shadow-lg border-0"
                style={{
                    width: "900px",
                    borderRadius: "25px",
                    overflow: "hidden",
                    backgroundColor: "#111827"
                }}
            >

                <div className="row g-0">

                    {/* LEFT SIDE */}
                    <div
                        className="col-md-5 d-flex flex-column justify-content-center align-items-center p-4"
                        style={{
                            background: "linear-gradient(135deg, #2563eb, #06b6d4)"
                        }}
                    >

                        <img
                            src={erenImage}
                            alt="Profile"
                            className="img-fluid rounded-circle shadow mb-4"
                            style={{
                                width: "220px",
                                height: "220px",
                                objectFit: "cover",
                                border: "5px solid white"
                            }}
                        />

                        <h2
                            style={{
                                color: "white",
                                fontWeight: "bold"
                            }}
                        >
                            {personName}
                        </h2>

                        <p
                            style={{
                                color: "#e0f2fe",
                                fontSize: "18px"
                            }}
                        >
                            {role}
                        </p>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="col-md-7 p-5">

                        <h1
                            style={{
                                color: "#f8fafc",
                                fontWeight: "bold",
                                marginBottom: "20px"
                            }}
                        >
                            My Portfolio
                        </h1>

                        <p
                            style={{
                                color: "#cbd5e1",
                                fontSize: "18px",
                                lineHeight: "1.8"
                            }}
                        >
                            {description}
                        </p>

                        <img
                            src="https://i.pinimg.com/736x/5d/b1/8d/5db18dcfb41ec7e1066f074200a643dd.jpg"
                            alt="External"
                            className="img-fluid rounded shadow mt-4"
                            style={{
                                width: "100%",
                                maxHeight: "300px",
                                objectFit: "cover"
                            }}
                        />

                        <button
                            className="btn btn-info mt-4 px-4 py-2"
                            style={{
                                fontWeight: "bold"
                            }}
                        >
                            View Projects
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default App;