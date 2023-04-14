/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import SafeApiKit from "@safe-global/api-kit";
import Safe, { EthersAdapter, SafeAccountConfig, SafeFactory } from "@safe-global/protocol-kit";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import ethers from "ethers";

const useSafe = () => {
  const address = useAddress();
  const signer = useSigner();

  // Base hooks
  const fetchSafeService = () => {
    if (signer) {
      const ethAdapterOwner1 = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });
      const txServiceUrl = "https://safe-transaction-goerli.safe.global";
      const safeService = new SafeApiKit({
        txServiceUrl,
        ethAdapter: ethAdapterOwner1,
      });
      return safeService;
    }
  };
  const fetchSafe = async () => {
    const safeService = fetchSafeService();
    if (address && safeService) {
      const safe = await safeService.getSafesByOwner(address);
      return safe.safes[0];
    }
  };
  const fetchSafeSDK = async () => {
    if (signer) {
      const ethAdapterOwner1 = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });
      const safeAddress = await fetchSafe();
      const safeSdk = await Safe.create({
        ethAdapter: ethAdapterOwner1,
        safeAddress: safeAddress!,
      });
      return safeSdk;
    }
  };

  // Create safe multisig contract for deposit.
  const deploySafe = async (workerAddress: string) => {
    if (signer) {
      const ethAdapterOwner1 = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });

      //   Initialize the Protcol Kit
      const safeFactory = await SafeFactory.create({
        ethAdapter: ethAdapterOwner1,
      });

      // Set Owners
      const safeAccountConfig: SafeAccountConfig = {
        owners: [
          address as string,
          workerAddress,
          process.env.NEXT_PUBLIC_OWNER_ADDRESS!, // Owner Address
        ],
        threshold: 2,
      };
      const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig });

      const safeAddress = safeSdkOwner1.getAddress();
      console.log("Your Safe has been deployed:");
      console.log(`https://goerli.etherscan.io/address/${safeAddress}`);
      console.log(`https://app.safe.global/gor:${safeAddress}`);
      // sendEthToSafe(safeAddress)
    } else {
      alert("Wallet not connected");
    }
  };

  const proposeTransaction = async (destinationAddress: string, withdrawAmount: string) => {
    // Any address can be used. In this example you will use vitalik.eth
    const destination = destinationAddress;
    const amount = ethers.utils.parseUnits(withdrawAmount, "ether").toString();
    const safeService = fetchSafeService();
    const safeSdk = await fetchSafeSDK();
    const safeTransactionData: SafeTransactionDataPartial = {
      to: destination,
      data: "0x",
      value: amount,
    };

    if (signer && address && safeService && safeSdk) {
      // Create a Safe transaction with the provided parameters
      const safeTransaction = await safeSdk.createTransaction({
        safeTransactionData,
      });

      // Deterministic hash based on transaction parameters
      const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);

      // Sign transaction to verify that the transaction is coming from owner 1
      const senderSignature = await safeSdk.signTransactionHash(safeTxHash);
      const safeAddress = await fetchSafe();
      await safeService.proposeTransaction({
        safeAddress: safeAddress!,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress: address,
        senderSignature: senderSignature.data,
      });
    }
  };
  return {
    deploySafe,
    proposeTransaction,
  };
};

export default useSafe;
