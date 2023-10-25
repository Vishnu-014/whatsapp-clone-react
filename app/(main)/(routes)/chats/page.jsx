'use client';

import React, { useEffect, useState } from 'react';
import ChatsSidebar from '../../_components/chats-sidebar';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useChatView } from '@/hooks/useChatView';
import Image from 'next/image';
import { Lock } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useGroupChatView } from '@/hooks/useGroupChatView';
import ChatsMessage from '../../_components/chats-message';
import ChatsGroupMessage from '../../_components/chats-group-message';
import { useChatTypeView } from '@/hooks/useChatTypeView';

const ChatsPage = () => {
  // const selectedChatId = useChatView((state) => state.userId);
  // const selectedGroupChatId = useGroupChatView((state) => state.groupId);

  const selectedChatTypeId = useChatTypeView((state) => state.id);
  const selectedChatType = useChatTypeView((state) => state.type);
  const { theme } = useTheme();

  // console.log('====================================');
  // console.log(selectedChatTypeId);
  // console.log(selectedChatType);
  // console.log(selectedChatId);
  // console.log(selectedGroupChatId);
  // console.log('====================================');



  // useEffect(() => {
  //   if (selectedChatId) {
  //     setSelectedUser(selectedChatId);
  //     setSelectedGroup('');
  //     setGroupChatId(null);
  //   }
  //   if (selectedGroupChatId) {
  //     setSelectedGroup(selectedGroupChatId);
  //     setSelectedUser('');
  //     setChatUserId(null);
  //   }
  // }, [selectedChatId, selectedGroupChatId, setChatUserId, setGroupChatId]);

  // console.log('====================================');
  // console.log(selectedChatId);
  // console.log(selectedGroupChatId);
  // console.log('selectedU', selectedUser);
  // console.log('selectedG', selectedGroup);
  // console.log('====================================');

  return (
    <div className="h-full w-full bg-[#222E35] grid grid-cols-12">
      <div className="h-full bg-[#FFF] dark:bg-[#111B21] lg:col-span-3 md:col-span-6 col-span-6 border-r-[1px] border-gray-300 dark:border-gray-600">
        <ChatsSidebar />
      </div>

      <div className="h-full bg-[#F1F2F7] dark:bg-[#222E35] lg:col-span-9 md:col-span-6 col-span-6">
        {!selectedChatTypeId && (
          <div className="h-full flex flex-col items-center justify-center relative">
            {theme === 'dark' ? (
              <Image
                src="/whatsapplogo.svg"
                alt="chatimg"
                width="300"
                height="300"
                priority
                className="animate-pulse transition"
              />
            ) : (
              <Image
                src="/whatsapplogo.svg"
                alt="chatimg"
                width="300"
                height="300"
                priority
                className="animate-pulse transition"
              />
            )}
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl text-neutral-700 dark:text-neutral-200">
                WhatsApp Web
              </h1>
              <p className="text-xs text-neutral-800 dark:text-neutral-300 mt-4">
                Send and receive messages without keeping your phone online.
              </p>
              <p className="text-xs text-neutral-800 dark:text-neutral-300">
                Use WhatsApp on up to 4 linked devices and 1 phone at the same
                time.
              </p>
            </div>
            <div className="absolute bottom-5 flex flex-row items-center text-neutral-800 dark:text-neutral-300 text-xs">
              <Lock className="h-3 w-3 mr-1 text-neutral-800 dark:text-neutral-300" />
              Your personal message are end-end encrypted
            </div>
          </div>
        )}
        {selectedChatTypeId && selectedChatType === 'USER' && <ChatsMessage />}
        {selectedChatTypeId && selectedChatType === 'GROUP' && (
          <ChatsGroupMessage />
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
