import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { api } from '@/convex/_generated/api';
import { useChatTypeView } from '@/hooks/useChatTypeView';
import { useChatView } from '@/hooks/useChatView';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import {
  Mic,
  MoreVertical,
  Plus,
  Search,
  Send,
  Smile,
  User,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
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

import GroupInfoSheet from './group-info-sheet';

//#0B141A
//#0F1919
// ip #2A3942
//#8696A1 #8696A1

const ChatsGroupMessage = () => {
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState('');
  const [groupInfo, setGroupInfo] = useState(false);
  const divUnderMessages = useRef();

  const selectedChatTypeId = useChatTypeView((state) => state.id);
  const selectedChatType = useChatTypeView((state) => state.type);

  const phonenum = user?.phoneNumbers[0]?.phoneNumber?.replace('+91', '');
  let currentuser = useQuery(api.userRegister.getUser, {
    phoneNumber: phonenum,
  });
  currentuser = currentuser?.[0];

  const getGroup = useQuery(api.groupMessage.getGroup, {
    groupId: selectedChatTypeId,
  });

  // Send Message
  const sendGroupMessage = useMutation(api.groupMessage.sendGroupMessage);

  // Receive Messages
  const getAllGroupMessages = useQuery(api.groupMessage.getAllGroupMessages, {
    groupId: selectedChatTypeId,
  });

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [getAllGroupMessages]);

  const handleSendMessage = () => {
    if (newMessage === '') return;

    sendGroupMessage({
      text: newMessage,
      sender: currentuser?._id,
      group: selectedChatTypeId,
      timestamp: Date.now().toString(),
      messageType: 'TEXT',
    });
    setNewMessage('');
  };

  // console.log('====================================');
  // console.log(selectedChatType);
  // console.log(selectedChatTypeId);
  // console.log(currentuser);
  // console.log(getGroup);
  // console.log('====================================');

  const Sidebar = () => {
    return (
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <div className="h-full w-full relative flex flex-col">
      <div
        onClick={() => <Sidebar />}
        className="flex absolute top-0 left-0 right-0  h-14 bg-[#F0F2F6] dark:bg-[#202C33]"
      >
        <div className="w-full flex flex-row items-center justify-between mx-3">
          <div className="flex flex-row space-x-3">
            <Avatar>
              <AvatarImage src={''} />
              <AvatarFallback className="bg-gray-400">
                <User className="h-8 w-8" fill="white" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-neutral-800 dark:text-white font-medium text-base">
                {getGroup?.name}
              </h1>
              <h1 className="text-neutral-400 font-medium text-xs">
                Typing...
              </h1>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-x-5">
            <Search className="w-5 h-5 text-neutral-600 dark:text-[#AEBAC1]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MoreVertical className="h-5 w-5 text-[#AEBAC1] cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#F0F2F6] dark:bg-[#233138] border-0 text-[#AEBAC1] p-3">
                <DropdownMenuItem asChild>
                  <GroupInfoSheet />
                </DropdownMenuItem>
                <DropdownMenuItem>Select messages</DropdownMenuItem>
                <DropdownMenuItem>Close chat</DropdownMenuItem>
                <DropdownMenuItem>Mute notification</DropdownMenuItem>
                <DropdownMenuItem>Disappearing messages</DropdownMenuItem>
                <DropdownMenuItem>Clear chat</DropdownMenuItem>
                <DropdownMenuItem>Exit group</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Direct Chats */}
      <ScrollArea className="flex mt-16 h-[638px] bg-[#EFEBE2] dark:bg-[#0B141A] text-white">
        <div className="flex flex-col mb-5">
          {getAllGroupMessages &&
            getAllGroupMessages.map((message) => {
              return (
                <div
                  key={message._id}
                  className={`${
                    message.sender === currentuser?._id
                      ? 'text-right'
                      : 'text-left'
                  }`}
                >
                  <div
                    className={`${
                      message.sender === currentuser?._id
                        ? 'bg-[#D9FBD3] dark:bg-[#255C4C] text-neutral-800 dark:text-neutral-200'
                        : 'bg-white dark:bg-[#202C33] text-neutral-800 dark:text-neutral-200'
                    }
              ${
                message.sender === currentuser?._id
                  ? 'rounded-tl-lg'
                  : 'rounded-tr-lg'
              }
              text-left inline-block  rounded-bl-lg rounded-br-lg px-4 py-2 m-5 -mb-1 text-sm max-w-lg`}
                  >
                    {message.text}
                  </div>
                </div>
              );
            })}
        </div>
        <div ref={divUnderMessages}></div>
      </ScrollArea>

      <div className="flex flow-row items-center px-5 absolute bottom-0 left-0 right-0 h-16 bg-[#F0F2F6] dark:bg-[#202C33] space-x-3">
        <Smile className="w-7 h-7 text-[#8696A1]" />
        <Plus className="w-7 h-7 text-[#8696A1]" />

        <input
          type="text"
          className="flex flex-1 h-12 text-neutral-800 dark:text-neutral-300 bg-white dark:bg-[#2A3942] rounded-xl pl-3  outline-none"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <Send
          onClick={() => handleSendMessage()}
          className="w-7 h-7 text-[#8696A1]"
        />
        <Mic className="w-7 h-7 text-[#8696A1]" />
      </div>
    </div>
  );
};

export default ChatsGroupMessage;
