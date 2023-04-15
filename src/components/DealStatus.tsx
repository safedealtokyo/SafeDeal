/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/function-component-definition */

import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { Deal, Worker } from "@prisma/client";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import usePush from "@/hooks/usePush";
import useSafe from "@/hooks/useSafe";

import MintButtonFromWallet from "./MintButtonFromWallet";

type Props = {
  deal: Deal & {
    workers: Worker[];
  };
};
const DealStatus: React.FC<Props> = ({ deal }) => {
  const router = useRouter();
  const address = useAddress();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sumbitMessage, setSubmitMessage] = useState<string>();
  const [proposed, setProposed] = useState<boolean>(false);
  const [hasSBT, setHasSBT] = useState<boolean>(false);
  const contract = useContract(deal.contractAddress, "nft-collection");

  useEffect(() => {
    const checkHas = async () => {
      if (address) {
        const balance = await contract.contract?.balanceOf(address);
        if (balance) {
          setHasSBT(true);
        }
      }
    };
    checkHas();
  }, [address]);

  const {
    deploySafe,
    proposeTransaction,
    fetchPendingTransactionHash,
    isLoading,
  } = useSafe();
  const { pushTarget } = usePush();

  useEffect(() => {
    const checkPropose = async () => {
      const result = await fetchPendingTransactionHash(
        deal.multiSigAddress as string
      );
      console.log("fetchPendingTransactionHash", result);
      if (result) {
        setProposed(true);
      }
    };
    checkPropose();
  }, []);
  // Client
  if (deal.ownerAddress === address) {
    return (
      <>
        {deal.multiSigAddress ? (
          <VStack w="100%">
            <Button width="full" colorScheme="cyan">
              Deal Processing
            </Button>
            {proposed ? (
              <HStack width="full" justifyContent="space-around">
                <Button colorScheme="yellow" width="full" onClick={onOpen}>
                  Good JOB
                </Button>
                <Button colorScheme="red" width="full">
                  Bad Boy
                </Button>
              </HStack>
            ) : (
              <></>
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Good Job Feedback</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Textarea
                    placeholder="write your job results"
                    onChange={(e) => setSubmitMessage(e.target.value)}
                  />
                </ModalBody>

                <ModalFooter width="100%">
                  <Center width="100%">
                    <MintButtonFromWallet deal={deal} onClose={onClose} />
                  </Center>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </VStack>
        ) : (
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            colorScheme="blue"
            width="full"
            onClick={async () => {
              console.log(
                "router.query.workerAddress",
                router.query.workerAddress,
                deal.fixedFee
              );
              await deploySafe(
                router.query.dealId as string,
                router.query.workerAddress as string,
                deal.fixedFee
              );
            }}
          >
            Apply Deal
          </Button>
        )}
      </>
    );
  }
  return (
    // Worker
    <Center w="100%">
      {deal.multiSigAddress ? (
        // 案件成立済み
        hasSBT ? (
          // 取引完了
          <Button width="full" bgColor="black" color="white">
            Finished your perfect JOB
          </Button>
        ) : proposed ? ( // 引き出し申請（仕事の成果を提出した状態）
          <Button width="full" bgColor="black" color="white">
            Wait Client Approval
          </Button>
        ) : (
          // Proceccing
          <VStack w="100%">
            <Button width="full" colorScheme="cyan" onClick={onOpen}>
              Submit Your JOB
            </Button>
          </VStack>
        )
      ) : (
        // Workerからは申請できない
        <></>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit Your JOB</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="write your job results"
              onChange={(e) => setSubmitMessage(e.target.value)}
            />
          </ModalBody>

          <ModalFooter width="100%">
            <Center width="100%">
              <Button
                isLoading={isLoading}
                isDisabled={isLoading || !sumbitMessage}
                colorScheme="blue"
                mr={3}
                onClick={async () => {
                  await proposeTransaction(deal.multiSigAddress as string);
                  await pushTarget(
                    "Submit",
                    sumbitMessage as string,
                    deal.ownerAddress
                  );
                  onClose();
                }}
                width="full"
              >
                Submit
              </Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default DealStatus;
