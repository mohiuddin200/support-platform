import React from "react";
import WidgetHeader from "../components/widget-header";
import { useAtomValue, useSetAtom } from "jotai";
import { contactSessionIdAtomFamily, organizationIdAtom, screenAtom } from "../../atoms/widget-atoms";
import { Button } from "@workspace/ui/components/button";

const WidgetSelectionScreen: React.FC = () => {
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "org_123456")
  );
  const setScreen = useSetAtom(screenAtom);

  const handleChatSelection = () => {
    setScreen("chat");
  };

  const handleVoiceSelection = () => {
    setScreen("voice");
  };

  return (
    <div className="flex flex-col h-full">
      <WidgetHeader>
        <div className="flex flex-col gap-y-1 px-4 py-6 border-b">
          <p className="font-extrabold text-3xl text-gray-900">
            How can we help? 🎯
          </p>
          <p className="text-md text-gray-600">Choose your preferred way to connect.</p>
        </div>
      </WidgetHeader>
      
      <div className="flex flex-col p-6 gap-6 flex-1">
        <Button 
          onClick={handleChatSelection}
          className="flex items-center gap-3 py-6 justify-center bg-blue-600 hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Start Chat
        </Button>
        
        <Button 
          onClick={handleVoiceSelection}
          variant="outline"
          className="flex items-center gap-3 py-6 justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Voice Call
        </Button>
        
        <Button 
          variant="ghost"
          onClick={() => setScreen("contact")}
          className="flex items-center gap-3 py-6 justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          Contact Form
        </Button>
      </div>
    </div>
  );
};

export default WidgetSelectionScreen;