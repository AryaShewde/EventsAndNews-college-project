import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";

export const ContactUs = () => {
  const [success, setSuccess] = useState(false);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        "service_3cjoy9d",
        "template_sznq15t",
        form.current,
        "bOiH5S8-LWLV4B3mH"
      );
      e.target.reset();
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="form"
      ref={form}
      onSubmit={sendEmail}
      data-testid="contact-form"
    >
      <label className="headtitle">
        Is there any issue with Events and News app
      </label>
      <h1>Contact us</h1>
      <div>
        <label className="lable">Your Name</label>
        <input type="text" name="user_name" required aria-label="Name" />

        <label className="lable">Your Email</label>
        <input type="email" name="user_email" required aria-label="Email" />

        <label className="lable">Message</label>
        <textarea name="message" aria-label="Message" />
      </div>

      <input className="btn" type="submit" value="Submit" required />

      {success && <p role="alert">Response has been sent</p>}
    </form>
  );
};
