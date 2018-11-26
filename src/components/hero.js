import React, { Component } from "react";

import "./hero.css";

class Hero extends Component {
  render() {
    const Slide = props => {
      let index = props.index;
      let classList = index === 0 ? "carousel-item active" : "carousel-item";
      return (
        <div className={classList}>
          <h1>{props.slide.mainHeadline}</h1>
          <p>{props.slide.content}</p>
        </div>
      );
    };

    const Indicators = props => {
      let index = props.index;
      return index === 0 ? (
        <li data-target="#slider" data-slide-to={index} className="active" />
      ) : (
        <li data-target="#slider" data-slide-to={index} />
      );
    };

    const HeadlineSlider = props => {
      const headlines = props.state;
      return (
        <div id="slider" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {headlines.map((slide, index) => (
              <Slide key={index} index={index} slide={slide} />
            ))}
          </div>
          <ol className="carousel-indicators">
            {headlines.map((slide, index) => (
              <Indicators key={index} index={index} />
            ))}
          </ol>
        </div>
      );
    };

    const CTASection = props => {
      const content = props.state.content;
      const ctaText = props.state.ctaText;
      return (
        <div className="row justify-content-center">
          <div className="col-xs-10 col-sm-10 col-md-8 col-lg-6 scroll-me">
            <p className="cta-desc">{content}</p>
            <a href="#services" className=" btn button-custom btn-custom-two">
              {ctaText}
            </a>
          </div>
        </div>
      );
    };
    return (
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
                <HeadlineSlider state={this.props.headlines.headlines} />
              </div>
            </div>
            <CTASection state={this.props.headlines.ctaSection} />
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
  }
}

export default Hero;
