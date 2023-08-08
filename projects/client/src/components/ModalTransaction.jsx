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
import { payment } from "../redux/reducer/cartSlice";
import axios from "axios";
import { deleteCart } from "../redux/reducer/cartSlice";

export default function ModalTransaction({ isOpen, onClose }) {
    const toast = useToast();
    const [uangCustomer, setUangCustomer] = useState(0);
    const [kembalian, setKembalian] = useState(0);
    const { cart, totalHarga } = useSelector((state) => state.ProductReducer);
    const dispatch = useDispatch();

    const handleReload = () => {
        window.location.reload()
      };

    console.log("ini product modal transaction", cart);

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem("token");
            const items = cart.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            }));
            const body = JSON.stringify({ items });
            console.log("Data yang akan dikirim ke server:", body);

            const response = await axios.post(
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
        } catch (error) {
            console.error("Error:", error);
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
    function handlePay() {
        const total = uangCustomer - totalHarga;
        setKembalian(total);
    }
    function reset() {
        setKembalian(0);
    }
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
                            onClick={() => {handlePay() 
                                onClose()
                                handleReload()
                                }} colorScheme="green">
                                Process
                            </Button>
                            <Button mr={3} onClick={reset}>
                                Reset
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}