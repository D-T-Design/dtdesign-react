import React, { Component } from "react";

class ContactForm extends Component {
  render() {
    return (
      <form id="contact-form" method="post" netlify name="contact-form">
        <div className="row justify-content-center">
          <div className="col-xs-8 col-sm-6 col-md-4 col-lg-4">
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="form-control"
                pattern="([A-z0-9À-ž\s,'-]){2,}"
                required
              />
            </div>
          </div>
          <div className="col-xs-8 col-sm-6 col-md-4 col-lg-4">
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@email.com"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col-xs-8 col-sm-12 col-md-8 col-lg-8">
            <div className="form-group">
              <label htmlFor="description">Comments / Questions:</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your project, ask a question or just say hi!"
                required
              />
            </div>
            <div className="contact-submit form-group">
              <div id="form-messages" />
              <button
                className="btn button-custom btn-custom-two"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ContactForm;
