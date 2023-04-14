import {
  Button,
  Avatar,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  HStack
} from "@chakra-ui/react";
import { useDisconnect } from "@thirdweb-dev/react";
import { signOut } from "next-auth/react";

import { UserSession } from "@/types/UserSession";

type Props = {
  session: UserSession;
};

export default function WEB3LogoutButton({ session }: Props) {
  const disconnect = useDisconnect();
  const image = session?.user?.image || "";
  const address = session?.address;
  console.log(address);
  const truncatedAddress = `${address?.slice(0, 3)}...${address?.slice(-3)}`;
  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      await disconnect();
    } catch (error) {
      console.log(error);
      window.alert("error");
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="white"
        display={{ base: "none", md: "inline-flex" }}
        fontSize="sm"
        fontWeight={600}
      >
        <HStack>
          <Avatar size="sm" src={image} />
          <Text>{truncatedAddress}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem>Link 1</MenuItem>
        <MenuItem>Link 2</MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={handleLogout}
          _hover={{
            bg: "pink.300"
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
