import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import {
  FaUserGraduate,
  FaChalkboardUser,
  FaBook,
  FaMoneyBillWave,
} from "react-icons/fa6";
const icons = {
  students: FaUserGraduate,
  teachers: FaChalkboardUser,
  courses: FaBook,
  revenue: FaMoneyBillWave,
};
export default function StatCard({ item }) {
  const Icon = icons[item.icon];
  return (
    <Box bg="white" p="5" rounded="xl" borderWidth="1px" shadow="sm">
      <Flex justify="space-between">
        <Box>
          <Text color="gray.500" fontSize="sm">
            {item.label}
          </Text>
          <Text mt="2" fontSize="2xl" fontWeight="800">
            {item.value}
          </Text>
          <Text mt="2" color="green.600" fontSize="sm">
            {item.change} from last month
          </Text>
        </Box>
        <Box p="3" bg="blue.50" color="blue.600" rounded="lg">
          <Icon />
        </Box>
      </Flex>
    </Box>
  );
}
