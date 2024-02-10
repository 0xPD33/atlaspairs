import React from "react";
import paddy from "../assets/paddy.jpg";
import rad from "../assets/rad.jpg";
import chalice from "../assets/chalice.jpg";

const Team = () => {
  return (
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
              href="https://twitter.com/radiate9999"
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
  );
};

export default Team;
