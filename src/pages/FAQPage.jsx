import React, { useState } from 'react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is CrisisAid?",
      answer: "CrisisAid is a unified platform designed to coordinate relief efforts, increase transparency, and speed up response times during crises in Bangladesh. It connects donors, volunteers, and affected communities to provide efficient aid distribution."
    },
    {
      question: "How do I report a crisis?",
      answer: "To report a crisis, you need to create an account first. Once logged in, navigate to the 'Create Crisis' page from the dashboard. Fill in the required details including location, type of crisis, severity, and description. Our team will review and verify the report before making it public."
    },
    {
      question: "How can I donate to a crisis?",
      answer: "You can donate by visiting the crisis detail page and clicking on the 'Donate' button. Choose your donation amount and payment method. All donations are processed securely, and you'll receive a confirmation receipt. You can track your donation history in your dashboard."
    },
    {
      question: "How do I become a volunteer?",
      answer: "To volunteer, create an account and complete your profile with your skills, location, and availability. Browse available volunteer opportunities on the 'Volunteer' page and apply for positions that match your skills. Once accepted, you'll receive task assignments and updates."
    },
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the navigation bar. Fill in your personal information, including name, email, and password. You'll receive a verification email to activate your account. Make sure to verify your email before accessing all features."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take security seriously. We use JWT authentication, OAuth integration, and follow industry best practices to protect your data. All sensitive information is encrypted, and we comply with data protection regulations."
    },
    {
      question: "What types of crises does CrisisAid support?",
      answer: "CrisisAid supports various types of crises including natural disasters (floods, cyclones, earthquakes), humanitarian emergencies, and community crises. Our platform is designed to be flexible and can adapt to different types of relief efforts."
    },
    {
      question: "How are donations used?",
      answer: "Donations are used directly for crisis relief efforts. We provide itemized expense reports and withdrawal logs for complete transparency. Funds are distributed based on verified needs and coordinated through our platform to ensure efficient aid delivery."
    },
    {
      question: "Can I track my donations and volunteer activities?",
      answer: "Yes! Your dashboard provides a complete history of your donations, including amounts, dates, and the crises you've supported. For volunteers, you can track your assigned tasks, hours contributed, and impact metrics."
    },
    {
      question: "How do I contact support?",
      answer: "You can contact our support team through the 'Contact' page on our website. For urgent matters related to ongoing crises, please use the emergency contact information provided on the specific crisis page."
    },
    {
      question: "Is CrisisAid available in languages other than English?",
      answer: "Currently, CrisisAid is primarily available in English and Bengali. We're working on expanding language support to better serve diverse communities across Bangladesh."
    },
    {
      question: "How does the volunteer matching system work?",
      answer: "Our system matches volunteers based on their skills, location, and availability with current crisis needs. We consider factors like language proficiency, specialized skills (medical, logistics, etc.), and proximity to the crisis area for optimal assignments."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mt-16 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions about CrisisAid and how you can help during crises.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <span className="ml-4 flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQPage;