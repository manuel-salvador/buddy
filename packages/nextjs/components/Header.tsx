"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IProvider } from "@web3auth/base";
import viemRPC from "~~/lib/viemRPC";
import { web3auth } from "~~/lib/web3auth";
import { cn } from "~~/utils";

function Header() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  // Check the RPC file for the implementation
  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const address = await viemRPC.getAccounts(provider);
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const balance = await viemRPC.getBalance(provider);
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const signedMessage = await viemRPC.signMessage(provider);
    uiConsole(signedMessage);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    uiConsole("Sending Transaction...");
    const transactionReceipt = await viemRPC.sendTransaction(provider);
    uiConsole(transactionReceipt);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  const pathname = usePathname();
  if (pathname === "/debug") return null;

  const loggedInView = (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
          Mi cuenta
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={getUserInfo}>Get User Info</DropdownMenuItem>
          <DropdownMenuItem onClick={getAccounts} className="card">
            Get Accounts
          </DropdownMenuItem>
          <DropdownMenuItem onClick={getBalance} className="card">
            Get Balance
          </DropdownMenuItem>
          <DropdownMenuItem onClick={signMessage} className="card">
            Sign Message
          </DropdownMenuItem>
          <DropdownMenuItem onClick={sendTransaction} className="card">
            Send Transaction
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout} className="card">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  const unloggedInView = <Button onClick={login}>Login</Button>;

  return (
    <>
      <header className="container flex justify-between py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">Budy</h1>
        </Link>
        <div>{loggedIn ? loggedInView : unloggedInView}</div>
      </header>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );
}

export default Header;
