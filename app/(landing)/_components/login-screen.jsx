'use client';

import Image from 'next/image';
import React from 'react';

//import logo from '@/public/whatsapplogo.svg';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { useConvexAuth, useQuery } from 'convex/react';
//import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { redirect, useRouter } from 'next/navigation';

const LoginScreen = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();

  const phonenum = user?.phoneNumbers[0]?.phoneNumber?.replace('+91', '');
  let currentUser = useQuery(api.userRegister.getUser, {
    phoneNumber: phonenum,
  });

  if (currentUser?.length >= 1) {
    return redirect('/chats')
  }

  //console.log(currentUser);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-3">
      <Image src={'/whatsapplogo.svg'} alt="logo" height="150" width="150" />
      {isLoading && <Loader className="animate-spin" stroke="white" />}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <div className="bg-white text-black px-6 py-2 rounded-md cursor-pointer">
            Login
          </div>
        </SignInButton>
      )}
      {isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <button className="bg-white px-3 py-1 rounded-md">
            <Link className="bg-white hover:bg-neutral-100" href="/createuser">
              <p className="text-black font-semibold">Enter Whatsapp</p>
            </Link>
          </button>
        </SignInButton>
      )}

      {/* <div className="bg-white px-5 py-1.5 rounded-sm hover:bg-neutral-100 cursor-pointer">
        
      </div> */}
    </div>
  );
};

export default LoginScreen;
