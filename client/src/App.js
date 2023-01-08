import './App.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Products from './pages/Products';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading === true) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Home />
            </main>
          }
        />
        <Route
          path="/products"
          element={
            <main>
              <Products />
            </main>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
