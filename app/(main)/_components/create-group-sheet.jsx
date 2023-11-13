import React, { useEffect, useRef, useState } from 'react';
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
  Check,
  Menu,
  Search,
  Sun,
  User,
  X,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from 'next-themes';
import { MultiSelect } from 'react-multi-select-component';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';

// #111B21
// #202C33

const CreateGroup = () => {
  const { user } = useUser();
  const [selected, setSelected] = useState([]);
  const [groupName, setGroupName] = useState('');

  const phonenum = user?.phoneNumbers[0]?.phoneNumber?.replace('+91', '');
  let currentuser = useQuery(api.userRegister.getUser, {
    phoneNumber: phonenum,
  });
  currentuser = currentuser[0];

  const getAllUsers = useQuery(api.userRegister.getAllUsers);
  let options = [];

  const createGroup = useMutation(api.groupMessage.createGroup);
  //console.log(selected);

  getAllUsers?.map((user) => {
    options.push({
      label: user.username,
      value: user._id,
    });
  });

  options = options.filter((user) => user.value !== currentuser._id);
  //console.log(options);

  const handleCreateGroup = () => {
    if (groupName === '') return;
    let userIds = [];
    selected.map((user) => {
      userIds.push(user.value);
    });
    //console.log(userIds);
    //console.log(currentuser._id);

    createGroup({
      name: groupName,
      members: userIds,
      admin: currentuser._id,
    });
    setGroupName('');
  };

  return (
    <Sheet>
      <SheetTrigger className="text-sm w-full py-1.5 text-left rounded-sm pl-2 mr-5 hover:bg-white dark:hover:bg-[#111B21] text-neutral-900 dark:text-neutral-300">
        New Group
      </SheetTrigger>
      <SheetContent
        className="w-[257px] md:w-[500px] lg:w-[358px] bg-[#FFF] dark:bg-[#111B21] border-r-0 m-0 p-0"
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="text-neutral-800 dark:text-neutral-200 bg-[#F0F2F6] dark:bg-[#202C33] h-28 pt-16 pl-3 text-xl font-normal">
            New Group
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="w-full h-full">
          <div className="mx-2 mt-2 flex flex-col space-y-5">
            {getAllUsers && (
              <div>
                <h1 className="mb-2 font-medium text-neutral-700 dark:text-neutral-200">
                  Add Participants
                </h1>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Add Participants"
                  className="text-black cursor-pointer"
                />
              </div>
            )}

            <div className="flex flex-col items-center justify-center pt-10">
            <Avatar className="h-32 w-32 hover:opacity-50">
              <AvatarImage src={''} />
              <AvatarFallback className="bg-white dark:bg-gray-400">
                <User className="h-16 w-16 text-gray-300" />
              </AvatarFallback>
            </Avatar>
            </div>

            <div className="flex flex-col gap-y-3 pt-4">
              <input
                type="text"
                placeholder="Group Name"
                className="bg-transparent outline-none border-b-2 border-neutral-400 focus:border-emerald-600 transition py-1"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center">
              <button className="bg-[#4AA985] hover:opacity-90 rounded-full w-10 h-10 flex items-center justify-center">
                <Check onClick={() => handleCreateGroup()} />
              </button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CreateGroup;
