'use client';

import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';

const CreateUserPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const phonenum = user?.phoneNumbers[0]?.phoneNumber?.replace('+91', '');

  let getAllUsers = useQuery(api.userRegister.getUser, {
    phoneNumber: phonenum,
  });
  const createUser = useMutation(api.userRegister.createUser);

  let regUser;
  const handleCreateUser = () => {
    if (getAllUsers?.length >= 1) {
      router.push('/chats');
    } else {
      regUser = createUser({
        userId: user?.id,
        username: user?.fullName,
        phoneNumber: phonenum,
        profilePicture: user?.imageUrl,
        lastSeen: new Date().toLocaleTimeString(),
      });
      router.push('/chats');
    }
  };

  return (
    <div className="bg-[#111B21] h-full flex flex-col items-center justify-center">
      <div className="max-w-3xl space-y-3">
        <div className="flex flex-col gap-2">
          <label className="text-white">Username</label>
          <input
            disabled
            type="text"
            className="bg-white text-black outline-none rounded-md px-2 py-2.5 w-72 cursor-not-allowed"
            placeholder="username"
            value={user?.fullName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white">Phone Number</label>
          <input
            disabled
            type="text"
            className="bg-white text-black outline-none rounded-md px-2 py-2.5 w-72 cursor-not-allowed"
            placeholder="username"
            value={phonenum}
          />
        </div>
      </div>

      <button
        className="mt-5 bg-white text-black px-1 py-2 rounded-md hover:bg-neutral-200 transition"
        onClick={handleCreateUser}
      >
        Create Profile
      </button>
    </div>
  );
};

export default CreateUserPage;
