import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from './components/Home';
import AddEditFeeType from './components/AddEditFeeType';
import AddEditDiscount from './components/AddEditDiscount';
import Calendar from './components/Calendar';
import ClientForm from './components/ClientForm';
import DiscountList from './components/DiscountList';
import FeeTypeList from './components/FeeTypeList';
import TransactionList from './components/TransactionList';
import MakeTransaction from './components/MakeTransaction';
import Report from './components/Report';
//import Sidemenu from './components/Sidemenu';
/*
import EmployeeList from './components/EmployeesList';
import AddEditEmployee from './components/AddEditEmployee';
import ExtraHoursList from './components/ExtraHoursList';
import AddEditExtraHours from './components/AddEditExtraHours';
*/
import NotFound from './components/NotFound';
/*
import PaycheckList from './components/PaycheckList';
import PaycheckCalculate from './components/PaycheckCalculate';
import AnualReport from './components/AnualReport';
*/
function App() {
  return (
      <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/feetype/add" element={<AddEditFeeType/>} />
              <Route path="/feetype/edit/:id" element={<AddEditFeeType/>} />
              <Route path="/feetype/list" element={<FeeTypeList/>} />
	      <Route path="/discount/add" element={<AddEditDiscount/>} />
              <Route path="/discount/edit/:id" element={<AddEditDiscount/>} />
	      <Route path="/discount/list" element={<DiscountList/>} />
	      <Route path="/transaction/list" element={<TransactionList/>} />
	      <Route path="/client" element={<ClientForm/>} /> 
	      <Route path="/calendar" element={<Calendar/>} />
	      <Route path="/report" element={<Report/>} />   
	      <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
      </Router>
  );
}

export default App
