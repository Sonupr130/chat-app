import React from 'react'
import { useAppStore } from '@/store';

const Profile = () => {

  const { userInfo } = useAppStore();
  return (
    <div>
      <h1>Routes</h1>
      <h1>Email: {userInfo.email}</h1>
    </div>
  )
}

export default Profile;
