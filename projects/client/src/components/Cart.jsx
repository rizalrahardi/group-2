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
    useToast,
  } from "@chakra-ui/react";
  import { useDispatch, useSelector } from "react-redux";
  import ButtonTransaction from "./ButtonTransaction";
  import {
    deleteCart,
    decreaseCartProduct,
    increaseCartProduct,
  } from "../redux/reducer/cartSlice";
  import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
  import { BsFillTrash3Fill } from "react-icons/bs";
  import axios from "axios";
  
  export default function Cart() {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.ProductReducer);
    const { totalHarga } = useSelector((state) => state.ProductReducer);
    const toast = useToast();

  
    return (
        
      <Box
      bgColor="#1a202c"
      w={{ base: '100%', md: '300px', lg: '360px' }}
      fontFamily="montserrat"
      color="white"
      p={4}
      rounded="lg"
      >
        <Stack spacing="4">
          <Text
            fontSize={{ base: "16px", sm: "24px", md: "24px", lg: "32px" }}
            fontWeight="bold"
          >
            Transactions
          </Text>
          {cart.map((item) => (
            <Card key={item.id}>
              <CardBody>
                <Flex alignItems="center">
                  <Image
                    inlineSize="75px"
                    objectFit="cover"
                    src={`${process.env.REACT_APP_API_BASE_URL}/${item.productImg}`}
                    alt={item.name}
                  />
                  <Box ml="4" textAlign="left">
                    <Text fontSize={{ md: "10px", lg: "20px" }} fontWeight="bold">
                      {item.name}
                    </Text>
                    <Text>Rp. {item.price}</Text>
                    <Flex alignItems="center">
                      <IconButton
                        size="sm"
                        aria-label="Decrease Quantity"
                        icon={<AiFillMinusCircle />}
                        onClick={() => dispatch(decreaseCartProduct(item))}
                      />
                      <Text mx="2" fontSize={{ md: "16px", lg: "20px" }}>
                        {item.quantity}
                      </Text>
                      <IconButton
                        size="sm"
                        aria-label="Increase Quantity"
                        icon={<AiFillPlusCircle />}
                        onClick={() => dispatch(increaseCartProduct(item))}
                      />
                    </Flex>
                    <Text>Total : Rp. {item.quantity * item.price}</Text>
                  </Box>
                  <IconButton
                    ml="auto"
                    size="sm"
                    aria-label="Delete Item"
                    icon={<BsFillTrash3Fill />}
                    onClick={() => dispatch(deleteCart(item))}
                  />
                </Flex>
              </CardBody>
            </Card>
          ))}
          <Box mt="4">
            <Text fontSize="lg" fontWeight="bold">
              Total Harga : Rp. {totalHarga}
            </Text>
            {totalHarga !== 0 && (<ButtonTransaction />)}
          </Box>
        </Stack>
      </Box>
    );
  }
  