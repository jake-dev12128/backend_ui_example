import { Flex, HStack, IconButton, Input, Text } from "@chakra-ui/react";
import { FaBars, FaBell } from "react-icons/fa6";
export default function Header({ onOpenSidebar, roleLabel }) {
  return (
    <Flex
      className="topbar"
      position="fixed"
      left="260px"
      right="0"
      top="0"
      h="72px"
      bg="white"
      borderBottomWidth="1px"
      px={{ base: 3, md: 6 }}
      align="center"
      justify="space-between"
      zIndex="10"
    >
      <HStack gap="3">
        <IconButton
          className="mobile-menu"
          aria-label="Open menu"
          variant="ghost"
          onClick={onOpenSidebar}
        >
          <FaBars />
        </IconButton>
        <Input
          display={{ base: "none", md: "block" }}
          w="300px"
          placeholder="Search..."
          bg="gray.50"
        />
        <Text fontWeight="700">{roleLabel}</Text>
      </HStack>
      <HStack>
        <IconButton aria-label="Notifications" variant="ghost">
          <FaBell />
        </IconButton>
      </HStack>
    </Flex>
  );
}
