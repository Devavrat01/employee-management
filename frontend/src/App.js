import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEmployee from './components/AddEmployee';
import SearchEmployee from './components/SearchEmployee';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import EditEmployee from './components/EditEmployee';
import History from './components/History';
import LoginRegisterForm from './components/LoginRegisterForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegisterForm />} />
        <Route path="/search" element={<SearchEmployee />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/list" element={<EmployeeList />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/view/:id" element={<EmployeeDetails />} />
        <Route path="/history/:id" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
