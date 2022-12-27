import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Chat from './Pages/chat';
import Login from './Pages/auth/login';
import Signup from './Pages/auth/signup';
import Otp from './Pages/auth/otp';
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import AccountSettings from "./Pages/accountSettings";
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.root.user.user);
  const location = useLocation();

  // if (location.pathname.includes('conversation')) {
  //   navigate(`/conversation/${location.pathname.split('/')[2]}`)
  // }


  return (
    <>
      <Routes>
        {
          !user ?
            <>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </>
            :
            !user?.isVerified ?
              <Route exact path="/" element={<Otp />} />
              :
              <>
                <Route exact path="/" element={<Chat />} />
                <Route exact path="/conversation/:id" element={<Chat />} />
              </>
        }
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
