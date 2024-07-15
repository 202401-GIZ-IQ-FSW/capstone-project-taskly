import React from 'react';

const Map = () => {
  return (
    <div className="relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.842776476534!2d-122.26894507507384!3d37.79372421106956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f80c953129af3%3A0xfe47a2fa4bfa9ee9!2sOakland%20Jack%20London!5e0!3m2!1sar!2siq!4v1720209585783!5m2!1sar!2siq"
        width="100%"
        height="300"
        style={{ border: '0' }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>

      <div className="max-w-lg p-6 md:p-10 rounded-lg absolute bottom-6 left-4 md:left-auto md:right-6 bg-white">
        <h1 className="font-roboto text-xl md:text-2xl font-medium tracking-wider text-custom-blue mb-4 md:mb-6">
          Where to find us?
        </h1>
        <hr className="border-light-blue/50 mb-4 md:mb-6"></hr>
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-start justify-start">
          <div>
            <h5 className="font-roboto text-custom-blue font-medium text-base md:text-lg">
              Address
            </h5>
            <p className="text-light-blue mb-2 text-xs md:text-sm">
              Oakland Jack London
            </p>
            <p className="text-light-blue text-xs md:text-sm">
              245 2nd St, Oakland, CA 94607
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col mb-2">
              <h5 className="font-roboto text-custom-blue font-medium text-base md:text-lg">
                Phone
              </h5>
              <h6 className="text-light-blue text-xs md:text-sm">
                +964 771 856 9787
              </h6>
            </div>
            <div className="flex flex-col">
              <h5 className="font-roboto text-custom-blue font-medium text-base md:text-lg">
                Email
              </h5>
              <h6 className="text-light-blue text-xs md:text-sm">
                info@taskly.com
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
