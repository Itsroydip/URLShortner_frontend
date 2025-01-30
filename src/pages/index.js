import Login from "./login/Login";
import Register from "./register/Register";
import Dashboard from "./dashboard/Dashboard";
import Links from "./links/Links";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
    const shortId = useParams().shortId;
    useEffect(() => {
        window.location.href = import.meta.env.VITE_BACKEND_URL + "/" + shortId;
      }, []);
}

export{
    Login,
    Register,
    Dashboard,
    Redirect,
    Links
}