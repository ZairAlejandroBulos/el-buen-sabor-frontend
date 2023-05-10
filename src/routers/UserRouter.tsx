import React from "react";
import Home from "../components/Home/Home";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

function UserRouter(): JSX.Element {
    return(
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}

export default UserRouter;