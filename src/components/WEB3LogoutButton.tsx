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

import useProtected from "@/hooks/useProtected";
import { UserSession } from "@/types/UserSession";

type Props = {
  session: UserSession;
};

export default function WEB3LogoutButton({ session }: Props) {
  const handleLogout = useProtected();
  const image = session?.user?.image || "";
  const address = session?.address;
  const truncatedAddress = `${address?.slice(0, 3)}...${address?.slice(-3)}`;

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
