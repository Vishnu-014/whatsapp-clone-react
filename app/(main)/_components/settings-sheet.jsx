import React, { useRef, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Bell, Menu, Search, Sun, X } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from 'next-themes';

// #111B21
// #202C33
const SettingsSheet = () => {
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const { theme, setTheme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger className="text-sm w-full py-1.5 text-left rounded-sm pl-2 mr-5 hover:bg-white dark:hover:bg-[#111B21] text-neutral-900 dark:text-neutral-300">
        Settings
      </SheetTrigger>
      <SheetContent
        className="w-[257px] md:w-[500px] lg:w-[358px] bg-[#111B21] border-r-0 m-0 p-0"
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="text-neutral-300 bg-[#202C33] h-28 pt-16 pl-3 text-xl font-normal">
            Settings
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="w-full h-full">
          <div className="flex flex-col space-y-5">
            {/* //?Search */}
            <div className="flex flex-row items-center justify-between mt-2 mx-2 gap-2">
              {/* Search Input */}
              <div className="flex flex-1 items-center px-2 rounded-md overflow-hidden bg-[#202C33]">
                {isEditing ? (
                  <ArrowLeft className="w-5 h-5" stroke="#708089" />
                ) : (
                  <Search className="w-5 h-5" stroke="#708089" />
                )}
                <input
                  type="text"
                  className="bg-[#202C33] flex-1 rounded-md py-1.5 placeholder:text-xs pl-2 focus:ring-0 outline-none text-white text-sm"
                  placeholder="Search or start new chat"
                  ref={inputRef}
                  onFocus={() => setEditing(true)}
                  onBlur={() => setEditing(false)}
                />
                {isEditing && <X className="w-5 h-5" stroke="#708089" />}
              </div>
            </div>

            <div className="flex flex-row items-center mx-5">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="flex flex-col justify-center gap-y-1 ml-3">
                <h1 className="text-white text-lg font-medium">Vishnu</h1>
                <h1 className="text-neutral-400 text-xs">Lot More To Come</h1>
              </div>
            </div>

            <div className="">
              <div className="hover:bg-[#202C33] h-14 border-b border-neutral-700 flex flex-row items-center px-5 space-x-5">
                <Bell className="text-[#708089] w-7 h-7" />
                <p className="text-neutral-200">Notifications</p>
              </div>

              {/* Theme */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="hover:bg-[#202C33] h-14 border-b border-neutral-700 flex flex-row items-center px-5 space-x-5">
                    <Sun className="text-[#708089] w-7 h-7" />
                    <p className="text-neutral-200">Theme</p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Theme</DialogTitle>
                    <RadioGroup
                      onValueChange={(val) => setTheme(val)}
                      defaultValue={theme}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2 mt-3">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system">System</Label>
                      </div>
                    </RadioGroup>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsSheet;
