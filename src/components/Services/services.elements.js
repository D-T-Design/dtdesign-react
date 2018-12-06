import React from "react";

const Service = props => {
  return <li>{props.service}</li>;
};
const ServiceList = props => {
  const title = props.category.title;
  const services = props.category.services;
  const icon = props.category.icon;
  return (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
      <div className="services-wrapper">
        <ion-icon name={icon} />
        <h3>{title}</h3>
        <ul className="service-list">
          {services.map((service, index) => (
            <Service key={index} service={service} />
          ))}
        </ul>
      </div>
    </div>
  );
};
const CategoryColumns = props => {
  const categories = props.categories;
  return (
    <div
      className="row animate-in justify-content-center"
      data-anim-type="fade-in-up"
    >
      {categories.map((category, index) => (
        <ServiceList key={index} category={category} />
      ))}
    </div>
  );
};

export { CategoryColumns };
