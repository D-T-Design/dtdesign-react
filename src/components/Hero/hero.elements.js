import React from "react";

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

export { HeadlineSlider, CTASection };
