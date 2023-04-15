import { BellIcon } from "@chakra-ui/icons";

import useConnectPushWebScoket from "@/hooks/useConnectPushWebScoket";

export function Bell() {
  useConnectPushWebScoket();
  return <BellIcon boxSize="5" />;
}
