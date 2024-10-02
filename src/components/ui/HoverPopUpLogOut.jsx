"use client";

import { useState } from "react";
import { Ellipsis, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase/firebase";

const HoverPopUpLogOut = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    auth.signOut();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="p-0 hover:bg-transparent"
        >
          <Ellipsis size={24} />
          <span className="sr-only">More options</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0 bg-darkBlue border-none">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-[rgba(17,25,40,0.75)]"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default HoverPopUpLogOut;
