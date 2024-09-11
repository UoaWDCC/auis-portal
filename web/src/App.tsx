import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./screens/HomeScreen";

const App = () => {
  return (
    <>
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default App;
