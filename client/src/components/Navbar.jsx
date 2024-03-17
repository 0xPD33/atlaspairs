import { useState } from "react";
import { useLocalSettingsStore } from "./localSettings";
import { Link } from "react-router-dom";

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
    (state) => state.setShowMouseLight,
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleLight = () => {
    setShowMouseLight(!showMouseLight);
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="p-0 lg:p-6">
      {/* MOBILE */}
      <div className="navbar-mobile">
        <button className="p-2" onClick={toggleMobileMenu}>
          <Icon icon="bi:list" width="24" height="24" />
        </button>

        <div className="relative flex-1 flex items-center justify-center">
          <Link to="/">
            <img
              src={logo}
              className="absolute translate-y-[-50%] translate-x-[-50%] top-6 w-48"
              alt="logo"
            />
          </Link>
        </div>
        <div className="p-4"></div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="nav-menu-mobile">
          <a className="main-button" href="https://pairs.gg">
            Quit App
          </a>
          <div className="flex-1 flex justify-center gap-4">
            <a
              className="hover:opacity-80"
              href="https://twitter.com/atlaspairs"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon width={24} icon="bi:twitter" />
            </a>
            <a
              className="hover:opacity-80"
              href="https://discord.gg/kXSvgXbZxq"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon width={24} icon="bi:discord" />
            </a>
            <a
              className="hover:opacity-80"
              href="https://github.com/0xPD33/atlaspairs"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon width={24} icon="bi:github" />
            </a>
          </div>
          {/*}<div className="flex items-center gap-4">
						<div className="flex items-center gap-4">
							<Link className="navbar-link-item" to="/">
								Vaults
							</Link>
							<Link className="navbar-link-item" to="/leaderboard">
								Leaderboard
							</Link>
						</div>
					</div>*/}
          <div>
            {account ? (
              <button className="main-button" onClick={handleToggleDropdown}>
                <p>{`${account.slice(0, 4)}...${account.slice(38, 42)}`}</p>
              </button>
            ) : (
              <button className="main-button" onClick={setupBrowserClient}>
                Connect
              </button>
            )}
          </div>
          <div>
            <button onClick={() => setIsMobileMenuOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* DESKTOP */}
      <div className="navbar-desktop">
        <div className="pl-4 w-1/3 text-base flex items-center justify-start">
          <img src="" alt="" />
          <a className="main-button" href="https://pairs.gg">
            Quit App
          </a>
          <div className="flex-1 flex justify-center gap-4">
            <a
              className="hover:opacity-80"
              href="https://twitter.com/atlaspairs"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon width={24} icon="bi:twitter" />
            </a>
            <a
              className="hover:opacity-80"
              href="https://discord.gg/kXSvgXbZxq"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon width={24} icon="bi:discord" />
            </a>
            <a
              className="hover:opacity-80"
              href="https://github.com/0xPD33/atlaspairs"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon width={24} icon="bi:github" />
            </a>
          </div>
          {/* <div className="flex items-center gap-4">
						<Link className="navbar-link-item" to="/">
							Vaults
						</Link>
						<Link className="navbar-link-item" to="/leaderboard">
							Leaderboard
						</Link>
					</div> */}
        </div>
        <div className="relative flex-1 flex items-center justify-center">
          <Link to="/">
            <img
              src={logo}
              className="absolute translate-y-[-50%] translate-x-[-50%] -top-4 w-96"
              alt="logo"
            />
          </Link>
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
              {/* <button className="nav-settings-menu-item">Disconnect</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
