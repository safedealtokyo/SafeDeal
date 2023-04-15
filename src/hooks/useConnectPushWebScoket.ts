/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
/* eslint-disable no-promise-executor-return */
import { useAddress } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import { useEffect } from "react";

import { useSDKSocket } from "./useSDKSocket";

const useConnectPushWebScoket = () => {
  const address = useAddress();
  const socketData = useSDKSocket({
    account: address,
    chainId: ChainId.Goerli,
    env: "staging",
    isCAIP: false,
  });
  function sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  useEffect(() => {
    const connectSocket = async () => {
      console.log(
        "socketData",
        socketData.pushSDKSocket?.connected,
        socketData.isSDKSocketConnected
      );
      if (
        socketData &&
        socketData.pushSDKSocket &&
        !socketData.pushSDKSocket?.connected
      ) {
        console.log("connect");
        socketData.pushSDKSocket?.connect();
        await sleep(1000);
      }
    };
    connectSocket();
  }, [socketData]);

  return {
    socketData,
  };
};

export default useConnectPushWebScoket;
