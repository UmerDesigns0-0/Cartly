import { useState } from "react";

function Help() {
  const [isOpen, setIsOpen] = useState(null);

  const tabs = [
    {
      title: "How do I track my order?",
      content:
        "Once your order is shipped, you’ll receive a tracking link via email. You can also check the status under 'My Orders' in your account dashboard.",
    },
    {
      title: "What payment methods do you accept?",
      content:
        "We accept all major credit/debit cards, PayPal, and bank transfers. Cash on delivery is available for select regions.",
    },
    {
      title: "How can I return or exchange a product?",
      content:
        "You can request a return or exchange within 14 days of delivery. Go to the 'Returns' section in your account or contact our support team.",
    },
    {
      title: "Do you offer free shipping?",
      content:
        "Yes, we offer free shipping on orders over $100. Standard shipping charges apply for smaller orders.",
    },
    {
      title: "Can I change my delivery address after placing an order?",
      content:
        "If your order hasn’t shipped yet, you can update your address from your order details page or by contacting customer support.",
    },
  ];

  const toggleTab = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h6 className="text-lg text-orange-600 font-medium mb-2">FAQs</h6>
          <h2 className="text-4xl font-bold text-gray-900 leading-[3rem]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="accordion-group space-y-4">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`accordion p-6 border border-gray-200 rounded-2xl transition-all duration-300 hover:bg-orange-50 ${
                isOpen === index ? "bg-orange-50" : ""
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleTab(index)}
                className="accordion-toggle group flex items-center justify-between w-full text-left text-gray-900 font-medium text-lg transition-all duration-300 hover:text-orange-600"
              >
                <span>{tab.title}</span>
                <svg
                  className={`transform transition-transform duration-300 ${
                    isOpen === index ? "rotate-180 text-orange-600" : "rotate-0"
                  }`}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>

              {/* Accordion Content */}
              {isOpen === index && (
                <div className="accordion-content mt-4 text-gray-700 text-base leading-6">
                  {tab.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Help;
