import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import ModalTransaction from "./ModalTransaction";

export default function ButtonTransaction() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button
                colorScheme="green"
                mt={"10px"}
                w={{ md: "200px", lg: "220px" }}
                onClick={onOpen}
            >
                Payment
            </Button>
            <ModalTransaction isOpen={isOpen} onClose={onClose} />
        </>
    );
}