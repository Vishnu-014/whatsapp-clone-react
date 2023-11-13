'use client';

import { SignOutButton, UserButton, useUser } from '@clerk/clerk-react';
import {
  ArchiveRestore,
  ArrowLeft,
  CircleDotDashed,
  Cross,
  Menu,
  MessageCircle,
  MessageSquare,
  MessageSquarePlus,
  MoreVertical,
  Search,
  User,
  User2,
  Users,
  X,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect, useRef, Fragment } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import SearchInput from './search-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useChatView } from '@/hooks/useChatView';
import { useGroupChatView } from '@/hooks/useGroupChatView';
import { useChatTypeView } from '@/hooks/useChatTypeView';
import { useRouter } from 'next/navigation';
import SettingsSheet from './settings-sheet';
import CreateGroup from './create-group-sheet';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


const ChatsSidebar = () => {
  const { user } = useUser();
  const router = useRouter();

  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const phonenum = user?.phoneNumbers[0]?.phoneNumber?.replace('+91', '');

  let currentUser = useQuery(api.userRegister.getUser, {
    phoneNumber: phonenum,
  });
  currentUser = currentUser?.[0];

  const getAllUsers = useQuery(api.userRegister.getAllUsers);
  const getAllGroups = useQuery(api.groupMessage.getAllGroups, {
    currentuser: currentUser?._id,
  });

  // User Click ID
  const selectedChatId = useChatView((state) => state.userId);
  const setChatUserId = useChatView((state) => state.setUserChat);

  //Group Click ID
  const selectedGroupChatId = useGroupChatView((state) => state.groupId);
  const setGroupChatId = useGroupChatView((state) => state.setGroupUserChat);

  //Chat Type View
  const setChatTypeView = useChatTypeView((state) => state.setChatTypeId);
  const selectedChatTypeId = useChatTypeView((state) => state.id);
  const selectedChatType = useChatTypeView((state) => state.type);

  let chatGroups = [];
  let chatUsers = getAllUsers?.filter((user) => user.phoneNumber !== phonenum);

  //console.log('====================================');
  //console.log(currentUser);
  //console.log('====================================');
  let createdChatGroups = getAllGroups?.filter(
    (group) => group.admin === currentUser._id
  );
  let joinedChatGroups = getAllGroups?.filter((group) =>
    group.members.includes(currentUser._id)
  );
  if (getAllGroups) {
    chatGroups = [...createdChatGroups, ...joinedChatGroups];
  }
  // To get all groups last messages;
  const getAllGroupsLastMsgObj = useQuery(api.groupMessage.getGroupsLastMsg);
  // To get all users last messages;
  const getAllUsersLastMsgObj = useQuery(api.directMessage.getUsersLastMsg);
  

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#111B21]">
      <div className="flex flex-row items-center justify-between p-3 bg-[#F0F2F6] dark:bg-[#222E35]">
        <UserButton afterSignOutUrl="/" />
        <div className="flex flex-row items-center justify-center gap-x-5">
          <ModeToggle />
          <Users className="h-5 w-5 text-[#576872] dark:text-[#AEBAC1]" />
          <CircleDotDashed className="h-5 w-5 text-[#576872] dark:text-[#AEBAC1]" />
          <MessageCircle className="h-5 w-5 text-[#576872] dark:text-[#AEBAC1]" />
          <Sheet>
            <SheetTrigger asChild>
              <MessageSquarePlus className="h-5 w-5 text-[#576872] dark:text-[#AEBAC1]" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[257px] md:w-[500px] lg:w-[358px] bg-[#222E35] border-r-0"
            >
              <SheetHeader>
                <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical className="h-5 w-5 text-[#AEBAC1] cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#F0F2F6] dark:bg-[#233138] border-0 text-[#AEBAC1] p-3">
              <DropdownMenuItem asChild>
                <>
                  <CreateGroup />
                </>
              </DropdownMenuItem>
              <DropdownMenuItem>New community</DropdownMenuItem>
              <DropdownMenuItem>Starred messages</DropdownMenuItem>
              <DropdownMenuItem>Select chats</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <>
                  <SettingsSheet />
                </>
              </DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* //?Search */}
      <div className="flex flex-row items-center justify-between mt-1.5 mx-2 gap-2">
        {/* Search Input */}
        <div className="flex flex-1 items-center px-2 rounded-md overflow-hidden bg-[#F0F2F6] dark:bg-[#202C33]">
          {isEditing ? (
            <ArrowLeft className="w-5 h-5" stroke="#708089" />
          ) : (
            <Search className="w-5 h-5" stroke="#708089" />
          )}
          <input
            type="text"
            className="bg-[#F0F2F6] dark:bg-[#202C33] flex-1 rounded-md py-1.5 placeholder:text-xs pl-2 focus:ring-0 outline-none text-white text-sm"
            placeholder="Search or start new chat"
            ref={inputRef}
            onFocus={() => setEditing(true)}
            onBlur={() => setEditing(false)}
          />
          {isEditing && <X className="w-5 h-5" stroke="#708089" />}
        </div>
        <Menu className="w-6 h-6" stroke="#708089" />
      </div>

      {/* //?Chat */}
      <ScrollArea>
        {/* Archieve */}
        <div className="flex flex-row items-center justify-between mt-5 mb-3 mx-3">
          <div className="flex flex-row items-center gap-x-10">
            <ArchiveRestore className="w-4 h-4" stroke="#49A784" />
            <p className="text-neutral-600 dark:text-white text-md">Archived</p>
          </div>
          <div>
            <p className="text-[#49A784] text-xs font-medium">70</p>
          </div>
        </div>
        <div className="border-b-[0.50px] border-gray-300 dark:border-gray-700 ml-16 mr-2" />

        {/* Chats */}
        <div className="mt-[-1px] mx-0 space-y-0">
          {chatUsers?.map((user) => {
            return (
              <div
                key={user._id}
                role="button"
                onClick={() => {
                  setChatUserId(user.userId);
                  setChatTypeView(user.userId, 'USER');
                }}
                className={cn(
                  'hover:bg-[#F5F6F6] dark:hover:bg-[#202C33]',
                  user.userId === selectedChatTypeId &&
                    selectedChatType === 'USER' &&
                    'bg-[#F0F2F6] dark:bg-[#2A3942] dark:hover:bg-[#2A3942] hover:bg-[#F0F2F6] transition'
                )}
              >
                <div className="flex flex-row items-center mb-1 relative py-1 mx-2">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={user.profilePicture}
                      alt="@shadcn"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-400">
                      <User className="h-8 w-8" fill="white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-baseline space-x-3 space-y-1">
                    <div className="flex flex-row items-center">
                      <p className="text-black dark:text-white text-sm truncate">
                        {user.username}
                      </p>
                      <p className="text-neutral-400 text-xs text-end absolute right-1">
                      {/* {getAllUsersLastMsgObj?.[user._id]?._creationTime} */}
                      {dayjs(getAllUsersLastMsgObj?.[user._id]?._creationTime).fromNow()}
                      </p>
                    </div>
                    <p className="text-neutral-400 text-xs line-clamp-1">
                      {getAllUsersLastMsgObj?.[user._id]?.text}
                    </p>
                  </div>
                </div>
                <div className="border-b-[1px] border-gray-300 dark:border-gray-700 ml-14" />
              </div>
            );
          })}
          {chatGroups?.map((group) => {
            return (
              <div
                key={group._id}
                role="button"
                onClick={() => {
                  setGroupChatId(group._id);
                  setChatTypeView(group._id, 'GROUP');
                }}
                className={cn(
                  'hover:bg-[#F5F6F6] dark:hover:bg-[#202C33]',
                  selectedChatTypeId === group._id &&
                    selectedChatType === 'GROUP' &&
                    'bg-[#F0F2F6] dark:bg-[#2A3942] dark:hover:bg-[#2A3942] hover:bg-[#F0F2F6] transition'
                )}
              >
                <div className="flex flex-row items-center mb-1 py-1 mx-2 relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={group.profilePicture}
                      alt="@shadcn"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-100 dark:bg-gray-400">
                      <User className="h-8 w-8 text-gray-300" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-baseline space-x-3 space-y-1">
                    <div className="flex flex-row items-center">
                      <p className="text-black dark:text-white text-sm truncate">
                        {group.name}
                      </p>
                      <p className="text-neutral-400 text-xs text-end absolute right-1">
                      {dayjs(getAllUsersLastMsgObj?.[user._id]?._creationTime).fromNow()}
                      </p>
                    </div>
                    <p className="text-neutral-400 text-xs line-clamp-1">
                      {getAllGroupsLastMsgObj?.[group._id]?.text}
                    </p>
                  </div>
                </div>
                <div className="border-b-[1px] border-gray-300 dark:border-gray-700 ml-14" />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatsSidebar;
