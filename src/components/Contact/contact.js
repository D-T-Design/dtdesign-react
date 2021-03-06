import React from "react";

import "./contact.css";

import ContactForm from "./contact.form";
import ContactInfo from "./contact.info";
import ContactSocial from "./contact.social";

const Contact = props => (
  <section id="contact" className="darken">
    <div className="container">
      <div
        className="row text-center header animate-in"
        data-anim-type="fade-in-up"
      >
        <div className="col-12">
          <h3>Contact Me</h3>
          <hr />
        </div>
      </div>
      <div
        className="row animate-in justify-content-center"
        data-anim-type="fade-in-up"
      >
        <ContactForm />
      </div>
      <div
        className="row animate-in justify-content-center"
        data-anim-type="fade-in-up"
      >
        <div className="col-xs-12 col-sm-8 col-md-4 col-lg-4">
          <ContactInfo />
        </div>
        <div className="col-xs-12 col-sm-8 col-md-4 col-lg-4">
          <ContactSocial />
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
