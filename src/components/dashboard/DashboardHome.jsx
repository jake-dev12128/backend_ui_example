import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import StatCard from "./StatCard";
export default function DashboardHome({ data }) {
  return (
    <VStack align="stretch" gap="6">
      <Box>
        <Text fontSize="2xl" fontWeight="800">
          Dashboard
        </Text>
        <Text color="gray.500">
          Example production-style college overview with mock data.
        </Text>
      </Box>
      <Grid className="stat-grid" templateColumns="repeat(4,1fr)" gap="4">
        {data.stats.map((x) => (
          <StatCard key={x.label} item={x} />
        ))}
      </Grid>
      <Grid templateColumns={{ base: "1fr", lg: "1.4fr 1fr" }} gap="4">
        <Box bg="white" p="5" rounded="xl" borderWidth="1px">
          <Text fontWeight="700" mb="5">
            Weekly Attendance
          </Text>
          <VStack align="stretch" gap="4">
            {data.attendance.map((x) => (
              <HStack key={x.day}>
                <Text w="40px" fontSize="sm">
                  {x.day}
                </Text>
                <Box flex="1" h="10px" bg="gray.100" rounded="full">
                  <Box
                    h="10px"
                    w={`${x.value}%`}
                    bg="blue.500"
                    rounded="full"
                  />
                </Box>
                <Text w="45px" textAlign="right" fontSize="sm">
                  {x.value}%
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
        <Box bg="white" p="5" rounded="xl" borderWidth="1px">
          <Text fontWeight="700" mb="4">
            Upcoming Classes
          </Text>
          <VStack align="stretch" gap="3">
            {data.upcoming.map((x) => (
              <Box key={x} p="3" bg="gray.50" rounded="lg">
                <Text fontSize="sm">{x}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Grid>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="4">
        <Box bg="white" p="5" rounded="xl" borderWidth="1px">
          <Text fontWeight="700" mb="4">
            Recent Activity
          </Text>
          <VStack align="stretch" gap="3">
            {data.activities.map((x, i) => (
              <HStack key={i} align="start">
                <Box w="8px" h="8px" rounded="full" bg="blue.500" mt="1" />
                <Text fontSize="sm">{x}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>
        <Box bg="white" p="5" rounded="xl" borderWidth="1px">
          <Text fontWeight="700" mb="4">
            Architecture
          </Text>
          <Text fontSize="sm" color="gray.600" lineHeight="1.8">
            UI → React state → API wrapper → Express controller → service →
            MongoDB. This ZIP keeps CRUD frontend-only so you can connect your
            existing backend later.
          </Text>
        </Box>
      </Grid>
    </VStack>
  );
}
