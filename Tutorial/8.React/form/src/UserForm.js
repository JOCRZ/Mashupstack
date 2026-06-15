import { useState } from "react";

function UserForm({ setMessage }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:8080/api/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        age,
                    }),
                }
            );

            const result = await response.text();

            setMessage(result);

            setName("");
            setAge("");
        } catch (error) {
            setMessage("Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label>Age: </label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>

            <button type="submit">
                Submit
            </button>
        </form>
    );
}

export default UserForm;