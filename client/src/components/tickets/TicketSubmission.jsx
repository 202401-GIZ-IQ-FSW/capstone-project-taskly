import React from "react";

const TicketSubmission = ({ title, subtitle, submitText, newTicketText }) => (
  <section className="flex flex-row text-left p-10 bg-[#e9ecef] mx-6 mb-4">
    <div className="flex-1">
      <h1 className="text-black text-4xl font-bold mb-4">{title}</h1>
      <p className="font-normal">{subtitle}</p>
      <div className="flex flex-row mt-5 gap-4">
        <button className="border border-black px-6 py-2">{submitText}</button>
        <button className="border border-black px-6 py-2">{newTicketText}</button>
      </div>
    </div>
    <div className="flex-1">{/**this will be for the folder <icon/> */}</div>
  </section>
);

export default TicketSubmission;
