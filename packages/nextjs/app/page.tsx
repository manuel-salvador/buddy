"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
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
    const getAddress = async () => {
      if (!web3auth.provider) return;

      const addresses = await viemRPC.getAccounts(web3auth.provider);

      if (!addresses || addresses.length === 0) return;

      setAddress(addresses[0]);
    };

    getAddress();
  }, []);

  const retrieveSharedData = async () => {
    if (!address) return;
    const data = await secretSharing?.read.retrieveShare([address]);
    console.log(data);
  };

  return (
    <div>
      <Button onClick={retrieveSharedData}>Retrieve Shared Data</Button>
    </div>
  );
};

export default Home;
