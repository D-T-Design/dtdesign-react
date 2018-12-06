import React from "react";
import { ProcessColumns } from "./process.elements";

import "./process.css";

const Process = props => (
  <section id="process">
    <div className="container">
      <div className="row text-center header">
        <div className="col-12 animate-in" data-anim-type="fade-in-up">
          <h3>{props.process.heading}</h3>
          <hr />
        </div>
      </div>
      <ProcessColumns categories={props.process.steps} />
    </div>
  </section>
);

export default Process;
