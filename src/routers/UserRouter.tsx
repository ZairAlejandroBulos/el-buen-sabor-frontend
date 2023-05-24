import Home from "../components/Layout/Home/Home";
import NavBar from "../components/Layout/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";

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