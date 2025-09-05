import React, { useState } from "react"; 
export default function ResetPassword() { 
  const [email, setEmail] = useState(""); 
  const [otp, setOtp] = useState(""); 
  const [step, setStep] = useState(1); // 1 = email step, 2 = OTP step 
  const [message, setMessage] = useState(""); 

  // Step 1: Send OTP 
  const handleSendOtp = async (e) => { 
    e.preventDefault(); 
    try { 
      const formData = new FormData(); 
      formData.append("email", email); 
      
      const response = await fetch("http://localhost/backend/api/reset_password.php", { 
        method: "POST", 
        body: formData, 
      });

      const data = await response.json(); 
      
      if (data.success) { 
        setStep(2); 
        setMessage("✅ OTP sent to your email!"); 
      } else { 
        setMessage(data.error || "❌ Error sending OTP.");
       }
      } catch (err) { 
        setMessage("⚠️ Server error. Try again later."); 
      } 
    }; 
    
    // Step 2: Verify OTP 
    const handleVerifyOtp = async (e) => { 
      e.preventDefault(); 
      try { 
        const formData = new FormData(); 
        formData.append("email", email); 
        formData.append("otp", otp); 
        
        const response = await fetch("http://localhost/backend/api/verify_otp.php", { 
          method: "POST", 
          body: formData, 
        }); 
        
        const data = await response.json(); 
        
        if (data.success) { 
            window.location.href = `/changepassword?email=${email}`; 
        } else { 
          setMessage(data.error || "❌ Invalid OTP."); 
        } 
      } catch (err) { 
        setMessage("⚠️ Server error. Try again later."); 
      } 
    }; 
    
    // Resend OTP 
    const handleResendOtp = async () => { 
      try { 
        const formData = new FormData(); 
        formData.append("email", email); 
        
        const response = await fetch("http://localhost/backend/api/reset_password.php", { 
          method: "POST", 
          body: formData, 
        }); 
        
        const data = await response.json(); 
        
        if (data.success) { 
          setMessage("🔄 New OTP has been sent to your email!"); 
        } else { 
          setMessage(data.error || "❌ Failed to resend OTP."); 
        } 
      } catch (err) { 
        setMessage("⚠️ Server error. Try again later."); 
      } 
    }; 
    
    return ( 
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"> 
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800"> 
        Reset Password 
      </h2> 
      
      {step === 1 && ( 
        <form onSubmit={handleSendOtp} className="space-y-4"> 
        <div> 
          <label className="block text-sm font-medium text-gray-600"> 
            Enter your Email 
          </label> 
          <input 
          type="email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          placeholder="your@email.com" 
          /> 
          </div> 
          <button 
          type="submit" 
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition" 
          > 
          Send OTP 
          </button> 
          </form> 
          )} 
          
          {step === 2 && ( 
            <form onSubmit={handleVerifyOtp} className="space-y-4"> 
            <p className="text-green-600 text-center">{message}</p> 
            <div> 
              <label className="block text-sm font-medium text-gray-600"> 
                Enter OTP 
              </label> 
              <input 
              type="text" 
              required 
              maxLength="6" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="6-digit OTP" 
              /> 
              </div> 
              <button 
              type="submit" 
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition" 
              >
               Verify OTP 
              </button> 
              
              <p 
              onClick={handleResendOtp} 
              className="mt-3 text-sm text-blue-600 cursor-pointer text-center hover:underline" 
              >
                Didn’t receive OTP? Resend 
              </p> 
              </form> 
              )} 
              
              {message && <p className="mt-4 text-center text-red-500">{message}
                </p>} 
                </div> 
                </div> 
                );
              }
