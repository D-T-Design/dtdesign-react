import React, { Component } from 'react';

import photo from '../assets/img/headshot2.jpg';

class About extends Component { 

  render() {
    return (
      <section id="about">
        <div className="container">
          <div className="row text-center header animate-in" data-anim-type="fade-in-up">
            <div className="col-12">
              <h3>About Me</h3>
              <hr />
            </div>
          </div>
          <div className="row animate-in justify-content-center" data-anim-type="fade-in-up">
            <div className="col-xs-8 col-sm-8 col-md-6 col-lg-4">
              <div className="about-wrapper">
                <div className="description">
                  <img src={photo} alt="David Torres" className="img-responsive img-rounded" />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
              <div className="about-wrapper">
                <div className="description scroll-me">
                  <h2>What Can I Help You With?</h2>
                  <p>My name is <strong>David Torres</strong>, and I am a self-taught Graphic Designer living in Las Vegas, NV.&nbsp;&nbsp;Being in the design and printing business since 2007, I have seen all kinds of designs, good and bad! My favorite part of working in this industry is meeting business owners and bringing their ideas into reality.</p>
                  <p>While my lifelong passion has been making art and learning new skills, the purpose of this site is not just to make quality logos, websites or business cards!&nbsp;&nbsp;My job is to find out your business goals and if my services will help achieve them, guide you to success!</p>
                  <a href="#contact" className=" btn button-custom btn-custom-two">Let's Start Your Design!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default About;