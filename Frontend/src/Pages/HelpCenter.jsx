import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { HashLoader } from 'react-spinners';

function HelpCenter() {
  const [isTawkApiLoaded, setIsTawkApiLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = function () {
      setIsTawkApiLoaded(true);
    };
    if (window.Tawk_API && window.Tawk_API.isLoaded) {
      setIsTawkApiLoaded(true);
    }

    return () => clearTimeout(timer);
  }, []);

  const startLiveChat = () => {
    if (isTawkApiLoaded && window.Tawk_API) {
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();
      toast.success("Connecting you to UrbanTales Live Chat! A representative will be with you shortly.");
    } else {
      toast.error("Live chat is not available right now. Please try again in a moment or contact us via email.");
      console.warn("Tawk_API is not loaded or ready yet.", window.Tawk_API);
    }
  };

  const redirectToGmailCompose = () => {
    const recipient = 'arpanjain00123@gmail.com';
    const bodyText = encodeURIComponent('Hi, I am visiting from your UrbanTalesian website.');
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&body=${bodyText}`;

    window.open(gmailComposeUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <HashLoader color="#070A52" size={80} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 text-gray-900 font-sans min-h-screen">
        <div className="container mx-auto p-6 md:p-10">
          <header className="text-center mb-12 pt-8">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">UrbanTales Help Center</h1>
            <p className="text-xl text-gray-700 mt-4 max-w-2xl mx-auto">
              Your guide to a seamless shopping experience. Find answers to common questions or connect with our support team.
            </p>
          </header>

          <hr className="my-10 border-gray-300" />

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Popular Topics</h2>

            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="text-3xl mr-3">🛒</span> Ordering & Payments
              </h3>
              <ul className="space-y-6">
                <li><strong>How do I place an order?</strong><br />To place an order, simply browse our categories, add desired items to your cart, and proceed to checkout. Follow the on-screen prompts to enter your shipping details and payment information.</li>
                <li><strong>What payment methods do you accept?</strong><br />We accept major credit/debit cards (Visa, MasterCard, RuPay), Net Banking, UPI, and select digital wallets. All transactions are secure and encrypted.</li>
                <li><strong>Can I change or cancel my order?</strong><br />Orders can be changed or canceled only if they haven't been processed for shipping. Please contact our support team immediately via live chat or email with your order number.</li>
                <li><strong>Is my payment information secure?</strong><br />Absolutely. We use industry-standard SSL encryption and secure payment gateways to protect your personal and financial data. Your security is our top priority.</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="text-3xl mr-3">🚚</span> Shipping & Delivery
              </h3>
              <ul className="space-y-6">
                <li><strong>What are your shipping options and costs?</strong><br />We offer standard and express shipping options across India. Shipping costs vary based on your location and chosen delivery speed, which will be calculated at checkout.</li>
                <li><strong>How long will my order take to arrive?</strong><br />Standard delivery usually takes 3-7 business days, while express delivery takes 1-3 business days, depending on your location.</li>
                <li><strong>How can I track my order?</strong><br />Once your order is dispatched, you'll receive a tracking number via email and SMS. You can track your order status directly on our <Link to="/trackorder" className="text-blue-600 hover:underline font-medium">Track Order</Link> page.</li>
                <li><strong>Do you ship internationally?</strong><br />Currently, we only ship within India. We hope to expand our shipping destinations soon!</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="text-3xl mr-3">↩️</span> Returns & Refunds
              </h3>
              <ul className="space-y-6">
                <li><strong>What is your return policy?</strong><br />We offer a 7-day return policy for most items, starting from the date of delivery. Items must be unused, in original packaging, and with all tags intact. Some exclusions may apply.</li>
                <li><strong>How do I return an item?</strong><br />To initiate a return, log in to your account, go to 'My Orders,' select the item you wish to return, and follow the instructions. You can also contact our support team for assistance.</li>
                <li><strong>When will I receive my refund?</strong><br />Once your returned item is received and inspected, refunds are typically processed within 5-7 business days to your original payment method.</li>
                <li><strong>What if my item is damaged or incorrect?</strong><br />If you receive a damaged or incorrect item, please contact us immediately (within 24 hours of delivery) with photos of the product and packaging. We'll arrange for a replacement or full refund.</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="text-3xl mr-3">👤</span> Account Management
              </h3>
              <ul className="space-y-6">
                <li><strong>How do I create an account?</strong><br />Click on the <Link to="/login" className="text-blue-600 hover:underline font-medium">Login/Sign Up</Link> icon at the top right corner of our website and follow the simple steps to register.</li>
                <li><strong>How do I reset my password?</strong><br />On the login page, click 'Forgot Password?' and enter your registered email address. We'll send you a link to reset your password.</li>
                <li><strong>How can I update my profile information?</strong><br />Log in to your account, navigate to <Link to="/profile" className="text-blue-600 hover:underline font-medium">My Profile</Link>, and you can edit your personal details, shipping addresses, and communication preferences there.</li>
                <li><strong>What are the benefits of having an account?</strong><br />An account allows for faster checkout, order tracking, viewing order history, managing wishlists, and receiving exclusive offers.</li>
              </ul>
            </div>
          </section>

          <hr className="my-10 border-gray-300" />

          <section className="max-w-5xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Need More Help? Talk to Us!</h2>
            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
              If you can't find the answer you're looking for, our friendly support team is here to assist you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center md:justify-start">
                    <span className="text-3xl mr-3">💬</span> Live Chat
                  </h3>
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    Click the button below to start a chat with one of our representatives for immediate assistance.
                  </p>
                  <p className="text-gray-600 text-sm mb-5">
                    <span className="font-semibold text-gray-700">Availability:</span> Monday - Saturday, 9:00 AM - 6:00 PM IST
                  </p>
                </div>
                <button
                  onClick={startLiveChat}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 inline-block w-full md:w-auto mt-auto"
                >
                  Start Live Chat
                </button>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center md:justify-start">
                    <span className="text-3xl mr-3">📧</span> Email Support
                  </h3>
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    Send us an email anytime and we'll get back to you within 24-48 hours.
                  </p>
                  <p className="text-gray-600 text-sm mb-5">
                    <span className="font-semibold text-gray-700">Email:</span> arpanjain00123@gmail.com
                  </p>
                </div>
                <button
                  onClick={redirectToGmailCompose}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out inline-block w-full md:w-auto mt-auto focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  Email Us
                </button>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center md:justify-start">
                    <span className="text-3xl mr-3">📞</span> Phone Support
                  </h3>
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    Prefer to talk? Give us a call during our business hours.
                  </p>
                  <p className="text-gray-600 text-sm mb-5">
                    <span className="font-semibold text-gray-700">Availability:</span> Monday - Friday, 10:00 AM - 5:00 PM IST
                  </p>
                </div>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out inline-block w-full md:w-auto mt-auto focus:outline-none focus:ring-4 focus:ring-purple-300"
                >
                  Call Us
                </a>
                <p className="text-gray-600 text-sm mt-3">+91-XXXXXXXXXX</p>
              </div>
            </div>
          </section>

          <hr className="my-10 border-gray-300" />

          <section className="max-w-3xl mx-auto text-center mt-12 mb-6">
            <p className="text-lg text-gray-600">
              &copy; {new Date().getFullYear()} UrbanTales. All rights reserved.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HelpCenter;
