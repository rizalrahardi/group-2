import { FiHome } from "react-icons/fi"
import {
    Box,
    Text,
    Flex,
    CloseButton,
    useColorModeValue,
    Image,
    Icon,
} from "@chakra-ui/react"
import { IoCreateOutline } from "react-icons/io5"
import { GrDocumentUpdate } from "react-icons/gr"
import { AiOutlineDatabase } from "react-icons/ai"
import { TbReportSearch } from "react-icons/tb"
import logo from "../assets/images/logo-nav.png"
import { Link } from "react-router-dom"

const LinkItems = [
    { name: "Home", icon: FiHome, path: "/admin" },
    { name: "Create Cashier", icon: IoCreateOutline, path: "/create-cashier" },
    { name: "Update Cashier", icon: GrDocumentUpdate, path: "/update-cashier" },
    { name: "Products", icon: AiOutlineDatabase, path: "/products" },
    { name: "Reports", icon: TbReportSearch, path: "/reports" },
]

const NavItem = ({ icon, path, children, ...rest }) => {
    return (
        <Box
            as="a"
            href="#"
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "cyan.400",
                    color: "white"
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white"
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    )
}

const SidebarContent = ({ onClose, ...rest }) => {
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
            {LinkItems.map(link => (
                <Link to={link.path} key={link.name} >
                    <NavItem icon={link.icon}  >
                        {link.name}
                    </NavItem>
                </Link>
            ))}
        </Box>
    )
}

export default SidebarContent