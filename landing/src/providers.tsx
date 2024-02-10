import { useState, useEffect, ReactNode } from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { arbitrum } from "wagmi/chains";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrum],
  [publicProvider()]
);

const projectId = "53be4c6a05073d0d1ade22253d581c47";

const { wallets } = getDefaultWallets({
  appName: "AtlasPairs - Gamified Pair Trading on Arbitrum",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "AtlasPairs - Gamified Pair Trading on Arbitrum",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
