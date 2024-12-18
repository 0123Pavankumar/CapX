// Frontend Starter Template
// Install dependencies: npm install axios react-chartjs-2 chart.js @mui/material

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Container, Button, TextField, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const PortfolioTracker = () => {
    const [stocks, setStocks] = useState([]);
    const [form, setForm] = useState({ name: '', ticker: '', buyPrice: '' });
    const [totalValue, setTotalValue] = useState(0);

    // Fetch stocks and calculate portfolio value
    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/stocks'); // Replace with deployed backend URL
                setStocks(response.data);

                const total = response.data.reduce((sum, stock) => sum + stock.currentPrice, 0);
                setTotalValue(total);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        fetchStocks();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add a new stock
    const addStock = async () => {
        try {
            const response = await axios.post('http://localhost:8080/stocks', {
                ...form,
                quantity: 1,
            });
            setStocks([...stocks, response.data]);
            setForm({ name: '', ticker: '', buyPrice: '' });
        } catch (error) {
            console.error('Error adding stock:', error);
        }
    };

    // Delete a stock
    const deleteStock = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/stocks/${id}`);
            setStocks(stocks.filter((stock) => stock.id !== id));
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    // Render portfolio distribution chart
    const portfolioData = {
        labels: stocks.map((stock) => stock.name),
        datasets: [
            {
                label: 'Stock Distribution',
                data: stocks.map((stock) => stock.currentPrice),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    return (
        <Container>
            <h1>Portfolio Tracker</h1>

            <h2>Total Portfolio Value: ${totalValue.toFixed(2)}</h2>

            <Pie data={portfolioData} />

            <h2>Add Stock</h2>
            <TextField
                label="Stock Name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                style={{ marginRight: '10px' }}
            />
            <TextField
                label="Ticker"
                name="ticker"
                value={form.ticker}
                onChange={handleInputChange}
                style={{ marginRight: '10px' }}
            />
            <TextField
                label="Buy Price"
                name="buyPrice"
                type="number"
                value={form.buyPrice}
                onChange={handleInputChange}
                style={{ marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={addStock}>
                Add Stock
            </Button>

            <h2>Current Holdings</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Ticker</TableCell>
                        <TableCell>Buy Price</TableCell>
                        <TableCell>Current Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocks.map((stock) => (
                        <TableRow key={stock.id}>
                            <TableCell>{stock.name}</TableCell>
                            <TableCell>{stock.ticker}</TableCell>
                            <TableCell>${stock.buyPrice}</TableCell>
                            <TableCell>${stock.currentPrice}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => deleteStock(stock.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default PortfolioTracker;
