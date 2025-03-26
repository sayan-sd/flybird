import {
    DotsThree,
    LinkSimple,
    PaperPlaneTilt,
    Smiley,
} from "@phosphor-icons/react";
import React from "react";
import Dropdown from "../../components/Dropdown";

// ============== demo frontend data ==================
let user =
    "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D";

// ============== end of demo frontend data ==================

const Inbox = () => {
    return (
        <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
            {/* User name and details */}
            <div className=" sticky flex items-center flex-row justify-between border-b border-stroke dark:border-strokedark px-6 py-4">
                {/* user info */}
                <div className="flex items-center">
                    {/* profile photo */}
                    <div className="mr-4.5 h-12 w-full max-w-12 overflow-hidden rounded-full">
                        <img
                            src={user}
                            alt="avatar"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    {/* user name */}
                    <div>
                        <h5 className="font-medium text-black dark:text-white">
                            Test User
                        </h5>
                        <p className="text-sm">Hi there, I'm using FlyBird.</p>
                    </div>
                </div>

                {/* User Dropdown */}
                <div>
                    <Dropdown />
                </div>
            </div>

            {/* Chat window */}
            <div className="max-h-full space-y-3.5 overflow-auto no-scrollbar px-6 py-7.5 grow">
                {/* friend msg */}
                <div className="max-w-125">
                    <p className="mb-2.5 text-sm fort-medium">User Name</p>
                    <div className="mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Mollitia fuga, distinctio debitis consequatur
                            sequi vero.
                        </p>
                    </div>
                    <p className="text-xs">8:45px</p>
                </div>

                {/* my msg */}
                <div className="max-w-125 ml-auto">
                    <div className="mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3">
                        <p className="text-white">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet inventore impedit architecto.
                        </p>
                    </div>
                    <p className="text-xs text-right">8:45px</p>
                </div>
            </div>

            {/* send msg input */}
            <div className=" sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-strokedark dark:bg-boxdark">
                <form className="flex items-center justify-between space-x-4.5">
                    {/* input box */}
                    <div className=" relative w-full">
                        <input
                            type="text"
                            placeholder="Type something here..."
                            className="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
                        />

                        <div className=" absolute right-5 top-1/2 -translate-y-1/2 items-center justify-end space-x-4">
                            <button className=" hover:text-primary">
                                <LinkSimple size={20} />
                            </button>
                            <button className=" hover:text-primary">
                                <Smiley size={20} />
                            </button>
                        </div>
                    </div>

                    <button className="flex items-center justify-center max-w-13 h-13 w-full rounded-md bg-primary text-white hover:bg-opacity-90">
                        <PaperPlaneTilt size={24} weight="bold" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Inbox;
