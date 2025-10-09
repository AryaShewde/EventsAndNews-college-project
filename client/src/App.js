import TopBar from './components/topbar/TopBar.jsx';
import Home from './pages/home/Home.jsx';
import Register from './pages/register/Register.jsx';
import Login from './pages/login/Login.jsx';
import Write from './pages/write/Write.jsx';
import Settings from './pages/settings/Settings.jsx';
import Single from './pages/single/Single.jsx';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useContext, useEffect } from 'react';
import { Context } from './context/Context.js';
import About from './pages/about/About.jsx';
import { ContactUs } from './components/contact/Contact.jsx';

function App() {
  const { user } = useContext(Context);

  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');

    if (!hasVisitedBefore) {
      sessionStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  // useEffect(() => {
  //   sessionStorage.getItem('hasVisited');

  //   // Always reload the page after 3 seconds
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 3000);

  //   // Set a flag in sessionStorage to indicate that the user has visited
  //   sessionStorage.setItem('hasVisited', 'true');
  // }, []);

  return (
    <>
      <Router>
        <TopBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route exact path="/about" element={user ? <About /> : <Home />} />
        </Routes>
        <Routes>
          <Route exact path="/contact" element={<ContactUs />} />
        </Routes>
        <Routes>
          <Route exact path="/register" element={user ? <Home /> : <Register />} />
        </Routes>
        <Routes>
          <Route exact path="/login" element={user ? <Home /> : <Login />} />
        </Routes>
        <Routes>
          <Route exact path="/write" element={user ? <Write /> : <Login />} />
        </Routes>
        <Routes>
          <Route exact path="/settings" element={user ? <Settings /> : <Register />} />
        </Routes>
        <Routes>
          <Route exact path="/post/:postId" element={<Single />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
