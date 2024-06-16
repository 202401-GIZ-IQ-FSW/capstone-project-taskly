const Contact = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <nav className="flex justify-between items-center p-3">
          <button className="border border-black px-4 py-2">Get Help</button>
        </nav>

        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-4xl flex flex-col space-y-8">
            <h1 className="text-4xl font-bold mb-8">Get in touch</h1>
            <div className="w-full max-w-4xl flex flex-row gap-10">
              <form className="flex flex-col space-y-4 w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-4 border border-gray-300 rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="p-4 border border-gray-300 rounded"
                  required
                />
                <textarea
                  placeholder="Describe your issue"
                  className="p-4 border border-gray-300 rounded h-32"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="p-4 text-black border border-black rounded"
                >
                  Submit
                </button>
              </form>
              <h1 className="flex flex-col text-ellipsis "></h1>
              <div className="w-full md:w-1/2 space-y-4 bg-gray-200 p-10">
                <h2 className="text-2xl font-bold">Contact details</h2>
                <p className="text-gray-700">Office Address</p>
                <p>123 Tech Street San Francisco, CA 94103</p>
                <p className="text-gray-700">Support Hotline</p>
                <p>+1 (800) 123-4567</p>
                <p className="text-gray-700">
                  Email Support
                </p>
                <a
                    href="mailto:support@techapp.com"
                    className="text-blue-600"
                  >
                    support@techapp.com
                  </a>
              </div>
            </div>
          </div>

         
        </div>

        
      </div>
    </>
  );
};

export default Contact;
