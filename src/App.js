import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { Homepage } from './pages/Homepage';
import { Employees } from './pages/Employees';

function App() {

return (
    <Router>
      <Routes>
        <Route path ="/" element ={<Homepage />} />
        <Route path = "/loginemployee" element ={<SignIn />}/>
        <Route path = "/employee/dashboard" element ={<Dashboard />} />
        <Route path = "/employee/employees" element ={<Employees/>} />
      </Routes>
    </Router>
  );
}

export default App;
