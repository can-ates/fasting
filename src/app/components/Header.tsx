import Image from "next/image";
import Fasting24 from "../../assets/fasting24.svg";

const Header: React.FC = () => {
  return (
    <header className='shadow-md bg-white h-[112px] flex justify-center items-center'>
      <Image src={Fasting24} alt='Logo' width={225} height={50} />
    </header>
  );
};

export default Header;
