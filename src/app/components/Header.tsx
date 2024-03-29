import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className='shadow-md bg-white h-[112px] flex justify-center items-center'>
      <Image src={"/fasting24.svg"} alt='Logo' width={225} height={50} />
    </header>
  );
};

export default Header;
