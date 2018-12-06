import React from "react";
const Step = props => {
  return <li>{props.step}</li>;
};

const ProcessList = props => {
  const title = props.category.title;
  const steps = props.category.steps;
  return (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
      <div className="process-wrapper">
        <h3>{title}</h3>
        <ul className="process-list">
          {steps.map((step, index) => (
            <Step key={index} step={step} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const ProcessColumns = props => {
  const categories = props.categories;
  return (
    <div
      className="row animate-in justify-content-center"
      data-anim-type="fade-in-up"
    >
      {categories.map((category, index) => (
        <ProcessList key={index} category={category} />
      ))}
    </div>
  );
};

export { ProcessColumns };
