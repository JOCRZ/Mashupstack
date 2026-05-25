import React from 'react';

function App() {
  return(
   <div class="container mt-5">

        <div class="card p-4 shadow">

            <h1 class="text-center mb-4">
                Student List
            </h1>

            <ul class="list-group">

                <li class="list-group-item d-flex justify-content-between align-items-center">

                    Eren Yeager

                    <button
                        class="btn btn-primary"
                        onclick="showMessage('Eren Yeager')"
                    >
                        Select
                    </button>

                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center">

                    Mikasa Ackerman

                    <button
                        class="btn btn-success"
                        onclick="showMessage('Mikasa Ackerman')"
                    >
                        Select
                    </button>

                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center">

                    Armin Arlert

                    <button
                        class="btn btn-warning"
                        onclick="showMessage('Armin Arlert')"
                    >
                        Select
                    </button>

                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center">

                    Levi Ackerman

                    <button
                        class="btn btn-danger"
                        onclick="showMessage('Levi Ackerman')"
                    >
                        Select
                    </button>

                </li>

            </ul>

            <p
                id="message"
                class="text-center mt-4 fw-bold"
            >
                Click a button to select a student!
            </p>

        </div>

    </div>
);
}

export default App;