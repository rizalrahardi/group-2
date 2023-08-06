import React from 'react'
import TransactionGraph from './TransactionGraph'
import ProductSoldTable from './TransactionProductSold'
import SalesReport from './TransactionReport'
import { Button } from '@chakra-ui/react'
// import CreateProduct from './CreateProduct'

const HomeAdmin = () => {

    const handlePrint = () => {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');

        // Set the content to be printed
        printWindow.document.write('<html><head><title>Sales Report</title></head><body>');
        printWindow.document.write('<h1>Transaction Graph</h1>');
        printWindow.document.write('<div>');
        printWindow.document.write(document.getElementById('transaction-graph').innerHTML);
        printWindow.document.write('</div>');

        printWindow.document.write('<h1>Product Sold</h1>');
        printWindow.document.write('<div>');
        printWindow.document.write(document.getElementById('product-sold-table').innerHTML);
        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');

        // Call the print function on the new window
        printWindow.print();
    };
    return (
        <div>
            <div id="transaction-graph">
                <TransactionGraph />
            </div>
            <div id="product-sold-table">
                <ProductSoldTable />
            </div>
            <Button mt={4} colorScheme="teal" onClick={handlePrint}>
                Print Sales Report
            </Button>
        </div>
    )
}

export default HomeAdmin