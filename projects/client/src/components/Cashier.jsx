import React, { useState, useEffect } from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Input,
    Select,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useToast
} from "@chakra-ui/react";
import { EditIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { FiSave } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import FormCreateCashier from "./CreateCashier";
import FilterCashier from "./FilterCashier";
import Pagination from "./Pagination";
const UpdateCashier = () => {
    const [cashiers, setCashiers] = useState([]);
    const [editingCashier, setEditingCashier] = useState(null);
    const [modal, setModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const toast = useToast();
    const handleModalOpen = () => {
        setModal(true);
    }
    const handleModalClose = () => {
        setModal(false);
    }
    const fetchCashiers = async (queryParams) => {
        try {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
            const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/cashier?page=${page}&${queryParams}`, {
                headers
            });
            setCashiers(data.cashiers);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCashiers();
    }, [page]);

    const onPageChange = (newPage) => {
        console.log("newPage", newPage);
        setPage(newPage);
    }

    const handleEdit = (cashier) => {
        setEditingCashier(cashier);
    };

    const handleFilter = (query) => {
        setActiveFilter(query);

        fetchCashiers(query);
    }

    const handleUpdate = async (cashier) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/user/cashier/${cashier.id}`, cashier);
            setEditingCashier(null);
            fetchCashiers();
            toast({
                title: "Update cashier success",
                status: "success",
                duration: 3000,
                isClosable: true
            })
        } catch (error) {
            toast({
                title: "Update cashier failed",
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
    };
    const handleCancel = () => {
        setEditingCashier(null);
    };

    return (
        <Box maxWidth="1000px" mx="auto">
            <Button mb={4} colorScheme="teal" onClick={handleModalOpen}>
                Create Cashier
            </Button>
            <Modal isOpen={modal} onClose={handleModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Cashier</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormCreateCashier handleModalClose={handleModalClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <br />
            <FilterCashier handleFilter={handleFilter} activeFilter={activeFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
            <Table variant="striped" colorScheme="teal" mt={4}>
                <Thead>
                    <Tr>
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
                                {editingCashier && editingCashier.id === cashier.id ? (
                                    <Input
                                        type="text"
                                        name="username"
                                        value={editingCashier.username}
                                        onChange={(e) =>
                                            setEditingCashier({
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
                                            setEditingCashier({
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
                                            setEditingCashier({
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
                                            setEditingCashier({
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
        </Box>
    );
};

export default UpdateCashier;
