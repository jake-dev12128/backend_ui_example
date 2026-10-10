import { useState } from "react";
import { Box, HStack, Switch, Table, Text, VStack } from "@chakra-ui/react";
import { permissionActions, modules } from "../../data/mockData";

const labels = {
  dashboard: "Dashboard",
  students: "Students",
  teachers: "Teachers",
  courses: "Courses",
  classes: "Classes",
  attendance: "Attendance",
  exams: "Exams",
  results: "Results",
  payments: "Payments",
  invoices: "Invoices",
  announcements: "Announcements",
  staff: "Staff",
  registrations: "Registrations",
  academicReports: "Academic Reports",
  news: "News",
  courseContent: "Course Content",
  media: "Media",
  documents: "Documents",
  courseMaterials: "Course Materials",
  securityLogs: "Security Logs",
  rolesPermissions: "Roles & Permissions",
  settings: "Settings",
};

export default function PermissionsPage({
  roleConfig,
  rolePermissions,
  setRolePermissions,
}) {
  const [selectedRole, setSelectedRole] = useState("superAdmin");
  const update = (module, action, value) =>
    setRolePermissions((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [module]: { ...prev[selectedRole][module], [action]: value },
      },
    }));
  return (
    <VStack align="stretch" gap="5">
      <Box>
        <Text fontSize="2xl" fontWeight="800">
          Roles & Permissions
        </Text>
        <Text color="gray.500">
          Prototype RBAC matrix. Later, these permissions should be loaded from
          your Express API and enforced again on the backend.
        </Text>
      </Box>
      <HStack gap="2" wrap="wrap">
        {Object.entries(roleConfig).map(([key, role]) => (
          <button
            key={key}
            className={`role-chip ${selectedRole === key ? "active" : ""}`}
            onClick={() => setSelectedRole(key)}
          >
            {role.label}
          </button>
        ))}
      </HStack>
      <Box bg="white" rounded="xl" borderWidth="1px" overflow="hidden">
        <Box className="table-wrap">
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Module</Table.ColumnHeader>
                {permissionActions.map((action) => (
                  <Table.ColumnHeader key={action}>{action}</Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {modules.map((module) => (
                <Table.Row key={module}>
                  <Table.Cell fontWeight="700">{labels[module]}</Table.Cell>
                  {permissionActions.map((action) => (
                    <Table.Cell key={action}>
                      <Switch.Root
                        checked={Boolean(
                          rolePermissions[selectedRole]?.[module]?.[action],
                        )}
                        onCheckedChange={(e) =>
                          update(module, action, e.checked)
                        }
                      >
                        <Switch.HiddenInput />
                        <Switch.Control />
                      </Switch.Root>
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </VStack>
  );
}
