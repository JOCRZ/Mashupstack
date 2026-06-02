import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

function AutoLogin({ children }) {
    const dispatch = useDispatch();
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            dispatch(setUser(JSON.parse(user)));
        }
    }, [dispatch]);
    return children;
}

export default AutoLogin;
