"use client"
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    useToast,
    Input,
    Image,
    Text
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import logo from "../assets/images/logo-nav.png"

export default function NavbarCashier({ user }) {
    const { colorMode, toggleColorMode } = useColorMode()
    const [imgProfile, setImgProfile] = useState(user.imgProfile)
    console.log('ini imgprofile', user.imgProfile)
    const navigate = useNavigate()
    const toast = useToast()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    const handleChangeAvatar = async () => {
        try {
            const formData = new FormData()
            formData.append('imgProfile', imgProfile)

            const headers = {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
            console.log(headers)
            await axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}/user/cashier`,
                formData,
                { headers }
            )
            toast({
                title: "Success",
                description: "Avatar updated successfully.",
                status: "success",
                duration: 9000,
                isClosable: true
            })
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true
            })

        }
    }

    return (
        <>
            <Box px={10}>
                <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
                    <Box>
                        <Image src={logo} alt="logo" inlineSize={"200px"} />
                    </Box>

                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={"full"}
                                    variant={"link"}
                                    cursor={"pointer"}
                                    minW={0}
                                >
                                    {user.imgProfile ? (
                                        <Image
                                            borderRadius={"full"}
                                            border={"2px"}
                                            src={`${process.env.REACT_APP_API_BASE_URL}/${user.imgProfile}`}
                                            alt="avatar"
                                            objectFit="cover"
                                            boxSize="50px"
                                        />
                                    ) : (
                                        <Avatar />
                                    )}
                                </MenuButton>
                                <MenuList alignItems={"center"}>
                                    <br />
                                    <Center>
                                        {user.imgProfile ? (
                                            <Image
                                                borderRadius={"full"}
                                                src={`${process.env.REACT_APP_API_BASE_URL}/${user.imgProfile}`}
                                                alt="avatar"
                                                objectFit="cover"
                                                boxSize="150px"
                                            />
                                        ) : (
                                            <Avatar />
                                        )}
                                    </Center>
                                    <br />
                                    <Center>
                                        <Text fontSize={"2xl"}>{user.username}</Text>
                                    </Center>
                                    <br />
                                    <Center>

                                        <Input
                                            width={"200px"}
                                            type="file"
                                            id="products"
                                            accept="image/*"
                                            onChange={(e) => setImgProfile(e.target.files[0])}
                                        />
                                        <Button onClick={handleChangeAvatar}>submit</Button>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem>
                                        <Button onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}
