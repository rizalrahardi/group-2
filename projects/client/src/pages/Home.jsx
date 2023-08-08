import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import NavbarCashier from "../components/NavbarCashier";
import Products from "../components/Products";
import Cart from "../components/Cart";

const Home = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/auth/user`,
        { headers }
      );
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (user.role === "admin") {
    alert("You do not have permission to access this page");
    navigate("/admin");
  }

  return (
    <>
      <NavbarCashier user={user} />
      <Flex bg={useColorModeValue("gray.100", "gray.900")} direction={{ base: "column", md: "row" }}>
        <Box flex="1"p="4">
          <Products />
        </Box>
        <Box p="4">
          <Cart />
        </Box>
      </Flex>
    </>
  );
};

export default Home;
