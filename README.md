# SafeDeal

## Overview

The world has been transitioning from BtoC to CtoC over time. With the advent of Web3, we can now see a new decentralized CtoC environment that does not require central authorities.

In the future of CtoC, mechanisms such as smart contracts can guarantee the safety and security that businesses have traditionally provided, making it possible to create a trustless and smooth world.

Our newly developed Safe Deal serves as a solution for CtoC transactions that require extensive communication and mutual understanding.

In CtoC transactions, the concerns of the requesting party and the receiving party differ. The requester cannot accurately assess the actual skill and track record of the worker. On the other hand, the worker is concerned about whether they will be adequately compensated and whether they are dealing with a trustworthy party.

In the past, businesses acted as intermediaries, providing guarantees for the identity and compensation of the parties involved. Safe Deal is a Web3 service that fulfills the role that businesses used to play.

## Architecture

![safe-deal-architector](/docs/image/safe-deal-architector.png)

The diagram above shows the technologies used in this project. Due to time constraints and technical limitations, not everything has been fully decentralized. However, we have tried to make the system as decentralized as possible by focusing on individual wallets in the world of Web3. Here are some examples of the services we utilize:

- Safe Protocol Kit
  Used to create multi-signature contract wallets.
  Guarantees the payment of rewards by depositing them from the requester at the beginning of the transaction.

- Push Protocol
  A push notification and chat service based on wallet addresses.
  Push notifications are used when there are changes in the work process.
  Chat is used for daily communication between clients and workers.

- Huddle01
  An online meeting service similar to Zoom.
  Used to facilitate smoother communication compared to text-only communication.
  Although wallet authentication can be used for token authentication, we do not use token authentication in this case, as it is only available on the mainnet.

- ThirdWeb
  Used for NFT contract generation and wallet authentication.

- Database
  Used to manage information that needs to be changed.

## Supported Use Cases

Safe Deal uses the architecture mentioned above to achieve the safety and security that were previously provided by centralized systems. Since it specializes in reward payments and individual (wallet) evaluations, it can be integrated into any type of transaction.

### Demo

Let's take a look at a simple demo.

First, both the client and the worker log in using wallet authentication. There is no distinction between the two during login, and either party can create a Deal.

In this demo, we will use two separate screens to demonstrate the client's and the worker's perspectives.

The process begins with the client registering a project. The client can input information such as the title, description, notes, deadline, and compensation. Although we have set the compensation to ETH for now, it might be better to adopt a chain with lower gas fees, such as Polygon, when considering transaction fees.

Once the client completes the project registration, the project can be viewed in the list of available projects.

The worker can browse through the project list and access the details of any project they find interesting.

If the worker is interested in taking on a particular project, they can contact the client.

Both chat and online meetings are available for communication, ensuring seamless interaction between the parties.

After sufficient communication and verification of each other's track records using SBT, the client can formally request the worker to undertake the task.

At the time of the request, the client deposits the compensation into a multi-signature wallet account managed by Safe. This multi-signature wallet has a 2-of-3 structure, comprising the client, worker, and Safe Deal addresses. Transactions are executed primarily based on the agreement between the client and the worker. However, Safe Deal's address is also specified for possible dispute resolution.

Upon receiving the request, the worker begins working on the task. During this time, chat and online calls remain available for use.

Once the work is complete, the worker submits a verification request to the client and proposes a withdrawal transaction to the multi-signature wallet.

The client then reviews the completed work based on the worker's notification. If the work meets the requirements, the client approves the verification. At this point, the deposited compensation in the multi-signature wallet account is paid to the worker.

Additionally, an SBT containing the client's project information is sent to the worker as a record of their accomplishment, serving as proof of their skills and experience.

By integrating Safe Deal into the transaction process, secure and worry-free transactions can be achieved.
