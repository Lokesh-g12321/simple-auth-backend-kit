
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

const ProfileDetails = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => {
    setOpenItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <div className="space-y-3 px-2">
      <Collapsible 
        className="border rounded-lg overflow-hidden shadow-sm" 
        open={openItems['emergency']} 
        onOpenChange={() => toggleItem('emergency')}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 md:p-4 hover:bg-gray-50 active:bg-gray-100">
          <div className="flex items-center gap-2">
            <span className="font-medium">Emergency Contacts</span>
          </div>
          {openItems['emergency'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3 md:p-4 bg-gray-50">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">Police Emergency</h4>
              <p className="text-sm text-gray-600">100</p>
            </div>
            <div>
              <h4 className="font-medium">Ambulance Service</h4>
              <p className="text-sm text-gray-600">108</p>
            </div>
            <div>
              <h4 className="font-medium">Fire Department</h4>
              <p className="text-sm text-gray-600">101</p>
            </div>
            <div>
              <h4 className="font-medium">Women Helpline</h4>
              <p className="text-sm text-gray-600">1091</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible 
        className="border rounded-lg overflow-hidden shadow-sm" 
        open={openItems['about']} 
        onOpenChange={() => toggleItem('about')}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 md:p-4 hover:bg-gray-50 active:bg-gray-100">
          <div className="flex items-center gap-2">
            <span className="font-medium">About Us</span>
          </div>
          {openItems['about'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3 md:p-4 bg-gray-50">
          <div className="space-y-2">
            <p className="text-sm">Welcome to our civic engagement platform!</p>
            <p className="text-xs md:text-sm text-gray-600">
              We are dedicated to improving urban life by connecting citizens with their local government. Our platform enables residents to report issues, track civic developments, and participate in community initiatives.
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              Founded in 2024, we work closely with municipal authorities to ensure quick resolution of reported problems and maintain transparency in civic operations.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible 
        className="border rounded-lg overflow-hidden shadow-sm" 
        open={openItems['terms']} 
        onOpenChange={() => toggleItem('terms')}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 md:p-4 hover:bg-gray-50 active:bg-gray-100">
          <div className="flex items-center gap-2">
            <span className="font-medium">Terms & Conditions</span>
          </div>
          {openItems['terms'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3 md:p-4 bg-gray-50">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">1. Acceptance of Terms</h4>
            <p className="text-xs md:text-sm text-gray-600">
              By accessing and using this platform, you agree to be bound by these terms and conditions, all applicable laws and regulations.
            </p>
            <h4 className="font-medium text-sm">2. User Responsibilities</h4>
            <p className="text-xs md:text-sm text-gray-600">
              Users must provide accurate information when reporting issues and maintain respectful communication with all platform participants.
            </p>
            <h4 className="font-medium text-sm">3. Content Guidelines</h4>
            <p className="text-xs md:text-sm text-gray-600">
              Users are prohibited from posting false, misleading, or harmful content. All submissions must comply with local laws and regulations.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible 
        className="border rounded-lg overflow-hidden shadow-sm" 
        open={openItems['privacy']} 
        onOpenChange={() => toggleItem('privacy')}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 md:p-4 hover:bg-gray-50 active:bg-gray-100">
          <div className="flex items-center gap-2">
            <span className="font-medium">Privacy Policy</span>
          </div>
          {openItems['privacy'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3 md:p-4 bg-gray-50">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Data Collection</h4>
            <p className="text-xs md:text-sm text-gray-600">
              We collect personal information necessary for account creation and platform functionality, including name, email, and location data for complaint registration.
            </p>
            <h4 className="font-medium text-sm">Data Usage</h4>
            <p className="text-xs md:text-sm text-gray-600">
              Your information is used to process complaints, communicate updates, and improve our services. We do not sell personal data to third parties.
            </p>
            <h4 className="font-medium text-sm">Data Protection</h4>
            <p className="text-xs md:text-sm text-gray-600">
              We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ProfileDetails;
