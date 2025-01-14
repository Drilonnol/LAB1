import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () =>(

  <div id="bdSidebar" className="sidebar-container">
    <a href="#" className="navbar-brand"></a>
    <hr />
    <Nav className="flex-column mynav">
      <h2 className="mt-1 mb-0">Sidebar</h2>
      <hr /> 
      <Nav.Link as={Link} to="/home" className="nav-link">
        <i className="fa-user"></i> Home
      </Nav.Link>
      <Nav.Link as={Link} to="/qytetiList" className="nav-link">
        <i className="fa-user"></i> QytetiList
      </Nav.Link>
      
      <Nav.Link as={Link} to="/createQytetiForm" className="nav-link">
        <i className="fa-regular fa-bookmark"></i> createQytetet
      </Nav.Link>
      <NavDropdown title="Regjistrimi 1" id="dropdown-1">
        <NavDropdown.Item as={Link} to="/CreatePacienti/:qytetiId/:spitaliId/:repartiId">
         Register Pacient
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/ListPacinet/:qytetiId/:spitaliId/:repartiId">
         Pacentet liste
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/CreateAlergjiaS/:repartiId/:pacinetiId">
         Alergjia create
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Regjistrimi 2" id="dropdown-2">
        <NavDropdown.Item as={Link} to="/CreateMjeket/:qytetiId/:spitaliId/:repartiId">
          Register Mjeket
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/ListMjeket/:qytetiId/:spitaliId/:repartiId">
          Serch Mjeket
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/CreateTakimiS/:repartiId/:mjekuId">
          Takimi Create
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Regjistrimi 3" id="dropdown-3">
        <NavDropdown.Item as={Link} to="/userList">
          User List
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/profile">
          Profili im
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <hr />
        
  </div>
);


export default Sidebar;