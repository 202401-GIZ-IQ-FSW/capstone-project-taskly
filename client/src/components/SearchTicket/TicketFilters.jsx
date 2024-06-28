function TicketFilters() {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-semibold">Ticket Filters</h3>
      <div className="space-y-2">
        <input type="checkbox" id="billing-inquiry" />
        <label htmlFor="billing-inquiry" className="ml-2">
          Billing Inquiry
        </label>
        <input type="checkbox" id="technical-support" />
        <label htmlFor="technical-support" className="ml-2">
          Technical Support
        </label>
        <input type="checkbox" id="login-assistance" />
        <label htmlFor="login-assistance" className="ml-2">
          Login Assistance
        </label>
        <input type="checkbox" id="submit-new-ticket" />
        <label htmlFor="submit-new-ticket" className="ml-2">
          Submit New Ticket
        </label>
      </div>
      <h3 className="text-lg font-semibold">Ticket Category</h3>
      <div className="space-y-2">
        <input type="checkbox" id="technical-issues" />
        <label htmlFor="technical-issues" className="ml-2">
          Technical Issues
        </label>
        <input type="checkbox" id="billing-inquiries" />
        <label htmlFor="billing-inquiries" className="ml-2">
          Billing Inquiries
        </label>
        <input type="checkbox" id="account-access" />
        <label htmlFor="account-access" className="ml-2">
          Account Access
        </label>
        <input type="checkbox" id="resolved" />
        <label htmlFor="resolved" className="ml-2">
          Resolved
        </label>
      </div>
      <h3 className="text-lg font-semibold">Ticket Status</h3>
      <div className="space-y-2">
        <input type="checkbox" id="open" />
        <label htmlFor="open" className="ml-2">
          Open
        </label>
        <input type="checkbox" id="in-progress" />
        <label htmlFor="in-progress" className="ml-2">
          In Progress
        </label>
        <input type="checkbox" id="closed" />
        <label htmlFor="closed" className="ml-2">
          Closed
        </label>
        <input type="checkbox" id="lorem-ipsum" />
        <label htmlFor="lorem-ipsum" className="ml-2">
          Lorem Ipsum
        </label>
      </div>
      <h3 className="text-lg font-semibold">Priority Level</h3>
      <div className="flex space-x-2">
        <span className="border px-2 py-1">Low</span>
        <span className="border px-2 py-1">Medium</span>
        <span className="border px-2 py-1">High</span>
        <span className="border px-2 py-1">Urgent</span>
      </div>
    </div>
  );
}

export default TicketFilters;
