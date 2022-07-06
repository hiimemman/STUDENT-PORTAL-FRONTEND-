import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { Homepage } from './pages/Homepage';
import { useSelector, useDispatch } from 'react-redux';

import { Employees } from './pages/Employees';
import {useNavigate} from 'react-router-dom';
function App() {

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
