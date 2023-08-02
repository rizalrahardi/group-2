import React from 'react';
import { Box, Select, Flex, Button, Input } from '@chakra-ui/react';

const FilterProducts = ({
    search,
    setSearch,
    categoryId,
    setCategoryId,
    price,
    setPrice,
    sort,
    setSort,
    name,
    setName,
}) => {
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    return (
        <Box p="4" mb="4" borderWidth="1px" rounded="lg">
            <Flex alignItems="center" mb="2">
                <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={handleSearchChange}
                    mr="2"
                />
                <Select
                    placeholder="Select Category"
                    value={categoryId}
                    onChange={handleCategoryChange}
                    mr="2"
                >
                    <option value="">All Categories</option>
                    {/* Add options for each category */}
                </Select>
                <Select
                    placeholder="Select Price"
                    value={price}
                    onChange={handlePriceChange}
                    mr="2"
                >
                    <option value="">All Prices</option>
                    <option value="asc">Lowest Price</option>
                    <option value="desc">Highest Price</option>
                </Select>
                <Select
                    placeholder="Sort by"
                    value={sort}
                    onChange={handleSortChange}
                    mr="2"
                >
                    <option value="">Default</option>
                    <option value="asc">Oldest</option>
                    <option value="desc">Newest</option>
                </Select>
                <Select placeholder="Name" value={name} mr="2" onChange={handleNameChange}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </Select>
            </Flex>
        </Box>
    );
};

export default FilterProducts;
