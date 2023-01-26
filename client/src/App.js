import './App.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import CreateProductPage from 'pages/CreateProductPage/CreateProductPage';
import ProfilePage from 'pages/ProfilePage/';
import SuccessForm from 'pages/SuccessForm';
import ProtectedRoute from 'components/ProtectedRoute';
import EditProductPage from 'pages/EditProductPage';

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
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateProductPage />
              </ProtectedRoute>
            }
          />
          <Route path="/products/:id/edit" element={<EditProductPage />} />
          <Route path="/successfully" element={<SuccessForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
