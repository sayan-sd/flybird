import React, { useEffect, useRef, useState } from "react";
import { DotsThree, PencilSimple, Trash } from "@phosphor-icons/react";

const Dropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef(null);
    const dropdown = useRef(null);

    // click outside of the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdown.current &&
                !dropdown.current.contains(event.target) &&
                trigger.current &&
                !trigger.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    return (
        <div className=" relative flex">
            <button
                className="text-[#98A6AD] hover:text-body"
                ref={trigger}
                onClick={() => setDropdownOpen((prev) => !prev)}
            >
                <DotsThree size={24} />
            </button>

            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={` absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                    dropdownOpen === true ? "block" : "hidden"
                }`}
            >
                <button className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                    <PencilSimple size={20} />
                    Edit
                </button>

                <button className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                    <Trash size={20} />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Dropdown;
