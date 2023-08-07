import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    IconButton,
    Image,
    Input,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ButtonTransaction from "./ButtonTransaction";
import {
    deleteCart,
    decreaseCartProduct,
    increaseCartProduct,
} from "../redux/reducer/cartSlice";
import { AiFillMinusCircle, AiFillPlusCircle, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import axios from "axios";

export default function Cart() {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.ProductReducer);
    const { totalHarga } = useSelector((state) => state.ProductReducer);
    console.log("ini product", cart);
    console.log("total harga", totalHarga);
    const toast = useToast();

    return (
        <>
            <Box
                // bgColor={"#223256"}
                bgColor={"#1a202c"}
                w={{ sm: "250px", md: "300px", lg: "360px" }}
                fontFamily={"montserrat"}
                color={"white"}
                position={"sticky"}
            >
                <Stack>
                    <Box m={"20px 30px"}>
                        <Text
                            fontSize={{ base: "16px", sm: "24px", md: "24px", lg: "32px" }}
                        >
                            Transactions
                        </Text>
                    </Box>
                    {cart.map((item) => (
                        <Box>
                            <Card
                                w={{ md: "250px", lg: "320px" }}
                                h={"auto"}
                                m={"5px auto"}
                                key={item.id}
                            >
                                <CardBody>
                                    <Flex>
                                        <Box>
                                            <Image inlineSize={"100px"} src={`${process.env.REACT_APP_API_BASE_URL}/${item.productImg}`} />
                                        </Box>
                                        <Box textAlign={"left"}>
                                            <Text mt={"-10px"} fontSize={{ md: "12px", lg: "20px" }}>
                                                {item.name}
                                            </Text>

                                            <Text>Rp. {item.price}</Text>
                                            <Flex textAlign={"center"}>
                                                <Button size={"sm"} onClick={() => dispatch(decreaseCartProduct(item))}><AiOutlineMinus /></Button>
                                                <Text mx={"5px"} fontSize={{ md: "12px", lg: "20px" }}>{item.quantity}</Text>
                                                <Button size={"sm"} onClick={() => dispatch(increaseCartProduct(item))}><AiOutlinePlus /></Button>
                                            </Flex>
                                            <Text>total : {item.quantity * item.price}</Text>
                                        </Box>
                                        <Button pos={"absolute"} right={"10px"} top={"10px"} size={"sm"} onClick={() => dispatch(deleteCart(item))}><BsFillTrash3Fill /></Button>
                                    </Flex>
                                </CardBody>
                            </Card>
                        </Box>
                    ))}
                    <Box
                        pos={"absolute"}
                        mt={"700px"}
                        ml={{ md: "50px", lg: "80px" }}
                    >
                        <Text color={"black"}>Total Harga : Rp. {totalHarga}</Text>
                        {console.log("total harga button", totalHarga)}
                        <ButtonTransaction />
                    </Box>
                </Stack >
            </Box >
        </>
    );
}