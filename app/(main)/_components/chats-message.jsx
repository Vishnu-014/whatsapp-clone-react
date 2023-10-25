import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { api } from '@/convex/_generated/api';
import { useChatView } from '@/hooks/useChatView';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { Mic, MoreVertical, Plus, Search, Send, Smile } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

//#0B141A
//#0F1919
// ip #2A3942
//#8696A1 #8696A1

const ChatsMessage = () => {
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState('');
  const divUnderMessages = useRef();

  const currentChatId = useChatView((state) => state.userId);

  const phonenum = user?.phoneNumbers[0]?.phoneNumber?.replace('+91', '');

  const getAllUsers = useQuery(api.userRegister.getAllUsers);
  let chatUsers = getAllUsers?.filter((user) => user.phoneNumber !== phonenum);

  let otheruser = chatUsers?.find((user) => user.userId === currentChatId);
  let currentuser = useQuery(api.userRegister.getUser, {
    phoneNumber: phonenum,
  });
  currentuser = currentuser[0];

  const sendmessage = useMutation(api.directMessage.sendMessage);

  const handleSendMessage = () => {
    if (newMessage === '') return;

    sendmessage({
      text: newMessage,
      sender: currentuser?._id,
      receiver: otheruser?._id,
      timestamp: Date.now().toString(),
      isRead: false,
      messageType: 'TEXT',
    });

    setNewMessage('');
  };

  const all_messages = useQuery(api.directMessage.getMessages, {
    sender: currentuser._id,
    receiver: otheruser._id,
  });

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [all_messages]);

  //console.log(all_messages);

  //console.log('====================================');
   //console.log(newMessage);
   //console.log(otheruser);
   //console.log(currentuser);
  //console.log('====================================');

  return (
    <div className="h-full w-full relative flex flex-col">
      <div className="flex absolute top-0 left-0 right-0  h-14 bg-[#F0F2F6] dark:bg-[#202C33]">
        <div className="w-full flex flex-row items-center justify-between mx-3">
          <div className="flex flex-row space-x-3">
            <Avatar>
              <AvatarImage src={otheruser?.profilePicture} />
            </Avatar>
            <div>
              <h1 className="text-neutral-800 dark:text-white font-medium text-base">
                {otheruser?.username}
              </h1>
              <h1 className="text-neutral-400 font-medium text-xs">Online</h1>
            </div>
          </div>
          <div className="flex flex-row gap-x-5">
            <Search className="w-5 h-5 text-neutral-600 dark:text-[#AEBAC1]" />
            <MoreVertical className="w-5 h-5 text-neutral-600 dark:text-[#AEBAC1]" />
          </div>
        </div>
      </div>

      {/* Direct Chats */}
      <ScrollArea className="flex mt-16 h-[638px] bg-[#EFEBE2] dark:bg-[#0B141A] text-white">
        <div className="flex flex-col mb-5">
          {all_messages &&
            all_messages.map((message) => {
              return (
                <div
                  key={message._id}
                  className={`${
                    message.sender === currentuser._id
                      ? 'text-right'
                      : 'text-left'
                  }`}
                >
                  <div
                    className={`${
                      message.sender === currentuser._id
                        ? 'bg-[#D9FBD3] dark:bg-[#255C4C] text-neutral-800 dark:text-neutral-200'
                        : 'bg-white dark:bg-[#202C33] text-neutral-800 dark:text-neutral-200'
                    }
              ${
                message.sender === currentuser._id
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

export default ChatsMessage;
