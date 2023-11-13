import { useMutation, useQuery } from 'convex/react';
import { useUser } from "@clerk/clerk-react";
import { api } from '@/convex/_generated/api';

export const currentUser = () => {
  const { user } = useUser();
  const phonenum = user?.phoneNumbers[0]?.phoneNumber?.replace('+91', '');
  let currentuser = useQuery(api.userRegister.getUser, {
    phoneNumber: phonenum,
  });
  currentuser = currentuser?.[0];

  return currentuser;
}