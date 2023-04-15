/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
/* eslint-disable no-promise-executor-return */
import * as PushAPI from "@pushprotocol/restapi";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { useSDKSocket } from "./useSDKSocket";

const usePush = () => {
  const address = useAddress();
  const signer = useSigner();
  const [isOptIn, setIsOptIn] = useState<boolean>(false);
  const socketData = useSDKSocket({
    account: address,
    chainId: ChainId.Goerli,
    env: "staging",
    isCAIP: false,
  });
  function sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
  const pushBroadcast = async (title: string, message: string) => {
    const res = await axios.post("/api/push", {
      title,
      message,
      kind: "broadcast",
    });
  };
  const pushTarget = async (
    title: string,
    message: string,
    targetAddress: string
  ) => {
    const res = await axios.post("/api/push", {
      title,
      message,
      kind: "target",
      recipient: targetAddress,
    });
  };

  const fetchNotification = async () => {
    const res = await axios.get(`/api/push?address=${address}`);
    return res.data;
  };

  const handleOptIn = async () => {
    if (signer) {
      await PushAPI.channels.subscribe({
        signer: signer as PushAPI.SignerType,
        channelAddress: `eip155:${ChainId.Goerli}:${process.env.NEXT_PUBLIC_PUSH_CHANNEL}`, // channel address in CAIP
        userAddress: `eip155:${ChainId.Goerli}:${address}`, // user address in CAIP
        onSuccess: () => {
          console.log("opt in success");
        },
        onError: () => {
          console.error("opt in error");
        },
        // @ts-ignore
        env: "staging",
      });
    }
  };

  const handleOptOut = async () => {
    if (signer) {
      await PushAPI.channels.unsubscribe({
        signer: signer as PushAPI.SignerType,
        channelAddress: `eip155:${ChainId.Goerli}:${process.env.NEXT_PUBLIC_PUSH_CHANNEL}`, // channel address in CAIP
        userAddress: `eip155:${ChainId.Goerli}:${address}`, // user address in CAIP
        onSuccess: () => {
          console.log("opt out success");
        },
        onError: () => {
          console.error("opt out error");
        },
        // @ts-ignore
        env: "staging",
      });
    }
  };

  const checkOptIn = useCallback(async () => {
    if (address) {
      const subscriptions: any[] = await PushAPI.user.getSubscriptions({
        user: `eip155:${ChainId.Goerli}:${address}`, // user address in CAIP
        // @ts-ignore
        env: "staging",
      });
      console.log(subscriptions);
      const filterdList = subscriptions.filter(
        (subscription) =>
          subscription.channel.toLowerCase() ===
          (process.env.NEXT_PUBLIC_PUSH_CHANNEL as string).toLowerCase()
      );
      return filterdList.length > 0;
    }
    return false;
  }, []);

  // useEffect(() => {
  //   const connectSocket = async () => {
  //     console.log(
  //       "socketData",
  //       socketData.pushSDKSocket?.connected,
  //       socketData.isSDKSocketConnected
  //     );
  //     if (
  //       socketData &&
  //       socketData.pushSDKSocket &&
  //       !socketData.pushSDKSocket?.connected
  //     ) {
  //       console.log("connect");
  //       socketData.pushSDKSocket?.connect();
  //       await sleep(1000);
  //     }
  //   };
  //   connectSocket();
  // }, [socketData]);

  useEffect(() => {
    const check = async () => {
      const res = await checkOptIn();
      setIsOptIn(res);
    };
    check();
  }, [checkOptIn]);

  return {
    socketData,
    isOptIn,
    handleOptIn,
    handleOptOut,
    fetchNotification,
    pushBroadcast,
    pushTarget,
  };
};

export default usePush;
