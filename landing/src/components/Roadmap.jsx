import React from "react";

const Roadmap = () => {
  return (
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
              broader range of tokens, including popular choices like $BITCOIN,
              $MOG, and other community favorites. Our expansion depends on the
              availability of sufficient token liquidity to prevent manipulation
              and the accessibility of reliable oracle services.
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
  );
};

export default Roadmap;
