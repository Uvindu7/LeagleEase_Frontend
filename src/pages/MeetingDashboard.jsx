import React, { useState, useEffect } from 'react';
import VideoCall from '../Components/VideoCall';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MeetingDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('currentUserId');
        
        if (!userId) {
            setError("No meeting scheduled.");
            setLoading(false);
            return;
        }

        fetch(`http://localhost/backend/api/get-user-appointments.php?user_id=${userId}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setAppointments(data.appointments);
                }
            })
            .catch(error => {
                console.error("Failed to fetch appointments:", error);
                setError("Could not load appointments.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleJoinMeeting = (appointmentId) => {
        const userId = localStorage.getItem('currentUserId');
        
        if (!userId) {
            setError("No meeting scheduled.");
            return;
        }

        fetch(`http://localhost/backend/api/get-meeting-details.php?appointment_id=${appointmentId}&user_id=${userId}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setSelectedMeeting(data);
                }
            })
            .catch(error => {
                console.error("Failed to fetch meeting details:", error);
                setError("Could not join the meeting.");
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">Loading your meetings...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-xl font-semibold text-red-500 text-center">{error}</div>
            </div>
        );
    }

    if (selectedMeeting) {
        return (
            <VideoCall 
                roomName={selectedMeeting.roomName} 
                displayName={selectedMeeting.yourName} 
            />
        );
    }

    return (
      <div>
        <Navbar/>
        <div className="min-h-screen bg-gray-100 py-10 mt-10">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Scheduled Meetings</h2>
                {appointments.length > 0 ? (
                    <ul className="space-y-4">
                        {appointments.map(app => (
                            <li 
                                key={app.appointment_id} 
                                className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
                            >
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-700">Meeting with {app.otherPartyName}</h3>
                                    <p className="text-gray-500 mt-1">{app.appointment_date}</p>
                                </div>
                                <button
                                    onClick={() => handleJoinMeeting(app.appointment_id)}
                                    className="bg-[#897547] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#c5a473] transition duration-300 ease-in-out"
                                >
                                    Join Meeting
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600 text-lg mt-8">You have no scheduled meetings.</p>
                )}
            </div>
        </div>
        <Footer/>
    </div>
    );
};

export default MeetingDashboard;