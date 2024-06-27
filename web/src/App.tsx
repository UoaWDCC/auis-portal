import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {

  return (
    <>
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
