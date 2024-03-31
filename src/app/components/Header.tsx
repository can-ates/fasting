"use client";
import Image from "next/image";
import Fasting24 from "../../assets/fasting24.svg";
import Logout from "../../assets/logout.svg";
import { logout } from "@/lib/action";
import { useFastingContext } from "@/context";
import { FastingActionTypes } from "@/constants";

const Header: React.FC = () => {
  const { FastingState, dispatchFastingAction } = useFastingContext();

  const { user } = FastingState;

  const onLogout = () => {
    logout();
    dispatchFastingAction({
      type: FastingActionTypes.SET_STATE,
      payload: { user: {} },
    });
  };

  return (
    <header className='shadow-md bg-white h-[112px] flex justify-evenly items-center'>
      <div />
      <div className='flex items-center'>
        <Image src={Fasting24} alt='Logo' width={225} height={50} />
      </div>
      <button
        style={{ visibility: user.id ? "visible" : "hidden" }}
        onClick={onLogout}
        type='button'
        aria-label='Logout'
      >
        <Image src={Logout} alt='Logout' width={36} height={36} />
      </button>
    </header>
  );
};

export default Header;
