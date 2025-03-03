import { Outlet } from "react-router-dom";
import Footer from "./components/navigation/Footer";

const App = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
