import React from "react";
import "./footer.css";

const Footer = () => (
  <footer id="footer" className="darken pad-bottom">
    <div className="row-fluid">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="footer-div">
          &copy; 2016 - {new Date().getFullYear()} David Torres Design
          <p>This website is also a React app!  Find out more by visiting my <a href="https://github.com/D-T-Design/dtdesign-react"><ion-icon name="logo-github" /> Github page</a>.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
