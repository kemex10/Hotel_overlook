import './main.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Navigation } from './components/Navigation/Navigation';
import { Footer } from './components/Footer/Footer';
import { FrontPage } from './pages/FrontPage/FrontPage';
import { HotelsDestinationsPage } from './pages/HotelsDestinationsPage/HotelsDestinationsPage';
import { ReservationPage } from './pages/ReservationPage/ReservationPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { useEffect, useState } from 'react';

function App() {

  const [loginData, setLoginData] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoginData(JSON.parse(sessionStorage.getItem('token')))
    }
  }, [])

  return (
    <Router>
      <Navigation loginData={loginData} />

      <Switch>
        <Route exact path="/">
          <FrontPage />
        </Route>

        <Route path="/hoteller-og-destinationer">
          <HotelsDestinationsPage />
        </Route>

        <Route path="/vaerelser">
          <p>Værelser</p>
        </Route>

        <Route exact path="/reservation/:countryName/:cityName/:hotelName/:roomName/:priceType">
          <ReservationPage />
        </Route>

        <Route path="/reservation">
          <ReservationPage />
        </Route>

        <Route path="/login">
          <LoginPage loginData={loginData} setLoginData={setLoginData} />
        </Route>

        <Route path="/">
          <p>404 - siden findes ikke.</p>
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
