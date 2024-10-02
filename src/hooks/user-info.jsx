"'use client'"

import { useState } from "react"
import { Edit, MoreVertical, Video, LogOut } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

// Mock implementation of useUserStore
const useUserStore = () => {
  return {
    currentUser: {
      avatar: "https://i.pravatar.cc/150?img=3",
      username: "John Doe",
    },
    logout: () => {
      console.log("User logged out")
      // Implement actual logout logic here
    },
  };
}

const UserInfo = () => {
  const { currentUser, logout } = useUserStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    (<div className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img
          src={currentUser.avatar}
          alt="Avatar"
          className="w-[50px] h-[50px] rounded-full object-cover" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="flex gap-5 *:cursor-pointer hover:*:text-lightGrey">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="p-0 hover:bg-transparent focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <MoreVertical size={24} />
              <span className="sr-only">More options</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0">
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </PopoverContent>
        </Popover>
        <Video size={24} />
        <Edit size={20} />
      </div>
    </div>)
  );
}

export default UserInfo