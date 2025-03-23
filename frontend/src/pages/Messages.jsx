import React from "react";
import Sidebar from "../sections/chat/Sidebar";
import ChatList from "../sections/chat/ChatList";
import Inbox from "../sections/chat/Inbox";

const Messages = () => {
    return (
        <div className="h-screen overflow-hidden">
            <div className="h-full rounded-sm border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
                {/* Side bar */}
                <Sidebar />


                {/* Contact List */}
                <ChatList />


                {/* Inbox */}
                <Inbox/>
            </div>
        </div>
    );
};

export default Messages;
