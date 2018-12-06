import React from "react";
import { InputHalf, TextareaSubmit } from "./contact.form.elements";

const ContactForm = () => (
  <form id="contact-form" method="post" action="/thankyou.html">
    <div className="row justify-content-center">
      <input type="hidden" name="form-name" value="contact-form" />
      <InputHalf inputType="name" label="Your Name" placeholder="John Doe" pattern="([A-z0-9À-ž\s,'-]){2,}"/>
      <InputHalf inputType="email" label="Your Email" placeholder="email@email.com" pattern=""/>
      <TextareaSubmit label="What's on your mind?" placeholder="Describe your project, ask a question or just say hi!" buttonText="Send Message" />
    </div>
  </form>
);

export default ContactForm;
