import React from "react";
import { CategoryColumns } from "./services.elements";

import "./services.css";

const Services = props => (
  <section id="services" className="darken">
    <div className="container">
      <div className="row text-center header">
        <div className="col-12 animate-in" data-anim-type="fade-in-up">
          <h2>{props.services.headline}</h2>
          <hr />
        </div>
        <CategoryColumns categories={props.services.categories} />
      </div>
    </div>
  </section>
);

export default Services;
