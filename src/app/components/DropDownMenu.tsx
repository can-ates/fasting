import React, { useState } from "react";
import Image from "next/image";

import ThreeDot from "../../assets/threedot.svg";
import { DropDownMenuProps } from "@/types";

const DropdownMenu: React.FC<DropDownMenuProps> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const onClickDot = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <button
        onClick={onClickDot}
        className='relative flex flex-col justify-around items-center bg-transparent '
        aria-label='menu'
      >
        <Image src={ThreeDot} height={20} width={20} alt='menu' />
      </button>
      {showMenu && (
        <div
          className='absolute right-5 bottom-0 mt-2  bg-white border border-gray-200 rounded-md '
          role='menu'
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
