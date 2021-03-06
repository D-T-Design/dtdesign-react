import React from "react";

import "./about.css";
import photo from "../../assets/img/headshot2.jpg";

const About = props => (
  <section id="about">
    <div className="container">
      <div
        className="row text-center header animate-in"
        data-anim-type="fade-in-up"
      >
        <div className="col-12">
          <h3>{props.about.sectionTitle}</h3>
          <hr />
        </div>
      </div>
      <div
        className="row animate-in justify-content-center"
        data-anim-type="fade-in-up"
      >
        <div className="col-xs-8 col-sm-8 col-md-6 col-lg-4">
          <div className="about-wrapper">
            <div className="description">
              <img
                src={photo}
                alt="David Torres"
                className="img-responsive img-rounded"
              />
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
          <div className="about-wrapper">
            <div className="description scroll-me">
              <h2>{props.about.headline}</h2>
              <p>{props.about.bodyText}</p>
              <p>{props.about.bodyText2}</p>
              <a href="#contact" className=" btn button-custom btn-custom-two">
                {props.about.ctaText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;