import React, { useState } from "react";
import victory from "../../assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Background from "../../assets/login2.png";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleLogin = async() => {};
  const handleSignup = async() => {};
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center select-none">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={victory} alt="emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fil in the details to get started with the chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-5" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChnage={(e) => setEmail(e.target.value)}
                  className="rounded-full p-6"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChnage={(e) => setPassword(e.target.value)}
                  className="rounded-full p-6"
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 mt-5" value="signup">
              <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChnage={(e) => setEmail(e.target.value)}
                  className="rounded-full p-6"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChnage={(e) => setPassword(e.target.value)}
                  className="rounded-full p-6"
                />
              <Input
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChnage={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-full p-6"
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>SignUp</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex items-center justify-center">
          <img src={Background} alt="background-login" className="h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
