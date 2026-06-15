import { useState } from "react";
import UserForm from "./UserForm";
import ResponseMessage from "./ResponseMessage";

function App() {
    const [message, setMessage] = useState("");

    return (
        <div>
            <UserForm setMessage={setMessage} />

            <ResponseMessage message={message} />
        </div>
    );
}

export default App;