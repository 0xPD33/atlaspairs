import { Icon } from "@iconify/react";

const Footer = ({ menu, setMobileMenu, setMenu, setMenuConnectWallet }) => {
  return (
    <footer className="w-full flex flex-col md:flex-row items-center justify-between">
      {/* MOBILE */}
      <div className="block md:hidden w-full">
        <div className="flex justify-between items-center w-full">
          {/* Placeholder for logoCol if you have a logo to display */}
          <div className="w-1/2"></div>
          <div className="w-1/2 flex justify-end">
            {/* Placeholder for connectButtonCol if there's content */}
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block w-full bg-[rgba(0,0,0,0.2)] p-4">
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
