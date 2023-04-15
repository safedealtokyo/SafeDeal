/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  Flex,
  Avatar,
  Text,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Deal, Worker } from "@prisma/client";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

import usePush from "@/hooks/usePush";
import { addressFormat } from "@/utils/format";

import { Huddle } from "../Huddle";

type Props = {
  deal: Deal & {
    workers: Worker[];
  };
  name: string;
};
function Header({ deal, name }: Props) {
  // const [worker, setWorker] = useState<Worker>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const address = useAddress();
  const [startHuddle, setStartHuddle] = useState<boolean>();
  const { pushTarget } = usePush();
  const handleStartHuddle = async () => {
    // const res = await axios.get(
    //   `/api/deal/workers?dealId=${router.query.dealId}&walletAddress=${address}`
    // );
    // setWorker(res.data);
    setStartHuddle(true);
    onOpen();
    pushTarget("Start Huddle", "Let's Start Huddle", deal.ownerAddress);
  };

  if (!name) {
    return <></>;
  }
  return (
    <HStack w="100%" justifyContent="space-between">
      {/* {startHuddle && deal.workers ? (
        <Huddle
          roomId={
            deal.workers.filter((worker) => worker.walletAddress === address)[0]
              .roomId
          }
        />
      ) : ( */}
      <>
        <HStack>
          <Avatar
            size="lg"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <Flex flexDirection="column" mx="5" justify="center">
            <Text fontSize="lg" fontWeight="bold">
              {addressFormat(name)}
            </Text>
            <Text fontSize="xs" fontWeight="semibold">
              {deal.title}
            </Text>
            <Text fontSize="xs" fontWeight="semibold">
              {deal.fixedFee} ETH
            </Text>
          </Flex>
        </HStack>
        <Button colorScheme="messenger" onClick={handleStartHuddle}>
          Start Huddle
        </Button>
      </>
      {/* )} */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Huddle</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {startHuddle && deal.workers && address && (
              <Huddle
                roomId={
                  deal.workers.filter((worker) =>
                    deal.ownerAddress.toLowerCase() === address.toLowerCase() // Client判定
                      ? worker.walletAddress.toLowerCase() ===
                        (router.query.workerAddress as string).toLowerCase()
                      : worker.walletAddress.toLowerCase() ===
                        address.toLowerCase()
                  )[0].roomId
                }
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
}

export default Header;
