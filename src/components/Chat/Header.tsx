import {
  Flex,
  Text,
  Button,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { Deal, Worker } from "@prisma/client";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const address = useAddress();
  const [startHuddle, setStartHuddle] = useState<boolean>();
  const { pushTarget } = usePush();
  const handleStartHuddle = async () => {
    setStartHuddle(true);
    onOpen();
    pushTarget("Start Huddle", "Let's Start Huddle", deal.ownerAddress);
  };

  if (!name) {
    return <></>;
  }
  return (
    <HStack w="100%" justifyContent="space-between">
      <>
        <HStack>
          <Jazzicon diameter={30} seed={jsNumberForAddress(name)} />
          <Flex flexDirection="column" mx="5" justify="center">
            <Text fontSize="lg" fontWeight="bold">
              {addressFormat(name)}
            </Text>
            <Text fontSize="xs" fontWeight="semibold">
              {deal.title}
            </Text>
            <Text fontSize="xs" fontWeight="semibold">
              {deal.fixedFee}
              {" "}
              ETH
            </Text>
          </Flex>
        </HStack>
        <Button colorScheme="messenger" onClick={handleStartHuddle}>
          Start Huddle
        </Button>
      </>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent w="100%">
          <ModalHeader>Huddle</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%">
            {startHuddle && deal.workers && address && (
              <Huddle
                roomId={
                  deal.workers.filter((worker) => (
                    deal.ownerAddress.toLowerCase() === address.toLowerCase() // Client判定
                      ? worker.walletAddress.toLowerCase() ===
                        (router.query.workerAddress as string).toLowerCase()
                      : worker.walletAddress.toLowerCase() ===
                        address.toLowerCase()))[0].roomId
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
