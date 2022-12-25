import './App.scss';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading === true) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
