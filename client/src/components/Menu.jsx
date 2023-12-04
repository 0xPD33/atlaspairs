import { useState, useEffect } from "react";

const Menu = ({ setMenu, setMobileMenu, setMenuConnectWallet }) => {
  return (
    <div className="flex flex-col items-start w-full p-4">
      <button
        className="mb-4 text-white bg-gray-800 hover:bg-gray-700 font-bold py-2 px-4 rounded"
        onClick={() => setMobileMenu(false)}
      >
        X
      </button>
      <button
        className="mb-3 text-white bg-gray-800 hover:bg-gray-700 font-bold py-2 px-4 rounded"
        onClick={() => {
          setMenuConnectWallet(1);
          setMobileMenu(false);
        }}
      >
        Sacrifice
      </button>
      <button
        className="mb-3 text-white bg-gray-800 hover:bg-gray-700 font-bold py-2 px-4 rounded"
        onClick={() => {
          setMenuConnectWallet(2);
          setMobileMenu(false);
        }}
      >
        Rebirth
      </button>
      <button
        className="text-white bg-gray-800 hover:bg-gray-700 font-bold py-2 px-4 rounded"
        onClick={() => {
          setMenuConnectWallet(3);
          setMobileMenu(false);
        }}
      >
        New Primates
      </button>
    </div>
  );
};

export default Menu;
