import React from 'react'
import { Button, ButtonGroup, Card, CardBody, CardFooter, Center, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react';

const CardProduct = ({ item }) => {
    return (
        <div>
            <Card maxW='sm'>
                <CardBody>
                    <Image
                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{item.name}</Heading>
                        <Center>
                            <Text py={1} px={4} borderRadius={'full'} bgColor={'teal.100'} width={'fit-content'}>
                                {item.Category.name}
                            </Text>
                        </Center>
                        <Text color='teal.600' fontSize='2xl'>
                            Rp. {item.price}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                        <Button variant='solid' colorScheme='teal'>
                            Add to cart
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CardProduct