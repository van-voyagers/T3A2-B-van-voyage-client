import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  // Create a reference to the form
  const form = useRef();

  // Defines the function to send an email
  const sendEmail = (e) => {
    // Prevents the default form submission behaviour
    e.preventDefault();

    // Uses the emailjs service to send an email
    // It's given the email service ID, template ID, the form element and the public key from environment variables
    emailjs
      .sendForm(
        import.meta.env.VITE_APP_EMAIL_SERVICE_ID,
        import.meta.env.VITE_APP_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_APP_EMAIL_PUBLIC_KEY
      )
      // If the email was successfully sent
      .then(
        (result) => {
          // Logs the result to the console
          console.log(result.text);
          // Alerts the user that the email was successfully sent
          alert("Email successfully sent!");
          // Resets the form fields
          form.current.reset();
        },
        // If there was an error sending the email
        (error) => {
          // Logs the error to the console
          console.log(error.text);
          // Alerts the user that the email could not be sent
          alert("Failed to send email. Please try again!");
        }
      );
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-sm w-full lg:max-w-screen-md">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col px-5 space-y-4 text-voyage-black"
        >
          <div className="w-full space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name..."
                className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
              />

              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name..."
                className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
              />
            </div>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone..."
              className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
            />

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email..."
              className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
            />

            <textarea
              id="message"
              name="message"
              placeholder="Message..."
              className="w-full h-40 pl-2 pt-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
            />
          </div>
          <div className="self-start">
            <button
              type="submit"
              className="bg-voyage-green shadow-lg text-white font-roboto font-light rounded px-4 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
