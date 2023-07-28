import React, { useRef } from 'react';
import emailjs from "@emailjs/browser";

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_APP_EMAIL_SERVICE_ID,
        import.meta.env.VITE_APP_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_APP_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Email successfully sent!");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
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
              className="bg-voyage-green shadow-lg text-white font-roboto mb-20 font-light rounded px-4 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm

