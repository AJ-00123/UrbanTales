import React, { useContext, useState } from 'react'
import ai from "../assets/ai.gif" // Your animated GIF
import AII from "../assets/AII.png" // Your static image
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"


function Ai() {
  let { showSearch , setShowSearch } = useContext(ShopContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false) // This state now directly controls GIF visibility
  let openingSound = new Audio(open)

  function speak(message){
    let utterence = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = speechRecognition ? new speechRecognition() : null;

  if (!recognition) {
    console.warn("Speech Recognition not supported in this browser.");
    return null; 
  }

  // --- Speech Recognition Event Handlers ---
  recognition.onstart = () => {
    setActiveAi(true); // Set AI active when listening starts
  };

  recognition.onresult = (e)=>{
    const transcript = e.results[0][0].transcript.trim().toLowerCase();
    
    // Commands for opening/closing search and navigating to Collection
    if(transcript.includes("search") && transcript.includes("open") && !showSearch){
      speak("opening search")
      setShowSearch(true) 
      navigate("/category") // Changed from /collection to /category as per App.jsx
    }
    else if(transcript.includes("search") && transcript.includes("close") && showSearch){
      speak("closing search")
      setShowSearch(false) 
    }
    else if(transcript.includes("collection") || transcript.includes("collections") || transcript.includes("product") || transcript.includes("products") || transcript.includes("category") || transcript.includes("categories")){
      speak("opening category page")
      navigate("/category")
      setShowSearch(false) // Close search on navigation
    }
    // General Navigation Commands
    else if(transcript.includes("home") || transcript.includes("homepage")){
      speak("opening home page")
      navigate("/")
      setShowSearch(false) 
    }
    else if(transcript.includes("about") || transcript.includes("about page")){
      speak("opening about page")
      navigate("/about")
      setShowSearch(false) 
    }
    else if(transcript.includes("contact") || transcript.includes("contact us")){
      speak("opening contact page")
      navigate("/contact")
      setShowSearch(false) 
    }
    else if(transcript.includes("cart") || transcript.includes("my cart") || transcript.includes("shopping cart")){
      speak("opening your cart")
      navigate("/cartpage")
      setShowSearch(false) 
    }
    else if(transcript.includes("order") || transcript.includes("my orders") || transcript.includes("track order")){
      speak("opening your orders page")
      navigate("/trackorder")
      setShowSearch(false) 
    }
    else if(transcript.includes("product details") || transcript.includes("details product")){
      speak("showing product details")
      navigate("/productdetails")
      setShowSearch(false) 
    }
    else if(transcript.includes("sell") || transcript.includes("seller") || transcript.includes("become a seller")){
      speak("opening seller onboarding page")
      navigate("/seller-onboarding")
      setShowSearch(false) 
    }
    else if(transcript.includes("seller form") || transcript.includes("apply as seller")){
      speak("opening seller application form")
      navigate("/sellerform")
      setShowSearch(false) 
    }
    else if(transcript.includes("dashboard") || transcript.includes("my dashboard") || transcript.includes("seller dashboard")){
      speak("opening your dashboard")
      navigate("/dashboard")
      setShowSearch(false) 
    }
    else if(transcript.includes("checkout") || transcript.includes("secure checkout")){
      speak("proceeding to secure checkout")
      navigate("/checkout")
      setShowSearch(false) 
    }
    else if(transcript.includes("welcome") || transcript.includes("welcome page") || transcript.includes("zarvoc welcome")){
      speak("opening welcome page")
      navigate("/welcomepage")
      setShowSearch(false) 
    }
    else if(transcript.includes("login") || transcript.includes("sign in") || transcript.includes("user login")){
      speak("opening login page")
      navigate("/login")
      setShowSearch(false) 
    }
    else if(transcript.includes("brand marquee") || transcript.includes("marquee") || transcript.includes("brands")){
      speak("opening brand marquee page")
      navigate("/marque")
      setShowSearch(false) 
    }
    else if(transcript.includes("profile") || transcript.includes("my profile") || transcript.includes("view profile")){
      speak("opening your profile page")
      navigate("/profile")
      setShowSearch(false) 
    }
    else if(transcript.includes("edit profile") || transcript.includes("update profile") || transcript.includes("change profile")){
      speak("opening edit profile page")
      navigate("/editprofile")
      setShowSearch(false) 
    }
    else if(transcript.includes("authentication") || transcript.includes("auth page") || transcript.includes("signup") || transcript.includes("user signup")){
      speak("opening authentication page")
      navigate("/auth")
      setShowSearch(false) 
    }
    else if(transcript.includes("seller login") || transcript.includes("seller authentication") || transcript.includes("seller auth")){
      speak("opening seller login page")
      navigate("/sellerlogin")
      setShowSearch(false) 
    }
    else if(transcript.includes("help center") || transcript.includes("support")){
      speak("opening help center")
      navigate("/helpcenter")
      setShowSearch(false) 
    }
    else if(transcript.includes("") || transcript.includes("support")){
      speak("opening registration Center")
      navigate("/register")
      setShowSearch(false) 
    }
     
    else {
      toast.error("I didn't understand that. Please try again.")
    }
  }

  recognition.onend = () => {
    setActiveAi(false); // Set AI inactive when listening ends
  }
  // --- End Speech Recognition Event Handlers ---

  const handleAiClick = () => {
    if (recognition) {
      recognition.start(); // Start listening
      openingSound.play();
    } else {
      toast.info("Your browser does not support speech recognition.");
    }
  };

  return (
    <div 
      className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]'
      onClick={handleAiClick}
    >
      <img 
        src={activeAi ? ai : AII} 
        alt="AI Assistant" 
        className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-150 ' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform`} 
        style={{
          filter: `${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 0px black)"}`
        }} 
      />
    </div>
  )
}

export default Ai;
