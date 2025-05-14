import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Employees from "./component/employees";
import AddEmployee from "./component/add";
import EditEmployee from "./component/edit";
import UpdateEmployee  from "./component/update";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <nav className="navbar">
            <div className="navbar-container">
              <ul className="navbar-menu">
                <li><Link to="/">ข้อมูลพนักงาน</Link></li>
                <li><Link to="/add">เพิ่มพนักงาน</Link></li>
                <li><Link to="/edit">แก้ไขข้อมูลพนักงาน</Link></li>
              </ul>
            </div>
          </nav>

        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit" element={<EditEmployee />} />
          <Route path="/edit/:name" element={<UpdateEmployee />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
