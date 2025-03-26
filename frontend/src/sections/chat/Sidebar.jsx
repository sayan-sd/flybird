import React from "react";
import { Chat, SignOut } from "@phosphor-icons/react";
import DarkModeSwitcher from "../../components/DarkModeSwitcher";

const Sidebar = () => {
    return (
        <div className="flex flex-col border-r border-stroke p-2 dark:border-strokedark">
            {/* DM */}
            <div className="mx-auto border-stroke border p-2 dark:border-strokedark rounded-md">
                <Chat size={24} />
            </div>

            {/* Middle space */}
            <div className="flex flex-col grow"></div>

            {/* Sign out & theme */}
            <div className="space-y-4.5">
                {/* dark mode switch */}
                <DarkModeSwitcher />

                {/* log out */}
                <div className="mx-auto border-stroke p-2 dark:border-strokedark rounded-md hover:bg-stone-100">
                    <SignOut size={24} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
