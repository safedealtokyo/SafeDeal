import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text
} from "@chakra-ui/react";

export function SectionHeader() {
  return (
    <Box as="section">
      <Container>
        <Stack spacing="5">
          <Stack spacing="4" direction={{ base: "column", sm: "row" }} justify="space-between">
            <Box>
              <Text fontSize="lg" fontWeight="medium">
                Member overview
              </Text>
              <Text color="muted" fontSize="sm">
                All registered users in the overview
              </Text>
            </Box>
            <Stack direction="row">
              <Button colorScheme="teal">Edit</Button>
            </Stack>
          </Stack>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Admins</Tab>
              <Tab>Moderators</Tab>
              <Tab>Users</Tab>
              <Tab>Invitations</Tab>
            </TabList>
          </Tabs>
        </Stack>
      </Container>
    </Box>
  );
}
