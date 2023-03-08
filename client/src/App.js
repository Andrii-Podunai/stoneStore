import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import CreateProductPage from 'pages/CreateProductPage/CreateProductPage';
import ProfilePage from 'pages/ProfilePage/';
import UserInfo from 'pages/ProfilePage/subpages/userInfoPage';
import SuccessForm from 'pages/SuccessForm';
import ProtectedRoute from 'components/ProtectedRoute';
import EditProductPage from 'pages/EditProductPage';
import Admin from 'pages/Admin/Admin';
import AboutUs from 'pages/AboutUs';
import Contacts from 'pages/Contacts';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import ScrollWrapper from './components/ScrollWrapper';
import ProtectedRouteAdmin from './pages/Admin/ProtectedRouteAdmin';
import Loader from './components/Loader';

function App() {
  const { isLoading } = useAuth0();
  if (isLoading === true) {
    return <Loader />;
  }
  return (
    <ScrollWrapper>
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
            path="/profile/userInfo"
            element={
              <ProtectedRoute>
                <UserInfo />
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
          <Route
            path="/admin"
            element={
              <ProtectedRouteAdmin>
                <Admin />
              </ProtectedRouteAdmin>
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
    </ScrollWrapper>
  );
}

export default App;
