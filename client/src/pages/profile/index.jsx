import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  REMOVE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "@/utils/constants";
import { HOST } from "@/utils/constants";

const Profile = () => {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useAppStore();
  console.log(userInfo);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hoverd, setHoverd] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    // if(userInfo?.image){
    //   setImage(`${HOST}/${userInfo.image}`);
    // } else {
    //   setImage(null);
    // }
    if (userInfo?.image) {
      const imagePath = `${HOST}/${userInfo.image.replace(/\\/g, "/")}`;
      setImage(imagePath); // State ko update karenge
    } else {
      setImage(null); // Agar image remove hui toh null karenge
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First name is required");
      return false;
    }
    if (!lastName) {
      toast.error("Last name is required");
      return false;
    }
    return true;
  };

  // const saveChanges = async () => {
  //   if (validateProfile()) {
  //     try {
  //       console.log("Sending Data:", {
  //         firstName,
  //         lastName,
  //         color: selectedColor,
  //       });

  //       const response = await apiClient.post(
  //         UPDATE_PROFILE_ROUTE,
  //         { firstName, lastName, color: selectedColor },
  //         { withCredentials: true }
  //       );
  //       // if (response.status === 200 && response.data) {
  //       //   setUserInfo({ ...response.data });
  //       //   toast.success("Profile updated successfully");
  //       //   navigate("/chat");
  //       // }
  //       if (response.status === 200 && response.data.image) {
  //         setUserInfo({ ...userInfo, image: response.data.image });
  //         setImage(`${HOST}/${response.data.image}`);
  //         toast.success("Profile image updated successfully");
  //         navigate("/chat");
  //       }
  //     } catch (error) {
  //       toast.error("Failed to update profile");
  //       console.log("Error: ", error);
  //     }
  //   }
  // };


  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        console.log("Sending Data:", {
          firstName,
          lastName,
          color: selectedColor,
        });
  
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
  
        if (response.status === 200) {
          // User data update hote hi `setUserInfo` ko update kar
          setUserInfo({ ...userInfo, ...response.data });
  
          // Toast ko success message dikhane de
          toast.success("Profile updated successfully");
  
          // Chat page pe navigate kar
          navigate("/chat");
        }
      } catch (error) {
        toast.error("Failed to update profile");
        console.log("Error: ", error);
      }
    }
  };
  

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup your profile to continue.");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  // const handleImageChange = async (event) => {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("profile-image", file);
  //     const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
  //       withCredentials: true,
  //     });
  //     console.log("Image", response.data.image);

  //     if (response.status === 200 && response.data.image) {
  //       setUserInfo({ ...userInfo, image: response.data.image });
  //       toast.success("Profile image updated successfully");
  //     }
  //   }
  // };




  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
  
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });
  
      // ✅ User info ko update karenge
      if (response.status === 201) {
        setUserInfo(response.data); // Yeh ab sahi se re-render karega
        toast.success("Profile image updated successfully");
      }
    }
  };
  
  
  

  // const handleDeleteImage = async () => {
  //   try {
  //     const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
  //       withCredentials: true,
  //     });
  //     if (response.status === 200) {
  //       setUserInfo({ ...userInfo, image: null });
  //       toast.success("Image removed successfully");
  //       setImage(null);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };



  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        setUserInfo((prev) => ({ ...prev, image: null }));
        toast.success("Image removed successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove image");
    }
  };
  

  


  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>

        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHoverd(true)}
            onMouseLeave={() => setHoverd(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full "
                  onError={() => console.log("Image Error")}
                  onLoad={() => console.log("Image Loaded")}
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hoverd && (
              <div
                onClick={image ? handleDeleteImage : handleFileInputClick}
                className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, .jpg, .jpeg, .svg, .webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300
                ${selectedColor === index ? "outline-white/50 outline-1" : ""}
                `}
                  key={index}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            onClick={saveChanges}
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
