import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Field,
  HStack,
  Input,
  Portal,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaPlus, FaPen, FaTrash, FaMagnifyingGlass } from "react-icons/fa6";

export default function CrudPage({
  title,
  description,
  resource,
  columns,
  fields,
  data,
  setData,
  permissions = {},
}) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const canCreate = permissions.create;
  const canUpdate = permissions.update;
  const canDelete = permissions.delete;
  const filtered = useMemo(
    () =>
      data.filter((row) =>
        Object.values(row).some((v) =>
          String(v ?? "")
            .toLowerCase()
            .includes(search.toLowerCase()),
        ),
      ),
    [data, search],
  );
  const singular = resource.endsWith("s") ? resource.slice(0, -1) : resource;
  const startCreate = () => {
    setEditing(null);
    setForm(Object.fromEntries(fields.map((f) => [f.key, f.default ?? ""])));
    setOpen(true);
  };
  const startEdit = (row) => {
    setEditing(row.id);
    setForm({ ...row });
    setOpen(true);
  };
  const save = () => {
    if (
      fields.some(
        (f) => f.required !== false && !String(form[f.key] ?? "").trim(),
      )
    )
      return;
    if (editing)
      setData((prev) =>
        prev.map((x) => (x.id === editing ? { ...x, ...form } : x)),
      );
    else
      setData((prev) => [
        {
          ...form,
          id: `${resource.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-5)}`,
        },
        ...prev,
      ]);
    setOpen(false);
  };
  return (
    <>
      <VStack align="stretch" gap="5">
        <Box>
          <Text fontSize="2xl" fontWeight="800">
            {title}
          </Text>
          <Text color="gray.500">{description}</Text>
        </Box>
        <Box bg="white" p="4" rounded="xl" borderWidth="1px">
          <HStack className="crud-toolbar" justify="space-between">
            <HStack>
              <FaMagnifyingGlass />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${resource}...`}
                w="320px"
              />
            </HStack>
            {canCreate && (
              <Button colorPalette="blue" onClick={startCreate}>
                <FaPlus /> Add {singular}
              </Button>
            )}
          </HStack>
        </Box>
        <Box bg="white" rounded="xl" borderWidth="1px" overflow="hidden">
          <Box className="table-wrap">
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  {columns.map((c) => (
                    <Table.ColumnHeader key={c.key}>
                      {c.label}
                    </Table.ColumnHeader>
                  ))}
                  {(canUpdate || canDelete) && (
                    <Table.ColumnHeader>Actions</Table.ColumnHeader>
                  )}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filtered.map((row) => (
                  <Table.Row key={row.id}>
                    {columns.map((c) => (
                      <Table.Cell key={c.key}>
                        {c.render ? c.render(row[c.key], row) : row[c.key]}
                      </Table.Cell>
                    ))}
                    {(canUpdate || canDelete) && (
                      <Table.Cell>
                        <HStack>
                          {canUpdate && (
                            <Button
                              size="xs"
                              variant="outline"
                              onClick={() => startEdit(row)}
                            >
                              <FaPen />
                            </Button>
                          )}
                          {canDelete && (
                            <Button
                              size="xs"
                              colorPalette="red"
                              variant="outline"
                              onClick={() =>
                                setData((prev) =>
                                  prev.filter((x) => x.id !== row.id),
                                )
                              }
                            >
                              <FaTrash />
                            </Button>
                          )}
                        </HStack>
                      </Table.Cell>
                    )}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
          {filtered.length === 0 && (
            <Text p="8" textAlign="center" color="gray.500">
              No records found.
            </Text>
          )}
        </Box>
      </VStack>
      {canUpdate || canCreate ? (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>
                    {editing ? `Edit ${singular}` : `Create ${singular}`}
                  </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <VStack gap="4">
                    {fields.map((f) => (
                      <Field.Root key={f.key} required={f.required !== false}>
                        <Field.Label>{f.label}</Field.Label>
                        <Input
                          value={form[f.key] ?? ""}
                          onChange={(e) =>
                            setForm({ ...form, [f.key]: e.target.value })
                          }
                          placeholder={f.placeholder || f.label}
                        />
                      </Field.Root>
                    ))}
                  </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button
                    variant="outline"
                    mr="2"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button colorPalette="blue" onClick={save}>
                    Save
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger />
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      ) : null}
    </>
  );
}
