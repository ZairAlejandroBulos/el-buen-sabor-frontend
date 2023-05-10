import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./UserRouter";

function IndexRouter(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserRouter />} />
            </Routes>
        </BrowserRouter>
    );
}

export default IndexRouter;