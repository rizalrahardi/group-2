import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Input,
  Select,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { FiSave } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const CashierTable = ({ cashiers, editingCashier, handleEdit, handleUpdate, handleCancel }) => {
  return (
    <Table variant="striped" colorScheme="teal" mt={4}>
      <Thead>
        <Tr>
          <Th>Image</Th>
          <Th>Username</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Active</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {cashiers.map((cashier) => (
          <Tr key={cashier.id}>
            <Td>
              {cashier.imgProfile ? (
                <Image
                  borderRadius={"full"}
                  src={`${process.env.REACT_APP_API_BASE_URL}/${cashier.imgProfile}`}
                  alt="avatar"
                  boxSize="50px"
                />
              ) : (
                <Avatar />
              )}
            </Td>
            <Td>
              {editingCashier && editingCashier.id === cashier.id ? (
                <Input
                  type="text"
                  name="username"
                  value={editingCashier.username}
                  onChange={(e) =>
                    handleEdit({
                      ...editingCashier,
                      username: e.target.value,
                    })
                  }
                />
              ) : (
                cashier.username
              )}
            </Td>
            <Td>
              {editingCashier && editingCashier.id === cashier.id ? (
                <Input
                  type="email"
                  name="email"
                  value={editingCashier.email}
                  onChange={(e) =>
                    handleEdit({
                      ...editingCashier,
                      email: e.target.value,
                    })
                  }
                />
              ) : (
                cashier.email
              )}
            </Td>
            <Td>
              {editingCashier && editingCashier.id === cashier.id ? (
                <Input
                  disabled
                  type="text"
                  name="role"
                  value={editingCashier.role}
                  onChange={(e) =>
                    handleEdit({
                      ...editingCashier,
                      role: e.target.value,
                    })
                  }
                />
              ) : (
                cashier.role
              )}
            </Td>
            <Td>
              {editingCashier && editingCashier.id === cashier.id ? (
                <Select
                  name="isActive"
                  value={editingCashier.isActive ? "true" : "false"}
                  onChange={(e) =>
                    handleEdit({
                      ...editingCashier,
                      isActive: e.target.value === "true" ? true : false,
                    })
                  }
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Select>
              ) : (
                cashier.isActive ? "Yes" : "No"
              )}
            </Td>
            <Td>
              {editingCashier && editingCashier.id === cashier.id ? (
                <>
                  <IconButton
                    aria-label="Save"
                    icon={<FiSave />}
                    colorScheme="green"
                    size="sm"
                    mr={2}
                    onClick={() => handleUpdate(editingCashier)}
                  />
                  <IconButton
                    aria-label="Cancel"
                    icon={<MdClose />}
                    colorScheme="red"
                    size="sm"
                    onClick={handleCancel}
                  />
                </>
              ) : (
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleEdit(cashier)}
                />
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CashierTable;
