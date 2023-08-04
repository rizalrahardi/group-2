import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  IconButton,
  Button,
  useDisclosure,
  useToast,
  Flex,
  ButtonGroup
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal"
import FormCreateCategory from "./CreateCategoryModal";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure()

  const toast = useToast()

  const fetchCategories = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/category`,
        {
          headers,
        }
      );
      setCategories(data.result);
    } catch (error) {

      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (categoryData) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/category`,
        {
          name: categoryData.name,
        },
        { headers }
      );

      fetchCategories();

      toast({
        title: "Create category success",
        status: "success",
        duration: "2000",
        isClosable: true,
      });
    } catch (error) {
      console.log(error)
      toast({
        title: "Create category can't be completed",
        description: error.response.data.message || error.response.data.errors[0].msg,
        status: "error",
        duration: "2000",
        isClosable: true,
      });
    }
  };

  const handleEdit = (categoryId, categoryName) => {
    setEditingCategoryId(categoryId);
    setEditedCategoryName(categoryName);
  };

  const handleSave = async (categoryId) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/product/category/${categoryId}`,
        { name: editedCategoryName },
        { headers }
      );

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? { ...category, name: editedCategoryName }
            : category
        )
      );

      toast({
        title: "Edit category name success",
        status: "success",
        duration: "2000",
        isClosable: true,
      });

      setEditingCategoryId(null);
      setEditedCategoryName("");
    } catch (error) {
      toast({
        title: "Failed to edit data",
        description: error.response.data.message || error.response.data.errors[0].msg,
        status: "error",
        duration: "2000",
        isClosable: true,
      })
      console.error("Error updating category:", error);
    }
  };

  const handleCancel = () => {
    setEditingCategoryId(null);
    setEditedCategoryName("");
  };

  const handleDelete = (categoryId) => {
    setSelectedCategoryId(categoryId);
    onConfirmationOpen();
  };

  const handleConfirmationDelete = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/product/category/${selectedCategoryId}`,
        { headers }
      );

      toast({
        title: "Category successfully deleted",
        status: "success",
        duration: "2000",
        isClosable: true,
      });

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== selectedCategoryId)
      );
    } catch (error) {
      toast({
        title: "Failed to delete category",
        description: error.response.data.message || error.response.data.errors[0].msg,
        status: "error",
        duration: "2000",
        isClosable: true,
      })

      console.error("Error deleting category:", error);
    } finally {
      setSelectedCategoryId(null);
      onConfirmationClose();
    }
  };

  return (
    <>
      <Flex justifyContent="flex-end" mb={4}>
        <Button colorScheme="teal" onClick={onOpen}>
          Create Category
          <FormCreateCategory isOpen={isOpen} onClose={onClose} onSubmit={handleCreateCategory} />
        </Button>
      </Flex>

      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Category Name</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <Tr key={category.id}>
                <Td>
                  {editingCategoryId === category.id ? (
                    <Input
                      value={editedCategoryName}
                      onChange={(e) => setEditedCategoryName(e.target.value)}
                    />
                  ) : (
                    category.name
                  )}
                </Td>
                <Td>
                  {editingCategoryId === category.id ? (
                    <>
                      <ButtonGroup gap={"1"}>
                        <IconButton
                          icon={<CheckIcon />}
                          colorScheme="green"
                          onClick={() => handleSave(category.id)}
                        />
                        <IconButton
                          icon={<CloseIcon />}
                          colorScheme="red"
                          onClick={handleCancel}
                        />
                      </ButtonGroup>
                    </>
                  ) : (
                    <IconButton
                      icon={<EditIcon />}
                      colorScheme="blue"
                      onClick={() => handleEdit(category.id, category.name)}
                    />
                  )}
                </Td>
                <Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(category.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={onConfirmationClose}
        onConfirm={handleConfirmationDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
      />
    </>
  );
};

export default CategoryTable;
