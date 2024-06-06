import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <div className="max-w-6xl mx-auto px-4">
          <div>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
