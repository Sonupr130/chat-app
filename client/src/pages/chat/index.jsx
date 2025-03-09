import { useAppStore } from '@/store';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Chat = () => {

  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(!userInfo) {
      navigate('/auth');
      toast("You need to login first!");
      // toast("Please setup your profile to continue.");
      navigate('/login');
    } 
  }), [userInfo, navigate];
  return (
    <div>
      <h1>Chat</h1>
    </div>
  )
}

export default Chat;
