import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Components/Navbar'; 
import Footer from '../Components/Footer';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const TrackOrder = () => {
    // State to store shipping address geolocation
    const [shippingLocation, setShippingLocation] = useState(null);
    const [locationError, setLocationError] = useState(null); // Renamed for clarity

    // Refs to hold the map and marker instances, preventing re-initialization on re-renders
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    // State for order details, initialized with default/empty values
    const [orderDetails, setOrderDetails] = useState({
        orderPlacedDate: 'N/A',
        totalAmount: '₹ 0.00',
        shipTo: 'N/A', // This will be updated from localStorage
        orderNumber: '#N/A',
        paymentMethod: 'N/A',
        currentStatus: 'Order Confirmed',
        estimatedDelivery: 'Fetching...',
        timeline: [
            { status: 'Order Confirmed', completed: false },
            { status: 'Picked Up', completed: false },
            { status: 'Shipping', completed: false },
            { status: 'Out for Delivery', completed: false },
            { status: 'Delivered', completed: false },
        ]
    });

    useEffect(() => {
        // --- Order Details Fetching Logic ---
        const storedOrder = localStorage.getItem('lastPlacedOrder');
        let parsedOrder = null;
        if (storedOrder) {
            try {
                parsedOrder = JSON.parse(storedOrder);
                let updatedTimeline = orderDetails.timeline.map(item => ({ ...item, completed: false }));
                let currentStatusText = 'Order Confirmed';

                if (parsedOrder.paymentStatus === 'Successful' || parsedOrder.paymentMethod === 'cod') {
                    // Simulate progress after successful payment or COD
                    updatedTimeline[0].completed = true; // Order Confirmed
                    updatedTimeline[1].completed = false; // Picked Up (simulated)
                    updatedTimeline[2].completed = false; // Shipping (simulated)
                    currentStatusText = 'Order Confirmed'; // Set current status
                }

                setOrderDetails(prevDetails => ({
                    ...prevDetails,
                    orderPlacedDate: parsedOrder.orderDate || 'N/A',
                    totalAmount: `₹ ${parseFloat(parsedOrder.totalAmount).toFixed(2)}` || '₹ 0.00',
                    shipTo: parsedOrder.address || 'N/A',
                    orderNumber: parsedOrder.orderId || '#N/A',
                    paymentMethod: getPaymentMethodDisplayName(parsedOrder.paymentMethod) || 'N/A',
                    currentStatus: currentStatusText,
                    timeline: updatedTimeline,
                    estimatedDelivery: 'Approx. 5-7 business days'
                }));
            } catch (error) {
                console.error("Error parsing order details from localStorage:", error);
                localStorage.removeItem('lastPlacedOrder'); // Clear invalid data
            }
        } else {
            console.warn("No 'lastPlacedOrder' found in localStorage.");
        }

        // --- Map Initialization and Shipping Location Display ---
        // Default to Agra, India if no specific shipping address is found or geocoding fails
        const defaultLatitude = 27.1751;
        const defaultLongitude = 78.0421;
        const defaultZoom = 13;

        // Initialize map only once when the component mounts
        if (!mapRef.current) {
            mapRef.current = L.map('map-container').setView([defaultLatitude, defaultLongitude], defaultZoom);

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);
        }

        // Use the shipTo address for the map
        const addressToMap = parsedOrder?.address || 'Agra, India'; // Fallback to Agra if no address in order

        // Simulate geocoding for the shipping address
        // In a real application, you would use a geocoding API here (e.g., Google Maps Geocoding API, OpenStreetMap Nominatim)
        // For this example, we'll use hardcoded coordinates for Agra as a placeholder.
        // If you were to integrate a real geocoding service, this section would involve an async call.
        const geocodedLatitude = defaultLatitude; // Placeholder for geocoded latitude
        const geocodedLongitude = defaultLongitude; // Placeholder for geocoded longitude

        const newLatLng = new L.LatLng(geocodedLatitude, geocodedLongitude);

        setShippingLocation({ latitude: geocodedLatitude, longitude: geocodedLongitude, address: addressToMap });
        setLocationError(null); // Clear any previous errors

        // Add or update marker on the map
        if (!markerRef.current) {
            markerRef.current = L.marker(newLatLng).addTo(mapRef.current)
                .bindPopup(`Shipping to: ${addressToMap}`) // Optional popup
                .openPopup();
        } else {
            markerRef.current.setLatLng(newLatLng);
            markerRef.current.getPopup().setContent(`Shipping to: ${addressToMap}`);
        }

        // Center the map on the shipping location
        mapRef.current.setView(newLatLng, defaultZoom);

    }, []); // Empty dependency array ensures this runs only once on component mount

    // Helper function to get a readable payment method name
    const getPaymentMethodDisplayName = (method) => {
        switch (method) {
            case 'card': return 'Credit/Debit Card';
            case 'netbanking': return 'Net Banking';
            case 'upi': return 'UPI';
            case 'cod': return 'Cash on Delivery';
            default: return method;
        }
    };

    // --- Component Styles ---
    const componentStyles = `
        :root {
            --primary-blue: #070A52;
            --secondary-yellow: #FFCC00;
            --light-grey: #f0f0f0;
            --dark-grey: #333;
            --text-color: #555;
            --border-color: #ddd;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--light-grey);
        }

        .order-tracking-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: #f7f7f7;
            padding: 20px;
        }

        .browser-mockup {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            margin: 0 auto;
            width: 90%;
            max-width: 1200px;
            margin-top: 30px;
        }

        .browser-header {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            background-color: #e2e2e2;
            border-bottom: 1px solid #ccc;
        }

        .browser-buttons span {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }

        .browser-buttons .close { background-color: #ff5f56; }
        .browser-buttons .minimize { background-color: #ffbd2e; }
        .browser-buttons .maximize { background-color: #27c93f; }

        .browser-address-bar {
            flex-grow: 1;
            margin: 0 15px;
        }

        .browser-address-bar input {
            width: 100%;
            padding: 6px 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 0.9em;
            text-align: center;
            color: #666;
        }

        .browser-search i {
            color: #666;
            font-size: 1.2em;
        }

        .tracking-content {
            padding: 30px;
        }

        .tracking-content h2 {
            color: var(--primary-blue);
            font-size: 1.5em;
            margin-bottom: 20px;
            text-align: center;
            text-transform: uppercase;
        }

        .tracking-content .note {
            font-size: 0.9em;
            color: var(--text-color);
            text-align: center;
            margin-bottom: 30px;
        }

        .order-summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 40px;
            background-color: var(--light-grey);
        }

        .summary-item {
            text-align: center;
            padding: 10px 0;
            /* Add the background color here */
            background-color: #FFCC00; /* This applies the desired background color */
            border-radius: 5px; /* Optional: adds a slight rounded corner to each item */
        }

        .summary-item span {
            display: block;
            font-size: 0.8em;
            color: var(--text-color);
            margin-bottom: 5px;
            text-transform: uppercase;
            font-weight: bold;
        }

        .summary-item strong {
            font-size: 1.1em;
            color: var(--dark-grey);
        }

        .order-status-section {
            margin-bottom: 40px;
        }

        .order-status-section h3 {
            font-size: 1.3em;
            color: var(--primary-blue);
            margin-bottom: 10px;
        }

        .order-status-section .current-status {
            color: var(--secondary-yellow);
            font-weight: bold;
        }

        .order-status-section p {
            font-size: 0.9em;
            color: var(--text-color);
            margin-bottom: 20px;
        }

        .timeline {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
            padding: 20px 0;
            margin-top: 20px;
        }

        .timeline::before {
            content: '';
            position: absolute;
            top: 35px;
            left: 0;
            right: 0;
            height: 4px;
            background-color: var(--border-color);
            z-index: 0;
        }

        .timeline-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            flex: 1;
            position: relative;
            z-index: 1;
        }

        .timeline-dot {
            width: 30px;
            height: 30px;
            background-color: #fff;
            border: 3px solid var(--border-color);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .timeline-item.completed .timeline-dot {
            background-color: var(--secondary-yellow);
            border-color: var(--secondary-yellow);
            color: var(--primary-blue);
        }

        .timeline-item.completed .timeline-dot i {
            color: var(--primary-blue);
        }

        .timeline-dot i {
            font-size: 1.2em;
        }

        .timeline-info {
            font-size: 0.9em;
            color: var(--text-color);
        }

        .timeline-info .status-name {
            font-weight: bold;
            color: var(--dark-grey);
            margin-bottom: 5px;
        }

        .timeline-info .status-date {
            color: var(--text-color);
        }

        .shipping-information {
            margin-top: 40px;
        }

        .shipping-information h3 {
            font-size: 1.3em;
            color: var(--primary-blue);
            margin-bottom: 20px;
        }

        .map-section {
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            position: relative;
        }

        /* Essential for Leaflet map to display */
        #map-container {
            height: 300px;
            width: 100%;
            border-radius: 8px;
        }

        .user-location-info {
            margin-top: 20px;
            padding: 15px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background-color: var(--light-grey);
            text-align: center;
            font-size: 0.9em;
            color: var(--text-color);
        }
        .user-location-info p {
            margin: 5px 0;
        }
        .user-location-info .error {
            color: #d9534f;
            font-weight: bold;
        }

        .copyright {
            text-align: center;
            padding: 20px;
            font-size: 0.8em;
            color: var(--text-color);
            margin-top: auto;
            background-color: #fff;
            border-top: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
            .order-summary {
                grid-template-columns: 1fr;
            }

            .timeline {
                flex-direction: column;
                align-items: flex-start;
                padding-left: 20px;
            }

            .timeline::before {
                left: 30px;
                top: 0;
                bottom: 0;
                width: 4px;
                height: 100%;
            }

            .timeline-item {
                flex-direction: row;
                text-align: left;
                margin-bottom: 20px;
                width: 100%;
                align-items: center;
            }

            .timeline-dot {
                margin-right: 15px;
                margin-bottom: 0;
            }

            .timeline-line {
                display: none;
            }
        }
    `;

    return (
        <div className="order-tracking-container">
            <style dangerouslySetInnerHTML={{ __html: componentStyles }} />

            <Navbar />

            <div className="browser-mockup">
                

                <div className="tracking-content">
                    <h2>TRACK YOUR ORDER</h2>
                    <p className="note">Please note that estimated dates are subject to change without prior notice. For precise updates, refer to the live tracking below.</p>

                    <div className="order-summary">
                        <div className="summary-item">
                            <span>ORDER PLACED ON</span>
                            <strong>{orderDetails.orderPlacedDate}</strong>
                        </div>
                        <div className="summary-item">
                            <span>TOTAL AMOUNT</span>
                            <strong>{orderDetails.totalAmount}</strong>
                        </div>
                        <div className="summary-item">
                            <span>PAYMENT METHOD</span>
                            <strong>{orderDetails.paymentMethod}</strong>
                        </div>
                        <div className="summary-item">
                            <span>SHIPPING TO</span>
                            <strong>{orderDetails.shipTo}</strong>
                        </div>
                        <div className="summary-item">
                            <span>ORDER ID</span>
                            <strong>{orderDetails.orderNumber}</strong>
                        </div>
                    </div>

                    <div className="order-status-section">
                        <h3>Current Status: <span className="current-status">{orderDetails.currentStatus}</span></h3>
                        <p>Estimated Delivery: {orderDetails.estimatedDelivery}</p>

                        <div className="timeline">
                            {orderDetails.timeline.map((item, index) => (
                                <div key={index} className={`timeline-item ${item.completed ? 'completed' : ''}`}>
                                    <div className="timeline-dot">
                                        {item.completed && <i className="fas fa-check-circle"></i>}
                                    </div>
                                    <div className="timeline-info">
                                        <p className="status-name">{item.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="shipping-information">
                        <h3>LIVE TRACKING</h3>
                        <p className="note">Get real-time updates on your order's journey.</p>
                        <div className="map-section">
                            {/* This is where the Leaflet map will be rendered */}
                            <div id="map-container"></div>
                        </div>

                        <div className="user-location-info">
                            <h4>Shipping Address Location (Approximate)</h4>
                            {locationError && <p className="error">{locationError}</p>}
                            {shippingLocation ? (
                                <>
                                    <p>Address: {shippingLocation.address}</p>
                                    <p>Latitude: {shippingLocation.latitude.toFixed(6)}</p>
                                    <p>Longitude: {shippingLocation.longitude.toFixed(6)}</p>
                                    <p>
                                        <a
                                            href={`https://www.openstreetmap.org/?mlat=${shippingLocation.latitude}&mlon=${shippingLocation.longitude}#map=15/${shippingLocation.latitude}/${shippingLocation.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#070A52', textDecoration: 'underline' }}
                                        >
                                            View on OpenStreetMap
                                        </a>
                                    </p>
                                </>
                            ) : (
                                !locationError && <p>Fetching shipping location...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <div className="copyright">
                <p>© {new Date().getFullYear()} UrbanTales. All rights reserved.</p>
            </div>
        </div>
    );
};

export default TrackOrder;