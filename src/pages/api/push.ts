/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST": {
      const { title, message, kind } = req.body;
      const Pkey = process.env.PUSH_PRIVATE_KEY || "";
      const _signer = new ethers.Wallet(Pkey);
      switch (kind) {
        case "broadcast": {
          sendBroadcast(title as string, message as string, _signer);
          return res.status(200).json({ status: "Success" });
        }
        case "subset": {
          const { recipients } = req.body;
          console.log("recipients", recipients);
          sendSubset(title as string, message as string, recipients, _signer);
          return res.status(200).json({ status: "Success" });
        }
        case "target": {
          const { recipient } = req.body;
          console.log("recipient", recipient);
          sendTarget(title as string, message as string, recipient, _signer);
          return res.status(200).json({ status: "Success" });
        }
      }
    }
    case "GET": {
      const { address } = req.query;
      const notifications = await PushAPI.user.getFeeds({
        user: `eip155:5:${address}`, // user address in CAIP
        raw: true,
        // @ts-ignore
        env: "staging"
      });
      const parsedResults = PushAPI.utils.parseApiResponse(notifications);
      console.log(parsedResults);
      return res
        .status(200)
        .json({ status: "Success", message: parsedResults });
    }
  }
}

const sendBroadcast = async (
  title: string,
  message: string,
  _signer: ethers.Signer
) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 1,
      identityType: 2,
      notification: {
        title: "Safe Deal Notify",
        body: "Safe Deal Notify Body"
      },
      payload: {
        title: title as string,
        body: message as string,
        cta: "",
        img: ""
      },
      channel: `eip155:5:${process.env.NEXT_PUBLIC_PUSH_CHANNEL}`,
      // @ts-ignore
      env: "staging"
    });
  } catch (err) {
    console.error("Error: ", err);
  }
};

// Not working
const sendSubset = async (
  title: string,
  message: string,
  recipients: string[],
  _signer: ethers.Signer
) => {
  try {
    const recips = recipients.map((recipient) => `eip155:5:${recipient}`);
    console.log("recips", recips);
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 4, // subset
      identityType: 2, // direct payload
      notification: {
        title: "Safe Deal Notify",
        body: "Safe Deal Notify Body"
      },
      payload: {
        title: title as string,
        body: message as string,
        cta: "",
        img: ""
      },
      recipients: recips, // recipients addresses
      channel: `eip155:5:${process.env.NEXT_PUBLIC_PUSH_CHANNEL}`, // your channel address
      // @ts-ignore
      env: "staging"
    });
  } catch (err) {
    console.error("Error: ", err);
  }
};

const sendTarget = async (
  title: string,
  message: string,
  recipient: string,
  _signer: ethers.Signer
) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: "Safe Deal Notify",
        body: "Safe Deal Notify Body"
      },
      payload: {
        title: title as string,
        body: message as string,
        cta: "",
        img: ""
      },
      recipients: `eip155:5:${recipient}`, // recipients addresses
      channel: `eip155:5:${process.env.NEXT_PUBLIC_PUSH_CHANNEL}`, // your channel address
      // @ts-ignore
      env: "staging"
    });
  } catch (err) {
    console.error("Error: ", err);
  }
};
