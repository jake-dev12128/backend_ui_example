import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  HStack,
  Select,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import DashboardHome from "./components/dashboard/DashboardHome";
import CrudPage from "./components/crud/CrudPage";
import PermissionsPage from "./components/permissions/PermissionsPage";
import { roleConfig } from "./config/roles";
import { initialData, dashboardData, rolePermissions } from "./data/mockData";

const roleOptions = createListCollection({
  items: Object.entries(roleConfig).map(([value, item]) => ({
    value,
    label: item.label,
  })),
});
const schema = (title, description, key, columns, fields) => ({
  title,
  description,
  resource: title,
  key,
  columns,
  fields,
});
const schemas = {
  Students: schema(
    "Students",
    "Student profiles, enrollment, contact details and account status.",
    "students",
    [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "course", label: "Course" },
      { key: "className", label: "Class" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "name", label: "Full Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "gender", label: "Gender" },
      { key: "dob", label: "Date of Birth" },
      { key: "course", label: "Course" },
      { key: "className", label: "Class" },
      { key: "guardian", label: "Guardian" },
      { key: "status", label: "Status", default: "Active" },
    ],
  ),
  Teachers: schema(
    "Teachers",
    "Instructor profiles, specialization, experience and availability.",
    "teachers",
    [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "specialization", label: "Specialization" },
      { key: "experience", label: "Experience" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "name", label: "Full Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "specialization", label: "Specialization" },
      { key: "experience", label: "Experience" },
      { key: "status", label: "Status", default: "Active" },
    ],
  ),
  Courses: schema(
    "Courses",
    "Course catalog, fees, capacity, category and publication status.",
    "courses",
    [
      { key: "id", label: "ID" },
      { key: "name", label: "Course" },
      { key: "code", label: "Code" },
      { key: "category", label: "Category" },
      { key: "duration", label: "Duration" },
      { key: "fee", label: "Fee" },
      { key: "capacity", label: "Capacity" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "name", label: "Course Name" },
      { key: "code", label: "Code" },
      { key: "category", label: "Category" },
      { key: "duration", label: "Duration" },
      { key: "fee", label: "Fee" },
      { key: "capacity", label: "Capacity" },
      { key: "status", label: "Status", default: "Active" },
    ],
  ),
  Classes: schema(
    "Classes",
    "Class groups, schedules, rooms, capacity and assigned teachers.",
    "classes",
    [
      { key: "id", label: "ID" },
      { key: "name", label: "Class" },
      { key: "course", label: "Course" },
      { key: "teacher", label: "Teacher" },
      { key: "schedule", label: "Schedule" },
      { key: "room", label: "Room" },
      { key: "enrolled", label: "Enrolled" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "name", label: "Class Name" },
      { key: "course", label: "Course" },
      { key: "teacher", label: "Teacher" },
      { key: "schedule", label: "Schedule" },
      { key: "room", label: "Room" },
      { key: "capacity", label: "Capacity" },
      { key: "enrolled", label: "Enrolled", default: "0" },
      { key: "status", label: "Status", default: "Active" },
    ],
  ),
  Attendance: schema(
    "Attendance",
    "Daily attendance records and teacher marking history.",
    "attendance",
    [
      { key: "id", label: "ID" },
      { key: "date", label: "Date" },
      { key: "className", label: "Class" },
      { key: "student", label: "Student" },
      { key: "status", label: "Status" },
      { key: "markedBy", label: "Marked By" },
    ],
    [
      { key: "date", label: "Date" },
      { key: "className", label: "Class" },
      { key: "student", label: "Student" },
      { key: "status", label: "Status", default: "Present" },
      { key: "markedBy", label: "Marked By" },
    ],
  ),
  Exams: schema(
    "Exams",
    "Exam schedule, marks, pass rules and publication status.",
    "exams",
    [
      { key: "id", label: "ID" },
      { key: "title", label: "Exam" },
      { key: "course", label: "Course" },
      { key: "className", label: "Class" },
      { key: "date", label: "Date" },
      { key: "totalMarks", label: "Total" },
      { key: "passMark", label: "Pass" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "title", label: "Exam Title" },
      { key: "course", label: "Course" },
      { key: "className", label: "Class" },
      { key: "date", label: "Date" },
      { key: "totalMarks", label: "Total Marks" },
      { key: "passMark", label: "Pass Mark" },
      { key: "status", label: "Status", default: "Draft" },
    ],
  ),
  Results: schema(
    "Results",
    "Student exam marks, grades and pass/fail results.",
    "results",
    [
      { key: "id", label: "ID" },
      { key: "exam", label: "Exam" },
      { key: "student", label: "Student" },
      { key: "marks", label: "Marks" },
      { key: "grade", label: "Grade" },
      { key: "result", label: "Result" },
    ],
    [
      { key: "exam", label: "Exam" },
      { key: "student", label: "Student" },
      { key: "marks", label: "Marks" },
      { key: "grade", label: "Grade" },
      { key: "result", label: "Result", default: "Pass" },
    ],
  ),
  Payments: schema(
    "Payments",
    "Student fee payments, methods, dates and payment state.",
    "payments",
    [
      { key: "id", label: "ID" },
      { key: "student", label: "Student" },
      { key: "invoice", label: "Invoice" },
      { key: "amount", label: "Amount" },
      { key: "method", label: "Method" },
      { key: "date", label: "Date" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "student", label: "Student" },
      { key: "invoice", label: "Invoice" },
      { key: "amount", label: "Amount" },
      { key: "method", label: "Payment Method" },
      { key: "date", label: "Date" },
      { key: "status", label: "Status", default: "Pending" },
    ],
  ),
  Invoices: schema(
    "Invoices",
    "Billing records, paid amount, outstanding balance and due dates.",
    "invoices",
    [
      { key: "id", label: "Invoice" },
      { key: "student", label: "Student" },
      { key: "course", label: "Course" },
      { key: "total", label: "Total" },
      { key: "paid", label: "Paid" },
      { key: "due", label: "Due" },
      { key: "dueDate", label: "Due Date" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "student", label: "Student" },
      { key: "course", label: "Course" },
      { key: "total", label: "Total" },
      { key: "paid", label: "Paid" },
      { key: "due", label: "Due" },
      { key: "dueDate", label: "Due Date" },
      { key: "status", label: "Status", default: "Pending" },
    ],
  ),
  Announcements: schema(
    "Announcements",
    "Announcements published to students, teachers and staff.",
    "announcements",
    [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "audience", label: "Audience" },
      { key: "publishedAt", label: "Published" },
      { key: "author", label: "Author" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "title", label: "Title" },
      { key: "audience", label: "Audience" },
      { key: "publishedAt", label: "Publish Date" },
      { key: "author", label: "Author" },
      { key: "status", label: "Status", default: "Draft" },
    ],
  ),
  Staff: schema(
    "Staff",
    "Non-teaching staff and administrative employees.",
    "staff",
    [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "department", label: "Department" },
      { key: "position", label: "Position" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "name", label: "Full Name" },
      { key: "email", label: "Email" },
      { key: "department", label: "Department" },
      { key: "position", label: "Position" },
      { key: "status", label: "Status", default: "Active" },
    ],
  ),
  Registrations: schema(
    "Registrations",
    "Incoming student applications and admission workflow.",
    "registrations",
    [
      { key: "id", label: "ID" },
      { key: "applicant", label: "Applicant" },
      { key: "course", label: "Course" },
      { key: "appliedAt", label: "Applied" },
      { key: "source", label: "Source" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "applicant", label: "Applicant" },
      { key: "course", label: "Course" },
      { key: "appliedAt", label: "Applied Date" },
      { key: "source", label: "Source" },
      { key: "status", label: "Status", default: "Pending" },
    ],
  ),
  "Academic Reports": schema(
    "Academic Reports",
    "Generated academic reports and reporting history.",
    "academicReports",
    [
      { key: "id", label: "ID" },
      { key: "name", label: "Report" },
      { key: "period", label: "Period" },
      { key: "generatedBy", label: "Generated By" },
      { key: "generatedAt", label: "Generated" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "name", label: "Report Name" },
      { key: "period", label: "Period" },
      { key: "generatedBy", label: "Generated By" },
      { key: "generatedAt", label: "Generated At" },
      { key: "status", label: "Status", default: "Ready" },
    ],
  ),
  News: schema(
    "News",
    "Public college news and articles.",
    "news",
    [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "publishedAt", label: "Published" },
      { key: "author", label: "Author" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "publishedAt", label: "Publish Date" },
      { key: "author", label: "Author" },
      { key: "status", label: "Status", default: "Draft" },
    ],
  ),
  "Course Content": schema(
    "Course Content",
    "Lessons, labs, exercises and versioned learning content.",
    "courseContent",
    [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "course", label: "Course" },
      { key: "type", label: "Type" },
      { key: "version", label: "Version" },
      { key: "updatedAt", label: "Updated" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "title", label: "Title" },
      { key: "course", label: "Course" },
      { key: "type", label: "Type" },
      { key: "version", label: "Version" },
      { key: "updatedAt", label: "Updated At" },
      { key: "status", label: "Status", default: "Draft" },
    ],
  ),
  Media: schema(
    "Media",
    "Images, videos and uploaded assets for the college website and LMS.",
    "media",
    [
      { key: "id", label: "ID" },
      { key: "name", label: "File" },
      { key: "type", label: "Type" },
      { key: "size", label: "Size" },
      { key: "uploadedBy", label: "Uploaded By" },
      { key: "uploadedAt", label: "Uploaded" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "name", label: "File Name" },
      { key: "type", label: "Type" },
      { key: "size", label: "Size" },
      { key: "uploadedBy", label: "Uploaded By" },
      { key: "uploadedAt", label: "Uploaded At" },
      { key: "status", label: "Status", default: "Draft" },
    ],
  ),
  Documents: schema(
    "Documents",
    "Policies, guidelines and internal documents with visibility controls.",
    "documents",
    [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "owner", label: "Owner" },
      { key: "updatedAt", label: "Updated" },
      { key: "visibility", label: "Visibility" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "owner", label: "Owner" },
      { key: "updatedAt", label: "Updated At" },
      { key: "visibility", label: "Visibility" },
      { key: "status", label: "Status", default: "Draft" },
    ],
  ),
  "Course Materials": schema(
    "Course Materials",
    "Teacher-managed class resources and learning materials.",
    "courseMaterials",
    [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "className", label: "Class" },
      { key: "teacher", label: "Teacher" },
      { key: "type", label: "Type" },
      { key: "updatedAt", label: "Updated" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "title", label: "Title" },
      { key: "className", label: "Class" },
      { key: "teacher", label: "Teacher" },
      { key: "type", label: "Type" },
      { key: "updatedAt", label: "Updated At" },
      { key: "status", label: "Status", default: "Draft" },
    ],
  ),
  "Security Logs": schema(
    "Security Logs",
    "Authentication, authorization and security audit events.",
    "securityLogs",
    [
      { key: "id", label: "ID" },
      { key: "time", label: "Time" },
      { key: "actor", label: "Actor" },
      { key: "action", label: "Action" },
      { key: "target", label: "Target" },
      { key: "ip", label: "IP" },
      { key: "severity", label: "Severity" },
    ],
    [
      { key: "time", label: "Time" },
      { key: "actor", label: "Actor" },
      { key: "action", label: "Action" },
      { key: "target", label: "Target" },
      { key: "ip", label: "IP" },
      { key: "severity", label: "Severity", default: "Info" },
    ],
  ),
  Settings: schema(
    "Settings",
    "System configuration values for the prototype.",
    "settings",
    [
      { key: "id", label: "ID" },
      { key: "key", label: "Key" },
      { key: "value", label: "Value" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status" },
    ],
    [
      { key: "key", label: "Key" },
      { key: "value", label: "Value" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status", default: "Active" },
    ],
  ),
};

const menuToPermission = {
  "My Students": "students",
  "My Classes": "classes",
  "My Schedule": "classes",
  "Course Materials": "courseMaterials",
  Profile: "settings",
  "Academic Reports": "academicReports",
  Reports: "academicReports",
  "Content Analytics": "courseContent",
  "Roles & Permissions": "rolesPermissions",
};

function Placeholder({ name }) {
  return (
    <Box bg="white" p="8" rounded="xl" borderWidth="1px">
      <Text fontSize="2xl" fontWeight="800">
        {name}
      </Text>
      <Text color="gray.500" mt="2">
        This menu is a placeholder in the prototype. The permission matrix and
        example data are ready; connect it to your API when implementing the
        real module.
      </Text>
    </Box>
  );
}

export default function App() {
  const [role, setRole] = useState("superAdmin");
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [data, setData] = useState(initialData);
  const [permissions, setPermissions] = useState(rolePermissions);
  const [drawer, setDrawer] = useState(false);
  const config = roleConfig[role];
  const go = (menu) => {
    setActiveMenu(menu);
    setDrawer(false);
  };
  const permissionKey =
    menuToPermission[activeMenu] ||
    activeMenu.replaceAll(" ", "").toLowerCase();
  const activePermissions = permissions[role]?.[permissionKey] || {};
  const page = useMemo(() => {
    if (activeMenu === "Dashboard")
      return <DashboardHome data={dashboardData} />;
    if (activeMenu === "Roles & Permissions")
      return (
        <PermissionsPage
          roleConfig={roleConfig}
          rolePermissions={permissions}
          setRolePermissions={setPermissions}
        />
      );
    const currentSchema = schemas[activeMenu];
    if (currentSchema && activePermissions.view)
      return (
        <CrudPage
          {...currentSchema}
          data={data[currentSchema.key] || []}
          setData={(fn) =>
            setData((prev) => ({
              ...prev,
              [currentSchema.key]:
                typeof fn === "function"
                  ? fn(prev[currentSchema.key] || [])
                  : fn,
            }))
          }
          permissions={activePermissions}
        />
      );
    if (currentSchema && !activePermissions.view)
      return (
        <Box bg="white" p="8" rounded="xl" borderWidth="1px">
          <Text fontSize="2xl" fontWeight="800">
            Access Denied
          </Text>
          <Text color="gray.500" mt="2">
            The current role does not have <b>view</b> permission for{" "}
            {activeMenu}.
          </Text>
        </Box>
      );
    return <Placeholder name={activeMenu} />;
  }, [activeMenu, data, activePermissions, permissions]);
  return (
    <Box className="app-shell">
      <Sidebar
        role={role}
        config={config}
        activeMenu={activeMenu}
        onNavigate={go}
      />
      <Header roleLabel={config.label} onOpenSidebar={() => setDrawer(true)} />
      <Drawer.Root
        open={drawer}
        onOpenChange={(e) => setDrawer(e.open)}
        placement="start"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>ACC Computer College</Drawer.Header>
            <Drawer.Body>
              <Box>
                {config.menus.map(([label, Icon]) => (
                  <Button
                    key={label}
                    w="full"
                    justifyContent="flex-start"
                    variant={activeMenu === label ? "subtle" : "ghost"}
                    onClick={() => go(label)}
                  >
                    <Icon />
                    {label}
                  </Button>
                ))}
              </Box>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
      <Box className="main-content" ml="260px" pt="72px">
        <Box className="content-area" p={{ base: 5, md: 7 }}>
          <HStack justify="space-between" mb="5">
            <Text color="gray.500" fontSize="sm">
              Frontend prototype · data resets after refresh
            </Text>
            <Select.Root
              collection={roleOptions}
              value={[role]}
              onValueChange={(d) => {
                setRole(d.value[0]);
                setActiveMenu("Dashboard");
              }}
              width="240px"
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Preview role" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {roleOptions.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </HStack>
          {page}
        </Box>
      </Box>
    </Box>
  );
}
