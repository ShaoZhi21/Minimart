import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Components/HomePage';
import SignUpPage from './Components/SignUpPage';
import MartPage from './Components/MartPage';
import Logo from './Assets/muhammadiyah_logo.png';

function App() {
  return (
    <div id="MainPageFlex">
      <div id="HomePageTopDiv">
        <img id="Logo" src={Logo} alt="Logo"></img>
        <h1 id="WelcomeText">Welcome to Muhammadiyah Welfare Home Minimart</h1>
      </div>
      <div id="HomePageBottomDiv">
        <div id="LoginDiv">
          <div id="TypeofAccountDiv">
            <div id="User"><h2>User</h2></div>
            <div id="Admin"><h2>Admin</h2></div>
          </div>
          <div id="UsernamePasswordDiv">
          <div id="UsernameDiv">
            <label for="username">Username: </label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required />
          </div>
          <div id="PasswordDiv">
            <label for="username">Password: </label>
            <input type="text" id="password" name="password" placeholder="Enter your password" required />
          </div>
          </div>
          <Router>
            <div id="LoginSignUpDiv">
            <Link to="/mart">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            </div>
            <Routes>
              <Route path="/" element={<HomePage/>}></Route>
              <Route path="/signup" element={<SignUpPage/>}></Route>
              <Route path="/mart" element={<MartPage/>}></Route>
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
