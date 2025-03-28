import React, { useState } from "react";
import {
    Chat,
    DotsThreeCircle,
    Shapes,
    SignOut,
    UserCircle,
    Users,
} from "@phosphor-icons/react";
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../redux/slices/auth";

const NAVIGATION = [
    {
        key: 0,
        title: "DMs",
        icon: <Chat size={24} />,
    },
    {
        key: 1,
        title: "Groups",
        icon: <Users size={24} />,
    },
    {
        key: 2,
        title: "Profile",
        icon: <UserCircle size={24} />,
    },
    {
        key: 3,
        title: "More",
        icon: <DotsThreeCircle size={24} />,
    },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(0);

    const handleClick = (key) => {
        setSelected(key);
    };

    return (
        <div className="flex flex-col border-r border-stroke p-2 dark:border-strokedark">
            {/* Options */}
            <div className="flex flex-col items-center space-y-5 mt-3">
                {/* workspace */}
                <div className="space-y-2 flex flex-col text-center">
                    <div className="mx-auto border-stroke border p-2 dark:border-strokedark rounded-md">
                        <Shapes size={24} />
                    </div>
                    <span className="font-medium text-sm">Workspace</span>
                </div>

                {/* navigation options */}
                {NAVIGATION.map(({ icon, key, title }) => (
                    <div
                        key={key}
                        className="space-y-2 flex flex-col text-center hover:cursor-pointer hover:text-primary"
                        onClick={() => {
                            handleClick(key);
                        }}
                    >
                        <div
                            className={`mx-auto border-stroke border p-2 dark:border-strokedark rounded-md ${
                                selected === key &&
                                "bg-primary bg-opacity-90 text-white"
                            } hover:border-primary dark:hover:border-primary`}
                        >
                            {icon}
                        </div>
                        <span
                            className={`font-medium text-sm ${
                                selected === key && "text-primary"
                            }`}
                        >
                            {title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Middle space */}
            <div className="flex flex-col grow"></div>

            {/* Sign out & theme */}
            <div className="space-y-4.5">
                {/* dark mode switch */}
                <div className="flex flex-row items-center justify-center">
                    <DarkModeSwitcher />
                </div>

                {/* log out */}
                <div
                    className="flex flex-row items-center justify-center border border-stroke p-2 dark:border-strokedark rounded-md hover:bg-stone-100"
                    onClick={() => {
                        dispatch(LogoutUser(navigate));
                    }}
                >
                    <SignOut size={24} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
