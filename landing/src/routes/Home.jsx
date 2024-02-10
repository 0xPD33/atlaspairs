import React from "react";

import scrollPepe from "../assets/scrollPepe.webp";

import AnimatedText from "../components/AnimatedText";
import About from "../components/About";
import Nav from "../components/Nav";
import Roadmap from "../components/Roadmap";
import Team from "../components/Team";
import Presale from "../components/Presale";

const Home = () => {
  return (
    <main className="landing-page-main">
      <section className="hero-section">
        <div className="w-full flex flex-col lg:flex-row justify-center py-16">
          <div className="px-4 lg:pl-20 lg:pr-0 lg:z-0 flex flex-col items-start gap-8 w-full lg:w-4/5 2xl:w-7/12">
            <h1 className="text-shadow-home">
              The Future of{" "}
              <span>
                <AnimatedText />
              </span>
              is here...
            </h1>
            <p className="text-2xl text-start">
              Discover a unique staking platform that makes pair trading both
              straightforward and enjoyable.
            </p>
            <div className="flex items-center gap-4">
              <a className="cta-button" href="https://app.pairs.gg/vaults">
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
      <Presale />
      <About />
      <Roadmap />
      <Team />
      <footer className="w-full bg-black flex items-center justify-center">
        <p className="py-4 text-gray-200">
          AtlasPairs © 2024. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default Home;
