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

type Props = {
  address: string;
};

export default function WEB3LogoutButton({ address }: Props) {
  const disconnect = useDisconnect();
  const image = "";
  console.log(address);
  const truncatedAddress = `${address?.slice(0, 5)}...${address?.slice(-3)}`;
  const handleLogout = async () => {
    try {
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
        display={{ md: "inline-flex" }}
        fontSize="sm"
        fontWeight={600}
      >
        <HStack>
          <Avatar size="sm" src={image} />
          <Text display={{ sm: "none", md: "inline" }}>{truncatedAddress}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
