import { Outlet } from "react-router-dom";
import Header2 from "./components/Header2";
import Footer from "./components/Footer";

const App = () => {

  return (
    <>
      <Header2 />
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
