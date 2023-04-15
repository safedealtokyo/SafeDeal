/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
/* eslint-disable no-promise-executor-return */
import { useAddress } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";

import { Message } from "@/components/Chat/Messages";

import { useSDKSocket } from "./useSDKSocket";
import { useToaster } from "./useToaster";

const useConnectPushWebScoket = () => {
  const [notifyList, setNotifyList] = useState<Message[]>([]);
  const { infoToast } = useToaster();
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

  // メッセージの更新取得と通知
  useEffect(() => {
    if (socketData.feedsSinceLastConnection[0]) {
      const last = socketData.feedsSinceLastConnection.length - 1;
      console.log(
        "feed",
        socketData.feedsSinceLastConnection[last].payload.data.amsg
      );
      setNotifyList((old: Message[]) => [
        ...old,
        {
          text: socketData.feedsSinceLastConnection[last].payload.amsg,
          from: socketData.feedsSinceLastConnection[last].payload.asub,
          timestamp: socketData.feedsSinceLastConnection[last].payload.epoch,
        },
      ]);
      // setNotifyList((old) => [
      //   ...old,
      //   {
      //     title: socketData.feedsSinceLastConnection[last].payload.asub,
      //     message: socketData.feedsSinceLastConnection[last].payload.amsg,
      //     timestamp: socketData.feedsSinceLastConnection[last].payload.epoch,
      //   },
      // ]);
      console.log("notify", socketData.feedsSinceLastConnection[last].payload);
      infoToast(socketData.feedsSinceLastConnection[last].payload.data.amsg);
    }
  }, [socketData.feedsSinceLastConnection]);

  return {
    socketData,
    notifyList,
  };
};

export default useConnectPushWebScoket;
