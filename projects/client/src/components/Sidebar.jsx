import { FiHome } from "react-icons/fi"
import {
    Box,
    Text,
    Flex,
    CloseButton,
    useColorModeValue,
    Image,
    Button,
} from "@chakra-ui/react"
import { GrDocumentUpdate } from "react-icons/gr"
import { AiOutlineDatabase } from "react-icons/ai"
import { TbReportSearch } from "react-icons/tb"
import logo from "../assets/images/logo-nav.png"

const SidebarContent = ({ onContentChange, onClose, ...rest }) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    <Image src={logo} />
                </Text>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>
            <Button width={"90%"} my={4} onClick={() => onContentChange("home")}><FiHome /> Home</Button>
            <Button width={"90%"} my={4} onClick={() => onContentChange("update-cashier")}><GrDocumentUpdate />Cashier</Button>
            <Button width={"90%"} my={4} onClick={() => onContentChange("products")}><AiOutlineDatabase />Products</Button>
            <Button width={"90%"} my={4} onClick={() => onContentChange("categories")}><AiOutlineDatabase />Categories</Button>
            <Button width={"90%"} my={4} onClick={() => onContentChange("reports")}><TbReportSearch />Reports</Button>

        </Box>
    )
}

export default SidebarContent