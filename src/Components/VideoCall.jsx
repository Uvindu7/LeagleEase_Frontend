import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCall = ({ roomName, displayName, onLeave }) => {
    const jitsiContainer = useRef(null);
    const [api, setApi] = useState(null);
    const navigate = useNavigate(); // Initialize the hook

    useEffect(() => {
        if (!jitsiContainer.current || !roomName) return;

        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;
        
        script.onload = () => {
            const domain = 'meet.jit.si';
            const options = {
                roomName,
                parentNode: jitsiContainer.current,
                userInfo: {
                    displayName,
                },
                configOverwrite: {
                    startWithAudioMuted: true,
                },
                interfaceConfigOverwrite: {
                    TOOLBAR_BUTTONS: [
                        'microphone', 'camera', 'closedcaptions', 'fullscreen', 'fodeviceselection',
                        'hangup', 'profile', 'chat', 'raisehand', 'tileview', 'shortcuts',
                        'videobackgrounds', 'settings'
                    ],
                },
            };

            const newApi = new window.JitsiMeetExternalAPI(domain, options);
            setApi(newApi);
        };

        document.body.appendChild(script);

        return () => {
            if (api) {
                api.dispose();
            }
            document.body.removeChild(script);
        };
    }, [roomName, displayName, api]);

    const handleLeave = () => {
        if (api) {
            api.dispose();
        }
        // Redirect to the MeetingDashboard page
        navigate('/video'); 
    };

    return (
        <div className="fixed inset-0 z-50">
            {/* Leave button */}
            <div className="absolute top-4 right-4 z-50">
                <button
                    onClick={handleLeave}
                    className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
                >
                    Leave Meeting
                </button>
            </div>

            {/* Jitsi container */}
            <div ref={jitsiContainer} className="w-full h-full" />
        </div>
    );
};

export default VideoCall;