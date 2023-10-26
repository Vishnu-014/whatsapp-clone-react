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
import {
  ArrowLeft,
  Bell,
  Link,
  LogOut,
  Menu,
  Pencil,
  Search,
  Sun,
  ThumbsDown,
  UserPlus,
  X,
} from 'lucide-react';
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
const GroupInfoSheet = () => {
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const { theme, setTheme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger className="text-sm w-full py-1.5 text-left rounded-sm pl-2 mr-5 hover:bg-white dark:hover:bg-[#111B21] text-neutral-900 dark:text-neutral-300">
        Group info
      </SheetTrigger>
      <SheetContent
        className="w-[257px] md:w-[500px] lg:w-[358px] bg-[#111B21] border-r-0 m-0 p-0"
        side="right"
      >
        <SheetHeader>
          <SheetTitle className="text-neutral-300 bg-[#202C33] h-16 pt-3 pl-3 text-lg font-normal">
            Group info
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="w-full h-[700px] bg-[#0C1316]">
          <div className="flex flex-col items-center justify-center bg-[#111B21]">
            <div className="my-5 space-y-1">
              <Avatar className="w-44 h-44">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="flex flex-row items-center justify-center gap-x-1">
                <h1 className="text-neutral-300 text-center text-lg font-medium">
                  Group Name
                </h1>
                <Pencil
                  className="w-5 h-5"
                  fill="rgb(212 212 212)"
                  stroke="#111B21"
                />
              </div>
              <h1 className="text-sm text-neutral-400 text-center">
                Group • 1 participant
              </h1>
            </div>
          </div>

          <div className="bg-[#111B21] mt-3 pb-5">
            <div className="flex flex-row items-center justify-between mx-5 pt-4">
              <p className="text-sm text-emerald-500">Add group descriptior</p>
              <Pencil
                className="w-5 h-5"
                fill="rgb(212 212 212)"
                stroke="#111B21"
              />
            </div>
            <div className="flex flex-row items-center justify-between mx-5 pt-1">
              <p className="text-xs text-neutral-500">
                Group created by you, on 27/04/2021 at 8:08 am
              </p>
            </div>
          </div>

          <div className="bg-[#111B21] mt-3 pb-1">
            <div className="flex flex-row items-center justify-between mx-5 pt-4">
              <p className="text-sm text-neutral-500">1 participant</p>
              <Search className="w-4 h-4" />
            </div>

            <div className="flex flex-col items-center justify-between">
              <div className="flex flex-row items-center space-x-3 w-full mt-2 h-16 hover:bg-[#202C33]">
                <div className="mx-5 flex flex-row items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                    <UserPlus className="h-6 w-6" />
                  </div>
                  <p className="text-md">Add participant</p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-3 w-full mt-2 h-16 hover:bg-[#202C33]">
                <div className="mx-5 flex flex-row items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Link className="h-6 w-6" />
                  </div>
                  <p className="text-md">Invite to group via link</p>
                </div>
              </div>
              {/* PARTICIPANTS */}
            </div>
          </div>

          <div className="bg-[#111B21] mt-3 pb-1">
            <div className="flex flex-col items-center justify-between">
              <div className="flex flex-row items-center space-x-3 w-full mt-0 h-16 hover:bg-[#202C33]">
                <div className="mx-5 flex flex-row items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-transparent flex items-center justify-center">
                    <LogOut className="h-6 w-6 text-red-500" />
                  </div>
                  <p className="text-md text-red-500">Exit group</p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-3 w-full mt-0 h-16 hover:bg-[#202C33]">
                <div className="mx-5 flex flex-row items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-transparent flex items-center justify-center">
                    <ThumbsDown className="h-6 w-6 text-red-500" />
                  </div>
                  <p className="text-md text-red-500">Report group</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default GroupInfoSheet;
