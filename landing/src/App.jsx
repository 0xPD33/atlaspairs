import { useState } from "react";

import "./App.css";

import paddy from "./assets/paddy.jpg";
import rad from "./assets/rad.jpg";
import chalice from "./assets/chalice.jpg";

import scrollPepe from "./assets/scrollPepe.webp";
import poolPepe from "./assets/poolPepe.webp";
import comfyBedPepe from "./assets/comfyBedPepe.webp";
import templePepe from "./assets/templePepe.webp";

import Chart from "./Charts";
import AnimatedText from "./AnimatedText";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="landing-page-main">
      <section className="hero-section">
        <header className="w-full">
          <div className="w-full flex h-20 items-center justify-between p-6 lg:p-12">
            <div className="w-1/2 sm:w-1/3 flex items-start">
              <a
                className="font-bold text-white hover:scale-110 transition"
                href="/"
              >
                pairs.gg
              </a>
            </div>
            <nav className="hidden sm:flex sm:justify-center w-1/3">
              <ul className="flex items-center justify-center gap-8 mr-8">
                <li>
                  <a
                    className="text-gray-400 transition-all hover:text-white"
                    href="#about"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 transition-all hover:text-white"
                    href="#roadmap"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 transition-all hover:text-white"
                    href="#team"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 transition-all hover:text-white"
                    href="https://atlaspairs.gitbook.io/atlaspairs-pairs.gg-documentation/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Docs
                  </a>
                </li>
              </ul>
              <div className="flex items-center justify-center gap-4">
                <a
                  className="transition hover:opacity-70"
                  href="https://twitter.com/atlaspairs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M245.66,77.66l-29.9,29.9C209.72,177.58,150.67,232,80,232c-14.52,0-26.49-2.3-35.58-6.84-7.33-3.67-10.33-7.6-11.08-8.72a8,8,0,0,1,3.85-11.93c.26-.1,24.24-9.31,39.47-26.84a110.93,110.93,0,0,1-21.88-24.2c-12.4-18.41-26.28-50.39-22-98.18a8,8,0,0,1,13.65-4.92c.35.35,33.28,33.1,73.54,43.72V88a47.87,47.87,0,0,1,14.36-34.3A46.87,46.87,0,0,1,168.1,40a48.66,48.66,0,0,1,41.47,24H240a8,8,0,0,1,5.66,13.66Z"></path>
                  </svg>
                </a>
                <a
                  className="transition hover:opacity-70"
                  href="https://discord.gg/kXSvgXbZxq"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M247.51,174.39,218,58a16.08,16.08,0,0,0-13-11.88l-36.06-5.92a16.22,16.22,0,0,0-18.26,11.88l-.21.85a4,4,0,0,0,3.27,4.93,155.62,155.62,0,0,1,24.41,5.62,8.2,8.2,0,0,1,5.62,9.7,8,8,0,0,1-10.19,5.64,155.4,155.4,0,0,0-90.8-.1,8.22,8.22,0,0,1-10.28-4.81,8,8,0,0,1,5.08-10.33,156.85,156.85,0,0,1,24.72-5.72,4,4,0,0,0,3.27-4.93l-.21-.85A16.21,16.21,0,0,0,87.08,40.21L51,46.13A16.08,16.08,0,0,0,38,58L8.49,174.39a15.94,15.94,0,0,0,9.06,18.51l67,29.71a16.17,16.17,0,0,0,21.71-9.1l3.49-9.45a4,4,0,0,0-3.27-5.35,158.13,158.13,0,0,1-28.63-6.2,8.2,8.2,0,0,1-5.61-9.67,8,8,0,0,1,10.2-5.66,155.59,155.59,0,0,0,91.12,0,8,8,0,0,1,10.19,5.65,8.19,8.19,0,0,1-5.61,9.68,157.84,157.84,0,0,1-28.62,6.2,4,4,0,0,0-3.27,5.35l3.49,9.45a16.18,16.18,0,0,0,21.71,9.1l67-29.71A15.94,15.94,0,0,0,247.51,174.39ZM92,152a12,12,0,1,1,12-12A12,12,0,0,1,92,152Zm72,0a12,12,0,1,1,12-12A12,12,0,0,1,164,152Z"></path>
                  </svg>
                </a>
              </div>
            </nav>
            <div className="w-1/2 sm:w-1/3 flex items-center justify-end">
              <a className="cta-button" href="/">
                Enter App
              </a>
            </div>
            <button
              className="sm:hidden ml-4 block text-white p-2"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <path d="M224,120v16a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a8,8,0,0,1,8-8H216A8,8,0,0,1,224,120Zm-8,56H40a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V184A8,8,0,0,0,216,176Zm0-128H40a8,8,0,0,0-8,8V72a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48Z"></path>
              </svg>
            </button>
          </div>
        </header>
        {/* Mobile Menu */}
        <div
          className={`p-4 fixed bottom-0 left-0 w-full bg-gray-800 border-white/50 border-t-2 z-10 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="relative flex flex-col items-center gap-3 text-xl text-white text-center">
            <button className="absolute top-0 right-0" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </button>

            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#roadmap">Roadmap</a>
            </li>
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a
                href="https://atlaspairs.gitbook.io/atlaspairs-pairs.gg-documentation/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Docs
              </a>
            </li>
            <div className="flex items-center justify-center gap-8">
              <a
                href="https://twitter.com/atlaspairs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#ffffff"
                  viewBox="0 0 256 256"
                >
                  <path d="M245.66,77.66l-29.9,29.9C209.72,177.58,150.67,232,80,232c-14.52,0-26.49-2.3-35.58-6.84-7.33-3.67-10.33-7.6-11.08-8.72a8,8,0,0,1,3.85-11.93c.26-.1,24.24-9.31,39.47-26.84a110.93,110.93,0,0,1-21.88-24.2c-12.4-18.41-26.28-50.39-22-98.18a8,8,0,0,1,13.65-4.92c.35.35,33.28,33.1,73.54,43.72V88a47.87,47.87,0,0,1,14.36-34.3A46.87,46.87,0,0,1,168.1,40a48.66,48.66,0,0,1,41.47,24H240a8,8,0,0,1,5.66,13.66Z"></path>
                </svg>
              </a>
              <a
                href="https://discord.gg/kXSvgXbZxq"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#ffffff"
                  viewBox="0 0 256 256"
                >
                  <path d="M247.51,174.39,218,58a16.08,16.08,0,0,0-13-11.88l-36.06-5.92a16.22,16.22,0,0,0-18.26,11.88l-.21.85a4,4,0,0,0,3.27,4.93,155.62,155.62,0,0,1,24.41,5.62,8.2,8.2,0,0,1,5.62,9.7,8,8,0,0,1-10.19,5.64,155.4,155.4,0,0,0-90.8-.1,8.22,8.22,0,0,1-10.28-4.81,8,8,0,0,1,5.08-10.33,156.85,156.85,0,0,1,24.72-5.72,4,4,0,0,0,3.27-4.93l-.21-.85A16.21,16.21,0,0,0,87.08,40.21L51,46.13A16.08,16.08,0,0,0,38,58L8.49,174.39a15.94,15.94,0,0,0,9.06,18.51l67,29.71a16.17,16.17,0,0,0,21.71-9.1l3.49-9.45a4,4,0,0,0-3.27-5.35,158.13,158.13,0,0,1-28.63-6.2,8.2,8.2,0,0,1-5.61-9.67,8,8,0,0,1,10.2-5.66,155.59,155.59,0,0,0,91.12,0,8,8,0,0,1,10.19,5.65,8.19,8.19,0,0,1-5.61,9.68,157.84,157.84,0,0,1-28.62,6.2,4,4,0,0,0-3.27,5.35l3.49,9.45a16.18,16.18,0,0,0,21.71,9.1l67-29.71A15.94,15.94,0,0,0,247.51,174.39ZM92,152a12,12,0,1,1,12-12A12,12,0,0,1,92,152Zm72,0a12,12,0,1,1,12-12A12,12,0,0,1,164,152Z"></path>
                </svg>
              </a>
            </div>
          </ul>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-center py-16">
          <div className="px-4 lg:pl-20 lg:pr-0 lg:z-0 flex flex-col items-start gap-8 w-full lg:w-4/5 2xl:w-7/12">
            <h1 className="text-shadow-home">
              The Future of <AnimatedText /> is here...
            </h1>
            <p className="text-2xl text-start">
              Discover a unique staking platform that makes pair trading both
              straightforward and enjoyable.
            </p>
            <div className="flex items-center gap-4">
              <a className="cta-button" href="/vaults">
                Enter App
              </a>
              <div className="md:hidden flex items-center justify-center gap-4">
                <a
                  className="transition hover:opacity-70"
                  href="https://twitter.com/atlaspairs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M245.66,77.66l-29.9,29.9C209.72,177.58,150.67,232,80,232c-14.52,0-26.49-2.3-35.58-6.84-7.33-3.67-10.33-7.6-11.08-8.72a8,8,0,0,1,3.85-11.93c.26-.1,24.24-9.31,39.47-26.84a110.93,110.93,0,0,1-21.88-24.2c-12.4-18.41-26.28-50.39-22-98.18a8,8,0,0,1,13.65-4.92c.35.35,33.28,33.1,73.54,43.72V88a47.87,47.87,0,0,1,14.36-34.3A46.87,46.87,0,0,1,168.1,40a48.66,48.66,0,0,1,41.47,24H240a8,8,0,0,1,5.66,13.66Z"></path>
                  </svg>
                </a>
                <a
                  className="transition hover:opacity-70"
                  href="https://discord.gg/kXSvgXbZxq"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M247.51,174.39,218,58a16.08,16.08,0,0,0-13-11.88l-36.06-5.92a16.22,16.22,0,0,0-18.26,11.88l-.21.85a4,4,0,0,0,3.27,4.93,155.62,155.62,0,0,1,24.41,5.62,8.2,8.2,0,0,1,5.62,9.7,8,8,0,0,1-10.19,5.64,155.4,155.4,0,0,0-90.8-.1,8.22,8.22,0,0,1-10.28-4.81,8,8,0,0,1,5.08-10.33,156.85,156.85,0,0,1,24.72-5.72,4,4,0,0,0,3.27-4.93l-.21-.85A16.21,16.21,0,0,0,87.08,40.21L51,46.13A16.08,16.08,0,0,0,38,58L8.49,174.39a15.94,15.94,0,0,0,9.06,18.51l67,29.71a16.17,16.17,0,0,0,21.71-9.1l3.49-9.45a4,4,0,0,0-3.27-5.35,158.13,158.13,0,0,1-28.63-6.2,8.2,8.2,0,0,1-5.61-9.67,8,8,0,0,1,10.2-5.66,155.59,155.59,0,0,0,91.12,0,8,8,0,0,1,10.19,5.65,8.19,8.19,0,0,1-5.61,9.68,157.84,157.84,0,0,1-28.62,6.2,4,4,0,0,0-3.27,5.35l3.49,9.45a16.18,16.18,0,0,0,21.71,9.1l67-29.71A15.94,15.94,0,0,0,247.51,174.39ZM92,152a12,12,0,1,1,12-12A12,12,0,0,1,92,152Zm72,0a12,12,0,1,1,12-12A12,12,0,0,1,164,152Z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-16 protocol-stat-box">
              <p className="text-3xl mb-4 text-blue-100">Protocol Stats</p>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
                <div>
                  <p>Revenue shared</p>
                  <p className="protocol-stat-value">$???</p>
                </div>
                <div>
                  <p>Number of epochs</p>
                  <p className="protocol-stat-value">$???</p>
                </div>
                <div>
                  <p>Staked $ATLAS</p>
                  <p className="protocol-stat-value">$???</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-16 lg:pt-0 w-full 2xl:w-1/3">
            <img src={scrollPepe} alt="" />
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-box">
          <div className="flex flex-col justify-center lg:mr-8">
            <h1 className="text-shadow-home mb-2">Gamified Pair Trading</h1>
            <p>
              As a gamified pair trading platform, we are making pair trading
              easy and fun. Lock your tokens in vaults, earn rewards based on
              token pair performance, and enjoy fixed returns that change every
              36 hours. Make strategic predictions, hedge your positions, or
              take chances—it's all up to you.
            </p>
          </div>
          <div className="w-full">
            <img src={poolPepe} alt="" />
          </div>
        </div>
        <div className="about-box flex-col-reverse lg:flex-row">
          <div className="w-full">
            <img src={comfyBedPepe} alt="" />
          </div>
          <div className="flex flex-col justify-center lg:ml-8">
            <h1 className="text-shadow-home mb-2">Referral System</h1>
            <p>
              Get your personalized referral link from AtlasPairs once per epoch
              and share it with friends. When they use your link to stake in a
              pool, you'll earn 25% of the fees generated from their activity!
            </p>
          </div>
        </div>
        <div className="about-box">
          <div className="flex flex-col justify-center lg:ml-8">
            <h1 className="text-shadow-home mb-2">Governance</h1>
            <p>
              $ATLAS holders have full governance control over the protocol, and
              can participate in decision-making through a dedicated forum for
              proposals and discussions. Team tokens, even after vesting, will
              not have voting rights in the governance process.
            </p>
          </div>
          <div className="w-full">
            <img src={templePepe} alt="" />
          </div>
        </div>
        <div className="my-16">
          <h1 className="text-shadow-home mb-4 text-center">Tokenomics</h1>
          <p className="mb-2 w-full text-2xl text-shadow-home text-center">
            Use Cases of $ATLAS in AtlasPairs
          </p>
          <ul className="bg-gray-800/60 rounded-lg p-4 text-lgs flex flex-col items-start gap-2">
            <li>
              Fee Rebate: When depositing into Pools using $ATLAS, fees reduce
              by 90%.
            </li>
            <li>Real Yield: Stake $ATLAS to reap the protocol's revenue.</li>
            <li>
              Governance: Participate in creating and voting on proposals as
              each holder becomes part of the DAO governing AtlasPairs.
            </li>
          </ul>
        </div>
        <p className="mb-2 w-full text-3xl text-shadow-home text-center">
          $ATLAS Distribution
        </p>
        <div className="w-64 h-64 lg:w-96 lg:h-96">
          <Chart />
        </div>
      </section>
      <section className="roadmap-section" id="roadmap">
        <div className="w-full pb-32">
          <h1 className="text-shadow-home text-center mb-16">Roadmap</h1>
          <div className="flex flex-col w-full h-full justify-center items-center gap-16 md:gap-20 lg:flex-row">
            <div className="roadmap-card rotate-3">
              <p className="text-2xl">Token Pools:</p>
              <p>
                We're expanding beyond individual tokens to offer Token Pools.
                These pools are not limited to random combinations; they can be
                curated based on narratives such as L1/L2, DeFi, Small caps, LSD
                (Low Supply Digital Assets), and more. This allows for a diverse
                range of investment opportunities.
              </p>
            </div>
            <div className="roadmap-card -rotate-6">
              <p className="text-2xl">Support for More Tokens:</p>
              <p>
                Our commitment to inclusivity drives us to add support for a
                broader range of tokens, including popular choices like
                $BITCOIN, $MOG, and other community favorites. Our expansion
                depends on the availability of sufficient token liquidity to
                prevent manipulation and the accessibility of reliable oracle
                services.
              </p>
            </div>
            <div className="roadmap-card rotate-3">
              <p className="text-2xl">NFT Mode:</p>
              <p>
                Introducing a new dimension to our platform, NFT Mode brings the
                same gamified staking mechanics to the world of NFTs. While the
                mechanics remain consistent, NFT Mode may have extended epoch
                times due to the lower volatility of non-fungible tokens.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="team-section" id="team">
        <h1 className="text-center text-shadow-home mb-8">Team</h1>
        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-12 2xl:gap-16">
          <div className="team-card flex flex-col items-center">
            <img
              className="rounded-full w-32 h-32"
              src={paddy}
              alt="Team Member 1"
            />
            <div className="text-center mt-4">
              <div className="font-bold text-xl">Paddy</div>
              <p className="text-gray-200 mb-1">Tech Wizard</p>
              <a
                href="https://twitter.com/0xPD33"
                rel="noreferrer noopener"
                target="_blank"
                className="text-blue-500 hover:text-blue-700 flex justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M245.66,77.66l-29.9,29.9C209.72,177.58,150.67,232,80,232c-14.52,0-26.49-2.3-35.58-6.84-7.33-3.67-10.33-7.6-11.08-8.72a8,8,0,0,1,3.85-11.93c.26-.1,24.24-9.31,39.47-26.84a110.93,110.93,0,0,1-21.88-24.2c-12.4-18.41-26.28-50.39-22-98.18a8,8,0,0,1,13.65-4.92c.35.35,33.28,33.1,73.54,43.72V88a47.87,47.87,0,0,1,14.36-34.3A46.87,46.87,0,0,1,168.1,40a48.66,48.66,0,0,1,41.47,24H240a8,8,0,0,1,5.66,13.66Z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="team-card flex flex-col items-center">
            <img
              className="rounded-full w-32 h-32"
              src={rad}
              alt="Team Member 2"
            />
            <div className="text-center mt-4">
              <div className="font-bold text-xl">Rad</div>
              <p className="text-gray-200 mb-1">Marketing Femboy</p>
              <a
                href="https://twitter.com/radiate999"
                rel="noreferrer noopener"
                target="_blank"
                className="text-blue-500 hover:text-blue-700 flex justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M245.66,77.66l-29.9,29.9C209.72,177.58,150.67,232,80,232c-14.52,0-26.49-2.3-35.58-6.84-7.33-3.67-10.33-7.6-11.08-8.72a8,8,0,0,1,3.85-11.93c.26-.1,24.24-9.31,39.47-26.84a110.93,110.93,0,0,1-21.88-24.2c-12.4-18.41-26.28-50.39-22-98.18a8,8,0,0,1,13.65-4.92c.35.35,33.28,33.1,73.54,43.72V88a47.87,47.87,0,0,1,14.36-34.3A46.87,46.87,0,0,1,168.1,40a48.66,48.66,0,0,1,41.47,24H240a8,8,0,0,1,5.66,13.66Z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="team-card flex flex-col items-center">
            <img
              className="rounded-full w-32 h-32"
              src={chalice}
              alt="Team Member 3"
            />
            <div className="text-center mt-4">
              <div className="font-bold text-xl">Chalice</div>
              <p className="text-gray-200 mb-1">Product Retard</p>
              <a
                href="https://twitter.com/ehrxbt"
                rel="noreferrer noopener"
                target="_blank"
                className="text-blue-500 hover:text-blue-700 flex justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M245.66,77.66l-29.9,29.9C209.72,177.58,150.67,232,80,232c-14.52,0-26.49-2.3-35.58-6.84-7.33-3.67-10.33-7.6-11.08-8.72a8,8,0,0,1,3.85-11.93c.26-.1,24.24-9.31,39.47-26.84a110.93,110.93,0,0,1-21.88-24.2c-12.4-18.41-26.28-50.39-22-98.18a8,8,0,0,1,13.65-4.92c.35.35,33.28,33.1,73.54,43.72V88a47.87,47.87,0,0,1,14.36-34.3A46.87,46.87,0,0,1,168.1,40a48.66,48.66,0,0,1,41.47,24H240a8,8,0,0,1,5.66,13.66Z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full bg-black flex items-center justify-center">
        <p className="py-4 text-gray-200">
          AtlasPairs © 2023. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default App;
