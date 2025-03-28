import { Chat, DotsThreeVertical, VideoCamera, X } from "@phosphor-icons/react";
import React from "react";


// ============== demo frontend data ==================
let user =
    "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D";

// ============== end of demo frontend data ==================


const UserInfo = ({ handleToggleUserInfo }) => {
    return (
        <div className="flex border-l flex-col h-full border-stroke dark:border-strokedark">
            {/* header */}
            <div className=" sticky border-b border-stroke dark:border-strokedark flex flex-row items-center justify-between w-full px-6 py-6.5">
                <div className="text-black dark:text-white font-semibold text-lg">
                    Profile
                </div>

                <button onClick={handleToggleUserInfo}>
                    <X size={24}/>
                </button>
            </div>

            {/* image */}
            <div className="mx-auto my-8">
                <img src={user} alt="user" className="w-44 h-44 rounded-lg object-cover object-center" />
            </div>

            {/* user info */}
            <div className="px-6 space-y-1 mx-auto mb-6">
                <div className="text-black dark:text-white text-xl font-medium">
                    User Name
                </div>
                <div className="text-body text-md text-center">
                    Student
                </div>
            </div>

            {/* connection options */}
            <div className="px-6 flex flex-row space-x-2">
                <button className="w-full border border-stroke dark:border-strokedark p-2 rounded-md flex flex-row items-center justify-center">
                    <Chat size={20} className="mr-3" />
                    Message
                </button>
                <button className="w-full border border-stroke dark:border-strokedark p-2 rounded-md flex flex-row items-center justify-center">
                    <VideoCamera size={20} className="mr-3" />
                    Video Call
                </button>
                <button className="border border-stroke dark:border-strokedark p-2 rounded-md flex flex-row items-center justify-center">
                    <DotsThreeVertical size={20}  />
                </button>
            </div>
        </div>
    );
};

export default UserInfo;
