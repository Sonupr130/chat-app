import { useAppStore } from '@/store';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactsContainer from './contacts-container';
import EmptyChatContainer from './empty-container';
import ChatContainer from './chat-container';

const Chat = () => {

  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if(!userInfo.profileSetup) {
  //     toast("Please setup your profile to continue.");
  //     navigate('/profile');
  //   } 
  // }), [userInfo, navigate];
  return (
    <div className='flex h-[100vh] overflow-hidden text-white'>
      <ContactsContainer/>
      {/* <EmptyChatContainer /> */}
      {/* <ChatContainer/> */}
    </div>
  )
}

export default Chat;
