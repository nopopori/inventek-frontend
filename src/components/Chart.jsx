import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const monthNames = ['Jan', 'Feb', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

const ChartSection = () => {
    const [monthlyData, setMonthlyData] = useState([
    ]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/product');
            if (res.data.success) {
                const products = res.data.data;
                const now = new Date();
                const year = now.getFullYear();
                const counts = Array(12).fill(0);
                products.forEach(prod => {
                    if (prod.created_at) {
                        const date = new Date(prod.created_at);
                        if (date.getFullYear() === year) {
                            const monthIdx = date.getMonth();
                            counts[monthIdx]++;
                        }
                    }
                });
                setMonthlyData(monthNames.map((name, idx) => ({ name, produk: counts[idx] })));
            }
        } catch (error) {
            console.error('Error ngambil products:', error);
        }
    };

    return (
        <div className="chart-container">
            <h2>Produk Masuk Per Bulan</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                    <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="produk" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

<<<<<<< HEAD
export default ChartSection;
=======
export default ChartSection;
>>>>>>> 0d1d57f44bcf471b2173c8f04e69a2e574892f95
