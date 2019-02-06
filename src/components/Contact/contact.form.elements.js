import React from "react";

const InputHalf = props => {
  let type = props.inputType;
  if (type === "name") {
    type = "text";
  } else {
    type = props.inputType;
  }
  return (
    <div className="col-xs-8 col-sm-6 col-md-4 col-lg-4">
      <div className="form-group">
        <label htmlFor={props.inputType}>{props.label}</label>
        <input
          type={type}
          id={props.inputType}
          name={props.inputType}
          placeholder={props.placeholder}
          className="form-control"
          required={props.required}
        />
      </div>
    </div>
  );
};

const TextareaSubmit = props => {
  return (
    <div className="col-xs-8 col-sm-12 col-md-8 col-lg-8">
      <div className="form-group">
        <label htmlFor="message">{props.label}</label>
        <textarea
          id="message"
          name="message"
          placeholder={props.placeholder}
          required
        />
      </div>
      <div className="contact-submit form-group">
        <div id="form-messages" />
        <button className="btn button-custom btn-custom-two" type="submit">
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export { InputHalf, TextareaSubmit };
