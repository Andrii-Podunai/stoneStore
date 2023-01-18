import './App.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import CreateProductPage from 'pages/CreateProductPage/CreateProductPage';
import SuccessCreated from 'pages/CreateProductPage/SuccessCreated';
import ProtectedRoute from 'components/ProtectedRoute';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading === true) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateProductPage />
              </ProtectedRoute>
            }
          />
          <Route path="/successfully" element={<SuccessCreated />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
