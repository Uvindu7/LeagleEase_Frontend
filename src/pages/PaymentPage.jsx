// PaymentPage.jsx

import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import backgroundImg from '../assets/background.webp'; 

export default function PaymentPage() {
  const appointment = {
    lawyer: 'Adv. Asha Mehra',
    specialization: 'Criminal Law',
    date: '2025-07-21',
    slot: '14:00',
    baseFee: 1500,
    commission: 150,
  };

  const total = appointment.baseFee + appointment.commission;

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <main className="flex-1 px-4 py-6 pt-20 flex items-center justify-center">
        <div
          className="w-full max-w-lg rounded-lg shadow p-8 flex flex-col gap-8 relative border border-[#ebe6dd] bg-white/20 backdrop-blur-md"
        >
          {/* Appointment Summary */}
          <section>
            <h2 className="text-xl font-bold mb-2 text-[#6e4e13]">Appointment Summary</h2>
            <div className="border rounded p-3 bg-[#fbf8ee]">
              <p>
                <strong>Lawyer:</strong> {appointment.lawyer}
              </p>
              <p>
                <strong>Specialization:</strong> {appointment.specialization}
              </p>
              <p>
                <strong>Date:</strong> {appointment.date}
              </p>
              <p>
                <strong>Time:</strong> {appointment.slot}
              </p>
            </div>
          </section>

          {/* Fee Breakdown */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-[#6e4e13]">Fee Breakdown</h3>
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <td className="py-1">Consultation Fee</td>
                  <td className="py-1 text-right">Rs. {appointment.baseFee}</td>
                </tr>
                <tr>
                  <td className="py-1">Platform Commission</td>
                  <td className="py-1 text-right">Rs. {appointment.commission}</td>
                </tr>
                <tr className="font-bold border-t border-gray-300">
                  <td className="py-2">Total</td>
                  <td className="py-2 text-right">Rs. {total}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Payment Method */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-[#6e4e13]">Payment Method</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block font-medium mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/20"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="expiry" className="block font-medium mb-1">
                    Expiry
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/20"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="cvc" className="block font-medium mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/20"
                    placeholder="CVC"
                  />
                </div>
              </div>
            </form>
          </section>

          <button
            className="w-full py-2 bg-gradient-to-tr from-[#6e4e13] to-[#a2711d] text-white font-semibold rounded hover:from-[#a2711d] hover:to-[#6e4e13] transition"
          >
            Confirm Payment
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}