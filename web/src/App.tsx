import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    // ====== KARMVEER NOTE: I CHANGED TAILWIND CLASSES HERE BECAUSE OF PADDING ISSUES and other stuff
    // ====== CHECK IF THIS AFFECTS OTHER PEOPLES SCRRENS/BARS
  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex" >
            <Outlet />
        </main>
        <Footer />
      </div>
  );
}

export default App;
