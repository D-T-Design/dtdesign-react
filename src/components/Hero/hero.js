import React from "react";
import { HeadlineSlider, CTASection } from "./hero.elements";
import "./hero.css";

const Hero = props => (
  <div id="home">
    <div
      className="row animate-in align-items-center justify-content-center"
      data-anim-type="fade-in-up"
    >
      <a
        className="carousel-control-prev"
        href="#slider"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-10 col-sm-10 col-md-10 col-lg-8">
            <HeadlineSlider state={props.headlines.headlines} />
          </div>
        </div>
        <CTASection state={props.headlines.ctaSection} />
      </div>
      <a
        className="carousel-control-next"
        href="#slider"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  </div>
);

export default Hero;
