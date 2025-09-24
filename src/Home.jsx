import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar/>
      <div className="hero-container relative w-full h-screen text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/Foodbank.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center bg-black/50">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            SDG 2: Zero Hunger
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed mb-6">
            This platform connects sources of food with individuals and communities in need, helping to reduce hunger and promote food security.
          </p>
          <Link to="/Register" className="bg-green-500 text-white px-2 py-2 rounded text-2xl 
          [animation:pulse_1.5s_ease-in-out_infinite] 
          [@keyframes_pulse:{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}] 
          hover:bg-green-700">Donate Now
          </Link>
         
        </div>
      </div>
      <div>
        
        <div className="bg-gray-300 px-6 py-10 mx-auto my-5">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
    Our Impact in Numbers
  </h1>

  <div className="py-10 text-green-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
    <div>
      <h1 className="text-4xl sm:text-5xl font-bold">200k+</h1>
      <p>Meals Distributed</p>
    </div>

    <div>
      <h1 className="text-4xl sm:text-5xl font-bold">50K+</h1>
      <p>Families Supported</p>
    </div>

    <div>
      <h1 className="text-4xl sm:text-5xl font-bold">300+</h1>
      <p>Partnerships Developed</p>
    </div>

    <div>
      <h1 className="text-4xl sm:text-5xl font-bold">200+</h1>
      <p>Volunteer Hours Contributed</p>
    </div>
  </div>
</div>
</div>


       <div className="my-8 px-4">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
    Our Mission
  </h1>
  <div className="mx-auto grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl 
  
">

    <div className="relative flex items-center justify-center text-center rounded-lg shadow-md hover:shadow-lg transition overflow-hidden w-full h-64">
  <img
    src="/hungrychildren.jpg"
    alt="Zero Hunger"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/50"></div>

  <h2 className="relative z-10 text-xl font-semibold text-white px-4">
    Achieve Zero Hunger (SDG 2) in Kenya
  </h2>
</div>


    <div className="relative flex flex-col items-center justify-center text-center p-4 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden w-full h-64">
      <img
        src="community.jpg"
        alt="Community Support"
        className="absolute insert-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <h2 className="relative z-10 text-xl font-semibold text-white px-4">
        Empower Local Communities
      </h2>
    </div>

    <div className="relative flex flex-col items-center text-center p-4 rounded-lg shadow-md hover:shadow-lg overflow-hidden transition w-full h-64">
      <img
        src="partnerships.jpg"
        alt="Partnerships"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <h2 className="relative z-10 text-xl font-semibold text-white px-4 py-18">
        Build Strong Partnerships
      </h2>
    </div>

    <div className="relative flex flex-col items-center text-center p-4 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden w-full h-64">
      <img
        src="/food.jpg"
        alt="Education"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <h2 className="relative z-10 px-4 py-18 text-xl text-white font-semibold">
        Promote Food Education
      </h2>
    </div>
  </div>
</div>
<Footer/>
    </div>
  );
}

export default Home;
