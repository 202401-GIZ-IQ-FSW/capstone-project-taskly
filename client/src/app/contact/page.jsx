'use client';

import { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import fetcher from '@/_utils/fetcher';
import Notification from '@/components/Notification';

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetcher('/v1/contact', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phoneNumber,
        message,
      }),
    });
    const generateRandomNumber = () => {
      return Math.floor(100 + Math.random() * 900);
    };
    if (res.message == 'Contact form submitted successfully') {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setMessage('');
      setNotificationMessage(
        ` Done <span hidden>${generateRandomNumber()}</span>`
      );
      setNotificationType('success');
    } else {
      setNotificationMessage(
        `Failed to Send rewuest, MSG: ${
          res.message
        } <span hidden>${generateRandomNumber()}</span>`
      );
      setNotificationType('error');
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center p-16">
        <div className="flex flex-col md:flex-row items-start md:gap-10 gap-0">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-5xl font-extrabold mb-4 tracking-wider font-roboto text-custom-black">
              GET IN TOUCH
            </h2>
            <p className="mb-4 font-dancing text-custom-teal tracking-widest">
              Hey! We are looking forward to start a project with you!
            </p>
            <p className="mb-4 text-gray-600">
              Feel free to reach out to us anytime - we're here to assist you!
              You can visit our office, call us, or send us an email. We value
              your feedback and inquiries, and our team is dedicated to
              providing the best support possible. Whether you have questions,
              need help, or just want to give us your thoughts, we're all ears
              and ready to respond promptly. Our priority is to ensure you have
              a great experience with our services.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 focus:text-indigo-600">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 focus:text-blue-500">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-pink-500 hover:text-pink-700 focus:text-pink-500">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-600 focus:text-blue-400">
                <FaEnvelope className="w-6 h-6" />
              </a>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="md:w-1/2 w-full p-6 rounded-lg bg-gray-950/5">
            <div className="mb-4 flex flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4 flex flex-row gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={phoneNumber}
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Write your Message"
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
                rows="4"></textarea>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
              />
              <label>
                I accept the{' '}
                <a href="#" className="text-custom-teal/75 underline">
                  Terms of Service
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-custom-teal text-white font-roboto font-semibold rounded hover:bg-custome-tail/85 focus:bg-custome-tail">
              Submit
            </button>
          </form>{' '}
          <Notification message={notificationMessage} type={notificationType} />
        </div>
      </div>
      <div className="relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.842776476534!2d-122.26894507507384!3d37.79372421106956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f80c953129af3%3A0xfe47a2fa4bfa9ee9!2sOakland%20Jack%20London!5e0!3m2!1sar!2siq!4v1720209585783!5m2!1sar!2siq"
          width="100%"
          height="300"
          style={{ border: '0' }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div className="bg-custom-gray max-w-lg p-10 rounded-lg absolute top-6 left-4 ">
          <h1 className="font-roboto text-2xl font-medium tracking-wider text-custom-black ">
            Where to find us?
          </h1>
          <hr className="border-custom-teal/50 py-2"></hr>
          <div className="flex flex-row gap-10 items-start justify-start">
            <div>
              <h5 className="font-roboto text-custom-black font-medium text-lg">
                Address
              </h5>
              <p className="text-custom-teal mb-2 text-xs">
                Oakland Jack London
              </p>
              <p className="text-custom-teal text-xs">
                245 2nd St, Oakland, CA 94607
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col mb-2">
                <h5 className="font-roboto text-custom-black font-medium text-lg">
                  Phone
                </h5>
                <h6 className="text-custom-teal text-xs">+964 771 856 9787</h6>
              </div>
              <div className="flex flex-col">
                <h5 className="font-roboto text-custom-black font-medium text-lg">
                  Email
                </h5>
                <h6 className="text-custom-teal text-xs">info@taskly.com</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
