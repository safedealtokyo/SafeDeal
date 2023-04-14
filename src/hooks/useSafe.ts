/* eslint-disable consistent-return */
import SafeApiKit from "@safe-global/api-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import ethers from "ethers";

const useSafe = () => {
  const address = useAddress();
  const signer = useSigner();

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
  return {
    fetchSafeSDK,
  };
};

export default useSafe;
