import { MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";

// ============== demo frontend data ==================

const user =
    "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D";

const List = [
    {
        imgSrc: user,
        name: "User 1",
        message: "This is a test message",
    },
    {
        imgSrc: user,
        name: "User 2",
        message: "This is a test message",
    },
    {
        imgSrc: user,
        name: "User 3",
        message: "This is a test message",
    },
    {
        imgSrc: user,
        name: "User 4",
        message: "This is a test message",
    },
    {
        imgSrc: user,
        name: "User 5",
        message: "This is a test message",
    },
];

// ============== end of demo frontend data =================
const ChatList = () => {
    return (
        <div className="hidden h-full flex-col xl:flex xl:w-1/4">
            {/* Heading */}
            <div className=" sticky border-b border-stroke dark:border-strokedark px-6 py-6.5 flex flex-row">
                <h3 className=" text-lg font-medium text-black dark:text-white 2xl:text-xl">
                    Your FlyBirds
                </h3>
                <span className=" rounded-md border-[0.5px] border-stroke dark:border-strokedark bg-gray px-2 py-0.5 text-base font-medium text-black dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
                    5
                </span>
            </div>

            <div className="flex max-h-full flex-col overflow-auto p-5">
                {/* Search box */}
                <form className=" sticky mb-7">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                    />

                    <button className=" absolute right-4 top-1/2 -translate-y-1/2">
                        <MagnifyingGlass size={18} />
                    </button>
                </form>

                {/* Contact List */}
                <div className="no-scrollbar overflow-auto max-h-full space-y-2.5">
                    {List.map((object, item) => {
                        return (
                            <div
                                className="flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark"
                                key={item}
                            >
                                {/* profile img */}
                                <div className=" relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                                    <img
                                        src={object.imgSrc}
                                        alt="profile"
                                        className="h-full w-full rounded-full object-cover object-center"
                                    />

                                    <span className=" absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                                </div>

                                <div className="w-full">
                                    {/* username */}
                                    <h5 className="text-sm font-medium text-black dark:text-white">
                                        {object.name}
                                    </h5>

                                    {/* lasg msg */}
                                    <p className="text-sm">{ object.message }</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
