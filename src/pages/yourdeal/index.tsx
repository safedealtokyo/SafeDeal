/* eslint-disable react/jsx-one-expression-per-line */
import {
  Box,
  Heading
} from "@chakra-ui/react";

import Navbar from "@/components/Navbar";
import { SectionHeader } from "@/components/SectionHeader";

export default function Protected() {
  return (
    <Box>
      <Navbar />
      <SectionHeader />
    </Box>
  );
}
