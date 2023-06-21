import { ToastContainer } from "react-toastify";
import IndexRouter from "./routers/IndexRouter";
import Footer from "./components/Layout/Footer/Footer";

import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <ToastContainer />
      <IndexRouter />
      <Footer />
    </>
  )
}

export default App;