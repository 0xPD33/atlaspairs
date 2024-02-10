import Chart from "../Charts";

import poolPepe from "../assets/poolPepe.webp";
import comfyBedPepe from "../assets/comfyBedPepe.webp";
import templePepe from "../assets/templePepe.webp";

const About = () => {
  return (
    <section className="about-section" id="about">
      <h1 className="text-shadow-home">About</h1>
      <div className="about-box">
        <div className="flex flex-col justify-center lg:mr-8">
          <h1 className="text-shadow-home mb-2">Gamified Pair Trading</h1>
          <p>
            As a gamified pair trading platform, we are making pair trading easy
            and fun. Lock your tokens in vaults, earn rewards based on token
            pair performance, and enjoy fixed returns that change every 36
            hours. Make strategic predictions, hedge your positions, or take
            chances—it's all up to you.
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
            proposals and discussions. Team tokens, even after vesting, will not
            have voting rights in the governance process.
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
            Fee Rebate: When depositing into Pools using $ATLAS, fees reduce by
            90%.
          </li>
          <li>Real Yield: Stake $ATLAS to reap the protocol's revenue.</li>
          <li>
            Governance: Participate in creating and voting on proposals as each
            holder becomes part of the DAO governing AtlasPairs.
          </li>
        </ul>
      </div>
      <p className="mb-2 w-full text-4xl text-shadow-home text-center">
        $ATLAS Distribution
      </p>
      <div className="w-64 h-64 lg:w-96 lg:h-96">
        <Chart />
      </div>
    </section>
  );
};

export default About;
