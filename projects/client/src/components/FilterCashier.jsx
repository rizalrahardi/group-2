import React, { useState } from "react";
import { Button, Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const FilterCashier = ({ handleFilter, activeFilter, searchQuery, setSearchQuery }) => {
    const isActive = (filterValue) => filterValue === activeFilter;
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value === "") {
            handleFilter("");
        } else {
            handleFilter(`search=${value}`);
        }
    };
    return (
        <Flex>
            <Input
                width={'200px'}
                colorScheme="white"
                variant={'solid'}
                type="text"
                border={'1px'}
                borderColor={'teal.500'}
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search..."
            />
            <Button
                mx={2}
                colorScheme={isActive("username=a-z") ? "teal" : "gray"}
                onClick={() => handleFilter("username=a-z")}
            >
                Sort Username A-Z
            </Button>
            <Button
                mr={2}
                colorScheme={isActive("username=z-a") ? "teal" : "gray"}
                onClick={() => handleFilter("username=z-a")}
            >
                Sort Username Z-A
            </Button>
            <Button
                mr={2}
                colorScheme={isActive("sort=newest") ? "teal" : "gray"}
                onClick={() => handleFilter("sort=newest")}
            >
                Newest
            </Button>
            <Button
                mr={2}
                colorScheme={isActive("sort=oldest") ? "teal" : "gray"}
                onClick={() => handleFilter("sort=oldest")}
            >
                Oldest
            </Button>
            <Button
                mr={2}
                colorScheme={isActive("isActive=true") ? "teal" : "gray"}
                onClick={() => handleFilter("isActive=true")}
            >
                Active
            </Button>
            <Button
                colorScheme={isActive("isActive=false") ? "teal" : "gray"}
                onClick={() => handleFilter("isActive=false")}
            >
                Inactive
            </Button>
        </Flex>
    );
};

export default FilterCashier;
