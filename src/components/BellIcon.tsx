/* eslint-disable react/no-array-index-key */
import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

import useConnectPushWebScoket from "@/hooks/useConnectPushWebScoket";
import usePush from "@/hooks/usePush";

type Notify = {
  app: string;
  blockchain: string;
  cta: string;
  icon: string;
  image: string;
  message: string;
  title: string;
};
export function Bell() {
  const address = useAddress();
  const [notifies, setNotifies] = useState<Notify[]>([]);
  const { fetchNotification } = usePush();
  const { notifyList } = useConnectPushWebScoket();
  useEffect(() => {
    const fetchnot = async () => {
      if (address) {
        const res = await fetchNotification();
        setNotifies(res.message);
      }
    };
    fetchnot();
  }, [address]);

  return (
    <>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <BellIcon boxSize="5" />
        </PopoverTrigger>
        <PopoverContent zIndex="banner" bgColor="white">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Notification</PopoverHeader>
          <PopoverBody>
            {notifies.length > 0 ? (
              <VStack divider={<Divider />} alignItems="flex-start" py="10px">
                {notifies.map((notify, index) => (
                  <Box key={`${notify.title}${notify.message}${index}`}>
                    <Text fontWeight="semibold">{notify.title}</Text>
                    <Text fontSize="xs">{notify.message}</Text>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text>Nothing to notify</Text>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {/* {notifyList.length > 0 && <Box bgColor="red" borderRadius="full" />} */}
    </>
  );
}
