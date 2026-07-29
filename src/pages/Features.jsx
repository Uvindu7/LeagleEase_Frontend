import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  UserPlus,
  Calendar,
  Video,
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle,
  HelpCircle,
  FileText,
  UserCheck
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import bgImage from "../assets/hero-background1.jpg";

const Features = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");

  const getInitialTab = () => {
    const validTabs = ["registration", "booking", "consultation"];
    return validTabs.includes(tabParam) ? tabParam : "registration";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  useEffect(() => {
    const validTabs = ["registration", "booking", "consultation"];
    if (tabParam && validTabs.includes(tabParam) && activeTab !== tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab]);

  const tabs = [
    {
      id: "registration",
      label: "User Registration",
      icon: <UserPlus className="w-5 h-5" />,
    },
    {
      id: "booking",
      label: "Appointment Booking",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "consultation",
      label: "Video Consultation",
      icon: <Video className="w-5 h-5" />,
    },
  ];

  const handleAction = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-[#fcf8f2] min-h-screen text-[#4b4030]">
      <Navbar />

      {/* Hero Banner Section */}
      <section
        className="relative bg-no-repeat bg-top bg-cover py-28 px-6 md:px-20 mt-16 overflow-hidden flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay with radial and linear falloffs */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2419cb]/85 via-[#4b4030dc]/90 to-[#fcf8f2]"></div>

        <div className="relative max-w-4xl mx-auto text-center text-white z-10">
          <span className="bg-[#f3d999] text-[#4b4030] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4 shadow-md animate-pulse">
            Workflow Guide
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-md text-[#f3d999]">
            How LegalEase Works
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-gray-200 font-light max-w-2xl mx-auto">
            Discover how easy it is to find legal representation, schedule appointments, 
            and meet with certified professionals virtually.
          </p>
        </div>
      </section>

      {/* Tabs and Details Area */}
      <main className="max-w-6xl mx-auto px-6 py-12 -mt-10 relative z-20">
        
        {/* Tab Selection Row */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#4b4030]/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 border border-[#f3d999]/25 max-w-full overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-[#f3d999] text-[#4b4030] shadow-lg scale-105"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card Content */}
        <div className="bg-[#fffdfa] rounded-3xl shadow-2xl border border-[#4b4030]/10 overflow-hidden min-h-[500px] transition-all duration-500 hover:shadow-[#4b4030]/5 hover:border-[#a68e56]/40">
          
          {/* Tab 1: Registration */}
          {activeTab === "registration" && (
            <div className="grid md:grid-cols-12 gap-0 animate-fadeIn transition-opacity duration-300">
              
              {/* Image & Main Info Column */}
              <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-[#f3d999]/30 rounded-xl">
                      <UserPlus className="w-8 h-8 text-[#a68e56]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#a68e56] uppercase tracking-wider">Step 1</span>
                      <h2 className="text-3xl font-bold">Creating Your Profile</h2>
                    </div>
                  </div>
                  
                  <p className="text-[#695d4d] leading-relaxed mb-8 text-base">
                    Getting started with LegalEase is quick and straightforward. The platform offers custom registration workflows depending on whether you are looking for advice or providing professional legal services.
                  </p>

                  <h3 className="text-lg font-bold mb-4 border-b pb-2 border-gray-100 flex items-center space-x-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#a68e56]"></span>
                    <span>Detailed Steps to Register</span>
                  </h3>
                  
                  <ul className="space-y-6 text-sm text-[#4b4030] mr-4">
                    <li className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4b4030] text-[#f3d999] flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <strong className="block text-base mb-0.5">Select Your Role</strong>
                        <span className="text-[#695d4d]">Choose either the **Client** role to find legal support, or the **Lawyer** role to list your practice.</span>
                      </div>
                    </li>

                    <li className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4b4030] text-[#f3d999] flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <strong className="block text-base mb-0.5">Provide Contact & Professional Details</strong>
                        <span className="text-[#695d4d]">Provide your basic details. Lawyers upload credentials, list their legal specializations (e.g., family law, civil law, corporate), and select their standard rates.</span>
                      </div>
                    </li>

                    <li className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4b4030] text-[#f3d999] flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <strong className="block text-base mb-0.5">Verify and Set Availability</strong>
                        <span className="text-[#695d4d]">Verify your details via email. Lawyers proceed to the calendar configurations tab to choose when they are open to receive bookings.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAction("/register")}
                    className="flex items-center justify-center space-x-2 bg-[#a68e56] text-black font-bold px-8 py-3.5 rounded-xl hover:bg-[#e0d4aa] transition-colors shadow-lg active:scale-95"
                  >
                    <span>Sign Up Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction("/login")}
                    className="flex items-center justify-center space-x-2 border border-[#4b4030]/30 font-semibold px-8 py-3.5 rounded-xl hover:bg-black/5 transition-colors"
                  >
                    <span>Sign In to Existing Account</span>
                  </button>
                </div>
              </div>

              {/* Sidebar Help / Alert Column */}
              <div className="md:col-span-5 bg-[#4b4030]/5 border-t md:border-t-0 md:border-l border-[#4b4030]/10 p-8 md:p-12 flex flex-col justify-center">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-[#a68e56]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#f3d999]/10 rounded-full -mr-8 -mt-8"></div>
                  
                  <div className="flex items-center space-x-2.5 mb-4 text-[#a68e56]">
                    <UserCheck className="w-6 h-6" />
                    <h4 className="font-bold text-lg">Lawyer Verification Process</h4>
                  </div>
                  
                  <p className="text-sm text-[#695d4d] leading-relaxed mb-4">
                    In order to maintain safety and compliance on our platform, all lawyer profiles require official manual validation.
                  </p>
                  
                  <div className="space-y-3 mt-4 text-xs text-[#4b4030]">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Admin screens professional registrations.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Verifies details with legal register records.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Approves status to go live.</span>
                    </div>
                  </div>

                  <div className="mt-6 bg-[#f3d999]/20 p-3 rounded-lg border border-[#f3d999] text-xs text-[#695d4d] flex items-start space-x-2">
                    <HelpCircle className="w-4 h-4 text-[#a68e56] flex-shrink-0 mt-0.5" />
                    <span>Profiles remain in a "Pending Approval" state and are hidden from searches until verified.</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Appointment Booking */}
          {activeTab === "booking" && (
            <div className="grid md:grid-cols-12 gap-0 animate-fadeIn transition-opacity duration-300">
              
              {/* Image & Main Info Column */}
              <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-[#f3d999]/30 rounded-xl">
                      <Calendar className="w-8 h-8 text-[#a68e56]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#a68e56] uppercase tracking-wider">Step 2</span>
                      <h2 className="text-3xl font-bold">Booking Your Consultation</h2>
                    </div>
                  </div>
                  
                  <p className="text-[#695d4d] leading-relaxed mb-8 text-base">
                    Clients can seamlessly search for matching counsel, check active schedule slots, and reserve digital consultation spaces instantly.
                  </p>

                  <h3 className="text-lg font-bold mb-4 border-b pb-2 border-gray-100 flex items-center space-x-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#a68e56]"></span>
                    <span>Step-by-Step Scheduling</span>
                  </h3>
                  
                  <ul className="space-y-6 text-sm text-[#4b4030] mr-4">
                    <li className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4b4030] text-[#f3d999] flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <strong className="block text-base mb-0.5">Explore the Lawyer Directory</strong>
                        <span className="text-[#695d4d]">Browse profiles, view individual ratings, consultation fees, and filter by specialization areas.</span>
                      </div>
                    </li>

                    <li className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4b4030] text-[#f3d999] flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <strong className="block text-base mb-0.5">Select a Free Slot</strong>
                        <span className="text-[#695d4d]">Open the lawyer's customized virtual calendar to see real-time schedules and select your desired date and time slot.</span>
                      </div>
                    </li>

                    <li className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4b4030] text-[#f3d999] flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <strong className="block text-base mb-0.5">Confirm via Checkout</strong>
                        <span className="text-[#695d4d]">Complete the integrated Stripe checkout form. Once the payment is verified, your booking is confirmed, notifying both parties.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAction("/browselawyers")}
                    className="flex items-center justify-center space-x-2 bg-[#a68e56] text-black font-bold px-8 py-3.5 rounded-xl hover:bg-[#e0d4aa] transition-colors shadow-lg active:scale-95"
                  >
                    <span>Browse Directory</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction("/appointments")}
                    className="flex items-center justify-center space-x-2 border border-[#4b4030]/30 font-semibold px-8 py-3.5 rounded-xl hover:bg-black/5 transition-colors"
                  >
                    <span>View Scheduled Encounters</span>
                  </button>
                </div>
              </div>

              {/* Sidebar Help / Alert Column */}
              <div className="md:col-span-5 bg-[#4b4030]/5 border-t md:border-t-0 md:border-l border-[#4b4030]/10 p-8 md:p-12 flex flex-col justify-center">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-[#a68e56]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#f3d999]/10 rounded-full -mr-8 -mt-8"></div>
                  
                  <div className="flex items-center space-x-2.5 mb-4 text-[#a68e56]">
                    <ShieldCheck className="w-6 h-6" />
                    <h4 className="font-bold text-lg">Secure Transactions</h4>
                  </div>
                  
                  <p className="text-sm text-[#695d4d] leading-relaxed mb-4">
                    All consultation payments are processed safely through our secure Stripe-enabled payment gateway.
                  </p>
                  
                  <div className="space-y-3 mt-4 text-xs text-[#4b4030]">
                    <div className="flex items-center space-x-2">
                       <Lock className="w-4 h-4 text-green-600 flex-shrink-0" />
                       <span>PCI-compliant credit card processing.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <Lock className="w-4 h-4 text-green-600 flex-shrink-0" />
                       <span>Encrypted token transfers securely stored.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <Lock className="w-4 h-4 text-green-600 flex-shrink-0" />
                       <span>Automatic transaction invoice updates emailed.</span>
                    </div>
                  </div>

                  <div className="mt-6 bg-[#f3d999]/20 p-4 rounded-xl border border-[#f3d999] text-xs text-[#695d4d] flex items-start space-x-2">
                    <FileText className="w-4 h-4 text-[#a68e56] flex-shrink-0 mt-0.5" />
                    <span>Need to cancel? You can manage appointments and contact your assigned lawyer directly through the portal page.</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 3: Video Consultation */}
          {activeTab === "consultation" && (
            <div className="grid md:grid-cols-12 gap-0 animate-fadeIn transition-opacity duration-300">
              
              {/* Image & Main Info Column */}
              <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-[#f3d999]/30 rounded-xl">
                      <Video className="w-8 h-8 text-[#a68e56]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#a68e56] uppercase tracking-wider">Step 3</span>
                      <h2 className="text-3xl font-bold">Virtual Legal Consulting</h2>
                    </div>
                  </div>
                  
                  <p className="text-[#695d4d] leading-relaxed mb-8 text-base">
                    No third-party app installations or integrations are needed. Join secure video calling matches right inside your browser with a click.
                  </p>

                  <h3 className="text-lg font-bold mb-4 border-b pb-2 border-gray-100 flex items-center space-x-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#a68e56]"></span>
                    <span>How to Join the Meeting</span>
                  </h3>
                  
                  <ul className="space-y-6 text-sm text-[#4b4030] mr-4">
                    <li className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4b4030] text-[#f3d999] flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <strong className="block text-base mb-0.5">Real-time Notification Alerts</strong>
                        <span className="text-[#695d4d]">Receive live status updates on your client/lawyer dashboard via SSE (Server-Sent Events) notifications when it's time to meet.</span>
                      </div>
                    </li>

                    <li className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4b4030] text-[#f3d999] flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <strong className="block text-base mb-0.5">Access Dashboard & Join Room</strong>
                        <span className="text-[#695d4d]">Launch the custom video panel from the dashboard or through your notifications page to step into the digital legal consult chamber directly.</span>
                      </div>
                    </li>

                    <li className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4b4030] text-[#f3d999] flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <strong className="block text-base mb-0.5">Participate in High-Definition Video</strong>
                        <span className="text-[#695d4d]">Conduct private face-to-face consultations with shared cameras, interactive controls, and standard chat channels.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAction("/video")}
                    className="flex items-center justify-center space-x-2 bg-[#a68e56] text-black font-bold px-8 py-3.5 rounded-xl hover:bg-[#e0d4aa] transition-colors shadow-lg active:scale-95"
                  >
                    <span>Go to Video Room</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction("/feedback")}
                    className="flex items-center justify-center space-x-2 border border-[#4b4030]/30 font-semibold px-8 py-3.5 rounded-xl hover:bg-black/5 transition-colors"
                  >
                    <span>Give Video Feedback</span>
                  </button>
                </div>
              </div>

              {/* Sidebar Help / Alert Column */}
              <div className="md:col-span-5 bg-[#4b4030]/5 border-t md:border-t-0 md:border-l border-[#4b4030]/10 p-8 md:p-12 flex flex-col justify-center">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-[#a68e56]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#f3d999]/10 rounded-full -mr-8 -mt-8"></div>
                  
                  <div className="flex items-center space-x-2.5 mb-4 text-[#a68e56]">
                    <Lock className="w-6 h-6" />
                    <h4 className="font-bold text-lg">Confidential Consultation</h4>
                  </div>
                  
                  <p className="text-sm text-[#695d4d] leading-relaxed mb-4">
                    We prioritize security. Your meetings are protected by browser socket-level connection validations.
                  </p>
                  
                  <div className="space-y-3 mt-4 text-xs text-[#4b4030]">
                    <div className="flex items-center space-x-2">
                       <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                       <span>Private encrypted stream connections.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                       <span>No meeting video/audio feeds are recorded or stored.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                       <span>Only authorized booking parties can unlock access.</span>
                    </div>
                  </div>

                  <div className="mt-6 bg-[#f3d999]/20 p-4 rounded-xl border border-[#f3d999] text-xs text-[#695d4d] flex items-start space-x-2">
                    <Video className="w-4 h-4 text-[#a68e56] flex-shrink-0 mt-0.5" />
                    <span>Please ensure camera and mic permissions are enabled in your browser settings to avoid issues.</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
