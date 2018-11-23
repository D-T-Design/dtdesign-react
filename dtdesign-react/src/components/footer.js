import React, { Component } from 'react';

class Footer extends Component { 

  render() {
    return (
      <footer id="footer" className="darken pad-bottom">
        <div className="row-fluid">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="footer-div">
              &copy; 2016 - {(new Date().getFullYear())} David Torres Design
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;