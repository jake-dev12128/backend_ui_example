import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGraduationCap } from "react-icons/fa6";

export default function Sidebar({ role, config, activeMenu, onNavigate }) {
  return (
    <Box
      className="desktop-sidebar"
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      w="260px"
      bg="white"
      borderRightWidth="1px"
      zIndex="20"
    >
      <Flex h="72px" align="center" px="5" borderBottomWidth="1px">
        <HStack>
          <Box bg="blue.600" color="white" p="2" rounded="lg">
            <FaGraduationCap />
          </Box>
          <Box>
            <Text fontWeight="800">ACC Computer College</Text>
            <Text fontSize="xs" color="gray.500">
              Management System
            </Text>
          </Box>
        </HStack>
      </Flex>
      <Box px="3" py="4">
        <Text px="3" mb="2" fontSize="xs" fontWeight="700" color="gray.500">
          {config.label.toUpperCase()}
        </Text>
        <VStack align="stretch" gap="1">
          {config.menus.map(([label, Icon]) => (
            <Button
              key={label}
              justifyContent="flex-start"
              variant={activeMenu === label ? "subtle" : "ghost"}
              colorPalette={activeMenu === label ? config.colorPalette : "gray"}
              onClick={() => onNavigate(label)}
            >
              <Icon />
              <Text>{label}</Text>
            </Button>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
