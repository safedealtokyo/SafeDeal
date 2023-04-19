import {
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useDisconnect } from "@thirdweb-dev/react";
import React from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type Props = {
  address: string;
};

export default function WEB3LogoutButton({ address }: Props) {
  const disconnect = useDisconnect();
  const truncatedAddress = `${address?.slice(0, 5)}...${address?.slice(-3)}`;
  const handleLogout = async () => {
    try {
      await disconnect();
    } catch (error) {
      window.alert("error");
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="white"
        display={{ md: "inline-flex" }}
        fontSize="sm"
        fontWeight={600}
      >
        <HStack>
          <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
          <Text display={{ sm: "none", md: "inline" }}>{truncatedAddress}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
