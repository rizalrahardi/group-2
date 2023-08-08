import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteAllCart } from "../redux/reducer/cartSlice";

export default function ModalTransaction({ isOpen, onClose }) {
    const toast = useToast();
    const [uangCustomer, setUangCustomer] = useState(0);
    const { cart, totalHarga } = useSelector((state) => state.ProductReducer);
    const dispatch = useDispatch();
    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem("token");
            const items = cart.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            }));
            await axios.post(
                "http://localhost:8000/api/transaction",
                { items },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast({
                title: "Success",
                description: "Transaction successful",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            dispatch(deleteAllCart())
            onClose()
        } catch (error) {
            toast({
                title: "Failed",
                description: "Transaction failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleCheckout();
    };
    const hitungKembalian = () => {
        const kembalian = uangCustomer - totalHarga;
        return kembalian > 0 ? kembalian : null;
    };
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent fontFamily={"montserrat"}>
                    <ModalHeader>Checkout</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleFormSubmit}>
                        <ModalBody>
                            <Text id="totalHarga">Total Bayar : Rp.{totalHarga}</Text>
                            <Input
                                placeholder="Uang Customer"
                                onChange={(e) => setUangCustomer(e.target.value)}
                                borderColor={"blue"}
                                _hover={{ borderColor: "green" }}
                            ></Input>
                            {hitungKembalian() !== null && hitungKembalian() > 0 && (
                                <Text>Kembalian : Rp. {hitungKembalian()}</Text>
                            )}
                        </ModalBody>

                        <ModalFooter gap={"10px"}>
                            <Button type="submit"
                                colorScheme="green">
                                Process
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}