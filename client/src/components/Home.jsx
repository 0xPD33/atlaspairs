import "./Home.css";
import scrollPepe from "./assets/scrollPepe.png";
import poolPepe from "./assets/poolPepe.png";
import comfyBedPepe from "./assets/comfyBedPepe.png";
import templePepe from "./assets/templePepe.png";

const Home = () => {
  return (
    <main className="landing-page-main">
      <div className="hero-section">
        <header className="w-full">
          <nav className="w-full flex h-20 items-center justify-between p-12">
            <div className="w-1/3 flex items-start">
              <a
                className="font-bold text-white hover:scale-110 transition"
                href="/"
              >
                pairs.gg
              </a>
            </div>
            <nav className="w-1/3">
              <ul className="flex items-center justify-center gap-8">
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
            </nav>
            <div className="w-1/3 flex items-center justify-end">
              <a className="cta-button" href="/vaults">
                Enter App
              </a>
            </div>
          </nav>
        </header>

        <div className="w-full flex justify-center py-16">
          <div className="pl-20 w-1/2 flex flex-col items-start gap-8">
            <h1 className="text-5xl xl:text-6xl text-white text-start text-shadow-home">
              The Future of Gamified Pair Trading is here...
            </h1>
            <p className="text-xl text-start">
              Discover a unique staking platform that makes pair trading both
              straightforward and enjoyable.
            </p>
            <a className="cta-button" href="/vaults">
              Enter App
            </a>
            <div className="mt-16 protocol-stat-box">
              <h1 className="text-3xl mb-4 text-blue-100">Protocol Stats</h1>
              <div className="flex items-center gap-12">
                <div>
                  <p>Revenue shared</p>
                  <p className="protocol-stat-value">$333,222</p>
                </div>
                <div>
                  <p>Number of epochs</p>
                  <p className="protocol-stat-value">444</p>
                </div>
                <div>
                  <p>Staked $ATLAS</p>
                  <p className="protocol-stat-value">777,777 (11%)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 2xl:w-1/3">
            <img src={scrollPepe} alt="" />
          </div>
        </div>
      </div>

      <section className="about-section" id="about">
        <div className="about-box">
          <div className="flex flex-col justify-center mr-8">
            <h1 className="text-5xl mb-2 text-shadow-home">
              Gamified Pair Trading
            </h1>
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
        <div className="about-box">
          <div className="w-full">
            <img src={comfyBedPepe} alt="" />
          </div>
          <div className="flex flex-col justify-center ml-8">
            <h1 className="text-5xl mb-2 text-shadow-home">Referral System</h1>
            <p>
              Get your personalized referral link from AtlasPairs once per epoch
              and share it with friends. When they use your link to stake in a
              pool, you'll earn 25% of the fees generated from their activity!
            </p>
          </div>
        </div>
        <div className="about-box">
          <div className="flex flex-col justify-center ml-8">
            <h1 className="text-5xl mb-2 text-shadow-home">Governance</h1>
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
          <h1 className="text-5xl mb-4 text-shadow-home">Tokenomics</h1>
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
      </section>
      <section className="roadmap-section" id="roadmap">
        <div className="w-full pb-[320px]">
          <h1 className="text-5xl pb-32 text-shadow-home">Roadmap</h1>
          <div className="relative w-full h-full flex flex-col justify-center items-center gap-16">
            <div className="roadmap-card rotate-6 absolute left-80 -top-4">
              <p className="text-2xl">NFT Mode:</p>
              <p>
                Introducing a new dimension to our platform, NFT Mode brings the
                same gamified staking mechanics to the world of NFTs. While the
                mechanics remain consistent, NFT Mode may have extended epoch
                times due to the lower volatility of non-fungible tokens.
              </p>
            </div>
            <div className="roadmap-card rotate-3 absolute right-96 top-32">
              <p className="text-2xl">Token Pools:</p>
              <p>
                We're expanding beyond individual tokens to offer Token Pools.
                These pools are not limited to random combinations; they can be
                curated based on narratives such as L1/L2, DeFi, Small caps, LSD
                (Low Supply Digital Assets), and more. Explore a diverse range
                of investment opportunities within these thematic pools.
              </p>
            </div>
            <div className="roadmap-card -rotate-6 absolute left-80 top-96">
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
          </div>
        </div>
        <div className="pb-96"></div>
      </section>
    </main>
  );
};

export default Home;
