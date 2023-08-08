import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducer/cartSlice';
import { FiShoppingCart, FiEdit3 } from "react-icons/fi";
import { Card, CardBody, CardFooter, Stack, Heading, Center, Text, Divider, ButtonGroup,
    Button, Image, Avatar, Box, Flex, IconButton } from '@chakra-ui/react';

    const ProductCard = ({ product, handleEditModalOpen }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isAdminPage = location.pathname === '/admin';
    const isCashierPage = location.pathname === '/home';
    return (
    <Card w={{ base: '100%', sm: '50%', md: '25%' }} minHeight={0} p={2}>
        <CardBody  bg="white" borderWidth="1px" rounded="lg" shadow="lg" position="relative" h="100%">
            {product.productImg ? (
            <Image
            src={`${process.env.REACT_APP_API_BASE_URL}/${product.productImg}`}
            alt={`Picture of ${product.name}`}
            borderRadius='lg'
            roundedTop="lg"
            w="100%" h="150px" objectFit="cover"/>
            ) : (
            <Avatar />
            )}
            <Stack mt='6' spacing='3'>
                <Text
                fontSize={["sm", "md", "lg", "xl"]} as="b"
                fontWeight="semibold"
                lineHeight="tight"
                isTruncated>
                    {product.name}
                    </Text>
                    <Center>
                        {product.Category ? (
                        <Text py={1} px={4} borderRadius={'full'} bgColor={'teal.100'} width={'fit-content'}>{product.Category.name}</Text>) 
                        : (<Text py={1} px={4} borderRadius={'full'} bgColor={'teal.100'} width={'fit-content'}></Text>)}
                    </Center>
                    {isAdminPage && (
                    <Text color='teal.600'>{product.isActive ? <Text color='teal.600'>Active</Text> 
                    : <Text color={'red.600'}>Inactive</Text>}</Text>
                    )}
                   </Stack>
                   <Flex mt={3} justifyContent="space-between" alignContent="center">
                    <Text color='teal.600' fontSize={["md", "lg", "xl", "2xl"]}>
                        Rp. {product.price}
                    </Text>
                    
                    <ButtonGroup spacing='2'>
                        {isCashierPage && (<IconButton
                        icon={<FiShoppingCart />}
                        variant="outline"
                        size="sm" onClick={() => dispatch(addToCart(product))} colorScheme='teal'>
                        </IconButton>)}
                        
                        {isAdminPage && (
                        <IconButton
                        icon={<FiEdit3/>}
                        variant="outline"
                        size="sm"
                        colorScheme='teal'onClick={() => handleEditModalOpen(product)}>
                        </IconButton>
                        )}
                    </ButtonGroup>
                    </Flex>
            </CardBody>
        </Card>
    );
};

export default ProductCard;
