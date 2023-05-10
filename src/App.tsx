import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer/Footer";
import IndexRouter from "./routers/IndexRouter";

function App() {
  return (
    <>
      <IndexRouter />
      <Footer />
    </>
  )
}

export default App;