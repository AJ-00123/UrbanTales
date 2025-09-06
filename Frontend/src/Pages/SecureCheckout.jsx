import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const SecureCheckout = () => {
  const navigate = useNavigate();

  // State for form inputs and UI logic
  const [selectedPayment, setSelectedPayment] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [instructions, setInstructions] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    mobile: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  });

  // Derived state for button enablement and validations
  const isCouponValid = couponCode.trim() !== '';
  const isUpiValid = upiId.trim() !== '';
  const isAddressComplete =
    userInfo.name && userInfo.mobile && userInfo.address && userInfo.city && userInfo.pincode && userInfo.state;

  const isPayButtonEnabled =
    selectedPayment &&
    (selectedPayment !== 'upi' || (isUpiValid && isUpiVerified)) &&
    isAddressComplete &&
    !isEditingAddress;

  // Simulate initial loading for a better user experience
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch subtotal from cart and load saved user info on component mount
  useEffect(() => {
    const fetchSubtotal = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?.id;

      if (!userId) {
        // Fallback or default subtotal if user is not logged in or cart cannot be fetched
        console.warn('User ID not found in localStorage. Using default subtotal.');
        setSubtotal(500); // Example default subtotal
        return;
      }

      try {
        // Fetch cart data from your backend API
        const res = await fetch(`http://localhost:3000/api/cart/${userId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // Calculate sum of items based on price and quantity
        const sum = data.items?.reduce((acc, item) => acc + item.price * item.qty, 0) || 0;
        setSubtotal(sum);
      } catch (err) {
        console.error('Failed to fetch cart subtotal:', err);
        setSubtotal(500); // Fallback to a default subtotal on error
      }
    };

    fetchSubtotal();

    // Load saved user info from localStorage if available
    const savedUserInfo = JSON.parse(localStorage.getItem('checkoutUserInfo'));
    if (savedUserInfo) {
      setUserInfo(savedUserInfo);
    }
  }, []);

  // Save userInfo to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('checkoutUserInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  // Function to apply coupon code
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'URBANTALES' || code === 'AJ001') {
      // Apply 20% discount on (subtotal + delivery charge)
      setDiscount((subtotal + 50) * 0.2);
      alert('✅ Coupon Applied: 20% discount');
    } else {
      setDiscount(0);
      alert('❌ Invalid Coupon');
    }
  };

  // Handle payment method selection
  const handlePaymentSelect = (e) => {
    setSelectedPayment(e.target.value);
    setIsUpiVerified(false); // Reset UPI verification on payment method change
  };

  // Function to save order details to localStorage and navigate
  const saveOrderDetailsAndNavigate = (paymentStatus) => {
    const orderDetails = {
      orderId: `ORD-${Date.now()}`, // Simple unique ID (for demonstration)
      name: userInfo.name,
      mobile: userInfo.mobile, // Save mobile
      address: `${userInfo.address}, ${userInfo.city}, ${userInfo.state} - ${userInfo.pincode}`,
      totalAmount: discountedTotal.toFixed(2), // Ensure amount is formatted, rename to totalAmount for clarity
      paymentMethod: selectedPayment, // Save the raw selectedPayment value
      paymentStatus: paymentStatus, // "Successful" or "Pending" etc.
      instructions: instructions,
      orderDate: new Date().toLocaleString() // Current date and time
    };
    // Save these details to a new key 'lastPlacedOrder'
    localStorage.setItem('lastPlacedOrder', JSON.stringify(orderDetails));
    navigate('/orderconfirmed'); // Navigate to the order confirmation page
  };

  // Handle Razorpay (and COD) payment initiation
  const handleRazorpayPayment = async () => {
    // Validate address fields before proceeding
    if (!isAddressComplete) {
      alert('Please fill in all address details before proceeding with payment.');
      setIsEditingAddress(true); // Open address editing if fields are missing
      return;
    }

    // Handle Cash on Delivery (COD) payment
    if (selectedPayment === 'cod') {
      alert('✅ Cash on Delivery selected! Your order will be confirmed.');
      saveOrderDetailsAndNavigate('Pending'); // For COD, payment is pending until delivery
      return;
    }

    // Handle online payments via Razorpay
    try {
      const totalAmountInPaise = Math.round(discountedTotal * 100); // Razorpay expects amount in paise

      // Request order creation from your backend
      const res = await fetch('http://localhost:3000/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmountInPaise })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Backend error creating Razorpay order: ${errorData.message || res.statusText}`);
      }

      const orderData = await res.json();

      // Razorpay options for the payment popup
      const options = {
        key: 'rzp_test_QMG1XV6hszJZlA', // Your Razorpay Key ID from environment variables or config
        amount: orderData.amount, // Amount received from your backend
        currency: orderData.currency,
        name: 'UrbanTales',
        description: 'Order Payment',
        order_id: orderData.id, // Order ID from your backend
        handler: function (response) {
          // This function executes on successful payment
          alert('✅ Payment successful! Your order has been placed.');
          saveOrderDetailsAndNavigate('Successful'); // Save details and navigate to confirmation
        },
        prefill: {
          name: userInfo.name,
          email: 'customer@example.com', // Replace with actual user email if available
          contact: userInfo.mobile
        },
        theme: {
          color: '#070A52' // Custom theme color
        },
        image: 'https://seeklogo.com/images/R/razorpay-logo-B4B31B7918-seeklogo.com.png' // Your company logo
      };

      // Create and open the Razorpay payment instance
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error('Razorpay payment initiation error:', err);
      alert('Something went wrong with the payment. Please try again!');
    }
  };

  // Show loading spinner while component is initializing
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <HashLoader color="#070A52" size={80} />
      </div>
    );
  }

  // Calculate the total amount after discount and delivery charges
  const discountedTotal = subtotal + 50 - discount; // Assuming 50 is a fixed delivery charge

  return (
    <div className="bg-gray-200 text-gray-800 min-h-screen flex flex-col justify-between">
      <Navbar />

      <div className="flex-grow">
        <header className="bg-white flex justify-between items-center px-6 py-4 shadow">
          <div className="text-xl font-bold text-[#070A52]">Checkout</div>
          <div className="text-2xl">🛒</div>
        </header>

        <main className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-4">
          <section className="md:col-span-2 space-y-4">
            {/* Address Section */}
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-start"> {/* Align items to start for button placement */}
                <div className="w-full">
                  <h2 className="font-semibold text-[#070A52] mb-2">Delivering to you</h2>
                  {isEditingAddress ? (
                    <div className="space-y-2 text-sm">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Mobile Number"
                        className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                        value={userInfo.mobile}
                        onChange={(e) => setUserInfo({ ...userInfo, mobile: e.target.value })}
                        required
                      />
                      <textarea
                        placeholder="Address (House No., Building, Street, Area)"
                        className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                        value={userInfo.address}
                        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                        rows="3"
                        required
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2"> {/* Responsive grid for address parts */}
                        <input
                          type="text"
                          placeholder="City"
                          className="border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                          value={userInfo.city}
                          onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Pincode"
                          className="border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                          value={userInfo.pincode}
                          onChange={(e) => setUserInfo({ ...userInfo, pincode: e.target.value })}
                          required
                        />
                        <input
                          type="text"
                          placeholder="State"
                          className="border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                          value={userInfo.state}
                          onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm leading-relaxed">
                      {isAddressComplete ? (
                        <>
                          <p><strong>{userInfo.name}</strong> ({userInfo.mobile})</p>
                          <p>{userInfo.address}</p>
                          <p>{userInfo.city}, {userInfo.state} - {userInfo.pincode}</p>
                        </>
                      ) : (
                        <p className="text-red-500">Please add your delivery address details to proceed.</p>
                      )}
                    </div>
                  )}

                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline block mt-3"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default link behavior
                      alert('You can write specific delivery instructions in the text box below.');
                    }}
                  >
                    Add delivery instructions
                  </a>
                  <textarea
                    className="w-full mt-2 border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="E.g., 'Leave package at the door', 'Call before delivery'"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows="2"
                  />
                </div>
                <button
                  onClick={() => {
                    if (isEditingAddress) {
                      // Attempt to save, check if all fields are filled
                      if (isAddressComplete) {
                        setIsEditingAddress(false);
                      } else {
                        alert('Please fill in all address fields before saving.');
                      }
                    } else {
                      // Enter editing mode
                      setIsEditingAddress(true);
                    }
                  }}
                  className="text-sm font-semibold text-[#070A52] hover:underline ml-4 whitespace-nowrap"
                >
                  {isEditingAddress ? 'Save Address' : 'Edit Address'}
                </button>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold text-[#070A52] mb-4">Payment Method</h2>
              <div className="mb-4">
                <label htmlFor="couponInput" className="font-medium text-[#070A52]">Apply Coupon</label>
                <div className="flex mt-1 space-x-2">
                  <input
                    id="couponInput"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-1/2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter code (e.g., URBANTALES)"
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={!isCouponValid}
                    className={`px-4 py-1 rounded text-sm transition-all duration-200 ${
                      isCouponValid
                        ? 'bg-[#070A52] hover:bg-[#060844] text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <fieldset className="border border-gray-300 rounded p-4 space-y-4">
                <legend className="font-medium text-[#070A52] px-2">Payment Options</legend>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={selectedPayment === 'card'}
                    onChange={handlePaymentSelect}
                    className="form-radio h-4 w-4 text-[#070A52]"
                  />
                  <span className="flex items-center space-x-2">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyHdEg7zNW7pe7MrW4qN9qBSH29HBRQuOfnA&s"
                      className="h-5 w-5"
                      alt="razorpay"
                    />
                    <span>Credit/Debit Card via Razorpay</span>
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={selectedPayment === 'netbanking'}
                    onChange={handlePaymentSelect}
                    className="form-radio h-4 w-4 text-[#070A52]"
                  />
                  <span>Net Banking</span>
                </label>
                {selectedPayment === 'netbanking' && (
                  <select className="mt-1 ml-6 border border-gray-300 rounded px-2 py-1 w-2/3 sm:w-1/2 text-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                )}

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={selectedPayment === 'upi'}
                    onChange={handlePaymentSelect}
                    className="form-radio h-4 w-4 text-[#070A52]"
                  />
                  <span>Other UPI Apps (PhonePe, Google Pay, etc.)</span>
                </label>
                {selectedPayment === 'upi' && (
                  <div className="flex mt-1 ml-6 items-center space-x-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        setIsUpiVerified(false); // Reset verification if UPI ID changes
                      }}
                      disabled={selectedPayment !== 'upi'}
                      placeholder="YourUPIID@bankname"
                      className={`border border-gray-300 rounded px-3 py-1 text-sm flex-grow ${
                        selectedPayment !== 'upi' ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-blue-500 focus:border-blue-500'
                      }`}
                    />
                    <button
                      type="button"
                      disabled={!isUpiValid || selectedPayment !== 'upi' || isUpiVerified} // Disable if already verified
                      onClick={() => setIsUpiVerified(true)} // Simulate UPI verification
                      className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
                        isUpiValid && selectedPayment === 'upi' && !isUpiVerified
                          ? 'bg-[#070A52] hover:bg-[#060844] text-white cursor-pointer'
                          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Verify
                    </button>
                    {isUpiVerified && <span className="text-green-600 text-sm">✅ Verified</span>}
                  </div>
                )}

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={selectedPayment === 'cod'}
                    onChange={handlePaymentSelect}
                    className="form-radio h-4 w-4 text-[#070A52]"
                  />
                  <span>Cash on Delivery / Pay on Delivery</span>
                </label>
              </fieldset>
            </div>
          </section>

          {/* Order Summary Section */}
          <aside className="bg-white p-4 rounded shadow h-fit sticky top-4"> {/* Sticky for better UX */}
            <button
              className={`w-full py-2 rounded text-base mb-4 transition-all duration-200 ${
                isPayButtonEnabled
                  ? 'bg-[#FFCC00] hover:bg-yellow-400 text-[#070A52] font-semibold cursor-pointer'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
              disabled={!isPayButtonEnabled}
              onClick={handleRazorpayPayment}
            >
              Pay ₹{discountedTotal.toFixed(2)}
            </button>

            <h3 className="font-semibold text-[#070A52] mb-3 border-b pb-2">Order Summary</h3>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between"><span>Items Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></li>
              <li className="flex justify-between"><span>Delivery Charges:</span><span>₹50.00</span></li>
              <li className="flex justify-between text-green-600"><span>Promotion Applied:</span><span>- ₹{discount.toFixed(2)}</span></li>
              <hr className="my-2 border-gray-300" />
              <li className="flex justify-between font-bold text-lg mt-2">
                <span>Order Total:</span><span>₹{discountedTotal.toFixed(2)}</span>
              </li>
            </ul>
          </aside>
        </main>
      </div>

      <Footer />
    </div>
  );
};


export default SecureCheckout;
