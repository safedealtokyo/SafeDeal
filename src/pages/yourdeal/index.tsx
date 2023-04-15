/* eslint-disable react/jsx-one-expression-per-line */
import {
  Box,
  Heading
} from "@chakra-ui/react";

import Navbar from "@/components/Navbar";

export default function Protected() {
  return (
    <Box>
      <Navbar />
      <Heading>取引一覧ページ</Heading>
    </Box>
  );
}
