import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Homepage } from './pages/Homepage';
import { Employees } from './pages/Employees';


function App() {
const isLogin = useSelector(state=>state.isAuth)// return true or false if login


return (
    <Router>
      <Routes>
        <Route path ="/" element ={<Homepage />} />
        <Route path = "/LoginEmployee" element ={<SignIn />}/>
        <Route path = "/Dashboard" element ={<Dashboard />} />
        <Route path = "/Employees" element ={<Employees/>} />
      </Routes>
    </Router>
  );
}

export default App;
