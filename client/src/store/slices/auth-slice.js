export const createAuthSlice = (set) => ({
    userInfo:undefined,
    // setUserInfo: (userInfo) =>
        // set((state) => ({
        //   userInfo: { ...state.userInfo, ...userInfo }, 
        // })),
        setUserInfo: (userInfo) => set({ userInfo }),
});