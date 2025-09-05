import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import LawyerDashboard from "./pages/LawyerDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Homepage from "./pages/Homepage"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseLawyers from "./pages/BrowseLawyers";
import AppointmentBooking from "./pages/AppointmentBooking";
import LawyerProfilePage from "./pages/LawyerProfile";
import PaymentPage from "./pages/PaymentPage";
import Start from "./pages/Start";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Lawyer Dashboard */}
        <Route path="/lawyer" element={<LawyerDashboard />} />

        {/* Client Dashboard */}
        <Route path="/client" element={<ClientDashboard />} />

        {/* Home */}
        <Route path="/home" element={<Homepage />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Browse Lawyers */}
        <Route path="/browselawyers" element={<BrowseLawyers />} />

        {/* Appointment Booking */}
        <Route path="/bookappointment" element={<AppointmentBooking />} />

        {/* Lawyer Profile */}
        <Route path="/lawyerprofile" element={<LawyerProfilePage />} />

        {/* Payment Page */}
        <Route path="/paymentpage" element={<PaymentPage />} />

        {/* Start (Landing Page) */}
        <Route path="/" element={<Start />} />
      </Routes>
    </Router>
  );
}

export default App;

