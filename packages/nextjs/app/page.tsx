"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Landing } from "~~/components/component/landing";
import { Button } from "~~/components/ui/button";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import viemRPC from "~~/lib/viemRPC";
import { web3auth } from "~~/lib/web3auth";

const Home: NextPage = () => {
  const [address, setAddress] = useState<string | null>(null);

  const { data: secretSharing } = useScaffoldContract({
    contractName: "SecretSharing",
  });

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        const provider = web3auth.provider;

        if (!provider) {
          return;
        }
        const addresses = await viemRPC.getAccounts(provider);
        if (addresses.length > 0) {
          setAddress(addresses[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  return <Landing />;

  const retrieveSharedData = async () => {
    if (!address) return;
    const data = await secretSharing?.read.retrieveShare([address]);
    console.log({ data });
  };

  return (
    <div>
      <Button onClick={retrieveSharedData}>Retrieve Shared Data</Button>
    </div>
  );
};

export default Home;
