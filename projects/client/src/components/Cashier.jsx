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
    useToast,
    Image,
    Avatar
} from "@chakra-ui/react";
import { EditIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { FiSave } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import FormCreateCashier from "./CreateCashier";
import FilterCashier from "./FilterCashier";
import Pagination from "./Pagination";
import CashierTable from "./CashierTable";
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
            <CashierTable
                cashiers={cashiers}
                editingCashier={editingCashier}
                handleEdit={handleEdit}
                handleUpdate={handleUpdate}
                handleCancel={handleCancel}
            />
        </Box>
    );
};

export default UpdateCashier;
