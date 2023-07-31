import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  FormErrorMessage
} from "@chakra-ui/react"
import axios from "axios"
import {useFormik} from "formik"
import * as Yup from "yup"

export const ForgotPassword = () => {
    const toast = useToast();

    const forgot = async () => {
        try{
            
            const res = await axios.put("http://localhost:8000/api/auth/password", {
                email: formik.values.email
        }
            )
            toast({
                title: 'Forgot Password Success.',
                description: "Please check your email to reset your password.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
              formik.resetForm()
              console.log(res)
        }

            catch(err){
                toast({
                    title: `Forgot Password Failed`,
                    description: err.response.data.errors[0].msg,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                console.log(err)
            }
    }
    const formik = useFormik({
        
        initialValues: {
            email: '',
            password: '',
        },
        
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Email is a required field")
                .email('Invalid email format'),
           }),
        
        onSubmit: forgot
    });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
        onSubmit={formik.handleSubmit}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email" isInvalid={formik.touched.email && formik.errors.email}>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            name="email"
            {...formik.getFieldProps('email')}
                onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && <FormErrorMessage>{formik.errors.email}</FormErrorMessage>}
        </FormControl>
        <Stack spacing={6}>
          <Button
            type="submit"
            fontFamily={"heading"}
            mt={8}
            w={"full"}
            bgGradient="linear(to-r, blue.400,teal.400)"
            color={"white"}
            _hover={{
                bgGradient: "linear(to-r, blue.400,teal.400)",
                boxShadow: "xl",
            }}
            onClick= {forgot}
          >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
