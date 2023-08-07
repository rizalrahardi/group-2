import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducer/cartSlice';
import { Card, CardBody, CardFooter, Stack, Heading, Center, Text, Divider, ButtonGroup, Button, Image, Avatar } from '@chakra-ui/react';
const ProductCard = ({ product, handleEditModalOpen }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isAdminPage = location.pathname === '/admin';
    const isCashierPage = location.pathname === '/home';
    return (
        <Card maxW='sm'>
            <CardBody>
                {product.productImg ? (
                    <Image
                        src={`${process.env.REACT_APP_API_BASE_URL}/${product.productImg}`}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                ) : (
                    <Avatar />
                )}
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{product.name}</Heading>
                    <Center>
                        {product.Category ? (<Text py={1} px={4} borderRadius={'full'} bgColor={'teal.100'} width={'fit-content'}>
                            {product.Category.name}
                        </Text>) : (<Text py={1} px={4} borderRadius={'full'} bgColor={'teal.100'} width={'fit-content'}></Text>)}

                    </Center>
                    {isAdminPage && (
                        <Text color='teal.600'>
                            {product.isActive ? <Text color='teal.600'>Active</Text> : <Text color={'red.600'}>Inactive</Text>}
                        </Text>
                    )}
                    <Text color='teal.600' fontSize='2xl'>
                        Rp. {product.price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    {isCashierPage && (

                        <Button onClick={() => dispatch(addToCart(product))} variant='solid' colorScheme='teal'>
                            Add to cart
                        </Button>
                    )}
                    {isAdminPage && (

                        <Button
                            variant='solid'
                            colorScheme='teal'
                            onClick={() => handleEditModalOpen(product)}
                        >
                            Edit
                        </Button>
                    )}
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
