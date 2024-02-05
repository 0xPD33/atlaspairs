import { useState } from "react";
import { useLocalSettingsStore } from "./localSettings";

import { Icon } from "@iconify/react";
import logo from "./assets/logo.png";

const Navbar = ({
  account,
  menu,
  setMobileMenu,
  setMenu,
  setMenuConnectWallet,
  setupBrowserClient,
}) => {
  const showMouseLight = useLocalSettingsStore((state) => state.showMouseLight);
  const setShowMouseLight = useLocalSettingsStore(
    (state) => state.setShowMouseLight
  );

  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleLight = () => {
    setShowMouseLight(!showMouseLight);
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="p-6">
      {/* MOBILE */}
      <div className="md:hidden w-full">
        {/* Placeholder for logoCol if you have a logo */}
        <div className="w-1/2"></div>
        <div className="w-1/2"></div>
      </div>

      {/* DESKTOP */}
      <div className="navbar-desktop">
        <div className="pl-4 w-1/3 text-base flex items-center justify-start">
          <img src="" alt="" />
          <a className="main-button" href="/">
            Quit App
          </a>
          <div className="flex-1 flex justify-center gap-4">
            <a className="hover:opacity-80" href="https://twitter.com/">
              <Icon width={24} icon="bi:twitter" />
            </a>
            <a className="hover:opacity-80" href="https://t.me/">
              <Icon width={24} icon="bi:telegram" />
            </a>
            <a className="hover:opacity-80" href="https://github.com/">
              <Icon width={24} icon="bi:github" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a className="navbar-link-item" href="vaults">
              Vaults
            </a>
            <a className="navbar-link-item" href="leaderboard">
              Leaderboard
            </a>
          </div>
        </div>
        <div className="relative flex-1 flex items-center justify-center">
          <a href="vaults">
            <img
              src={logo}
              className="absolute translate-y-[-50%] translate-x-[-50%] -top-4 w-96"
              alt="logo"
            />
          </a>
        </div>
        <div className="relative pr-4 w-1/3 text-base flex items-center justify-end gap-2">
          <div>
            {account ? (
              <button
                className="flex items-center gap-2 main-button"
                onClick={handleToggleDropdown}
              >
                <Icon width={20} icon="ion:settings" />
                <p>{`${account.slice(0, 4)}...${account.slice(38, 42)}`}</p>
              </button>
            ) : (
              <button className="main-button" onClick={setupBrowserClient}>
                Connect Wallet
              </button>
            )}
          </div>
          <div>
            <div
              className={`nav-settings-menu ${
                showDropdown ? "nav-settings-menu-active" : ""
              }`}
            >
              <button
                className="nav-settings-menu-item"
                onClick={handleToggleLight}
              >
                {showMouseLight ? "Hide" : "Show"} Mouse Light
              </button>

              <button className="nav-settings-menu-item">Disconnect</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
