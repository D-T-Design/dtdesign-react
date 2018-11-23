import React, { Component } from 'react';

import './nav.css';
import logo from '../assets/img/DTD-Logo.svg'

class Nav extends Component {
    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark scroll-me" id="menu-section">
                <a className="navbar-brand" href="#home">
                <img src={logo} alt="David Torres Design"/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ml-auto">
                        <a className="nav-item nav-link active" href="#home">Home <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="#services">Services</a>
                        <a className="nav-item nav-link" href="#process">Process</a>
                        <a className="nav-item nav-link" href="#work">Work</a>
                        <a className="nav-item nav-link" href="#about">About</a>
                        <a className="nav-item nav-link" href="#contact">Contact</a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;