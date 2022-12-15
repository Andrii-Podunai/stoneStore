//import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Button } from 'react-bootstrap';

function Header() {
  return (
    <header className="Header">
      <div className="Header-logo">
        <Link to="/" className="title">
          <img className="logo" alt="logo" />
        </Link>
        <Link to="/" className="linkTitle">
          <h1>VtorMall</h1>
        </Link>
      </div>
      <div className="Header-nav">
        <div>
          <InputGroup className="md-5">
            <Form.Control />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </div>

        <div>
          <Link to="/" className="linkLog">
            <Button variant="primary">Log in</Button>
          </Link>
          <Link to="/" className="linkReg">
            <Button>Registration</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
