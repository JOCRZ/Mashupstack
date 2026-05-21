function Child({ isBright, toggleLight }) {

    return (

        <button
            className="switch-btn"
            onClick={toggleLight}
        >

            {isBright
                ? "Turn OFF"
                : "Turn ON"}

        </button>

    );

}

export default Child;