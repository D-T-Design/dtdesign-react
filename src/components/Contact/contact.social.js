import React from "react";

const ContactSocial = () => (
  <div className="contact-wrapper">
    <h3>Social Media</h3>
    <p>
      Interested in reaching me?
      <br />
      Contact me on these platforms:
    </p>
    <div className="social-below">
      <a
        href="http://www.facebook.com/davidtorresdesign"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ion-icon name="logo-facebook" />
      </a>
      <a
        href="http://www.instagram.com/davidtorresdesign"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ion-icon name="logo-instagram" />
      </a>
      <a
        href="http://www.twitter.com/dtorresgraphics"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ion-icon name="logo-twitter" />
      </a>
      <a
        href="http://www.linkedin.com/in/davidtorresdesign"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ion-icon name="logo-linkedin" />
      </a>
    </div>
  </div>
);

export default ContactSocial;
