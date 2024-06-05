import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {

  return (
      <div className="flex flex-col min-h-screen">
          <Header/>
          <main className="flex-grow flex">
              <Outlet/>
          </main>
          <Footer/>
      </div>
  );
}

export default App;
