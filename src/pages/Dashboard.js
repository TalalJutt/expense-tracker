import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore/lite";
import { fireStore } from '../config/firebase';

export default function Dashboard() {
    const [metrics, setMetrics] = useState({
        totalExpense: 0,
        totalCount: 0,
        averageExpense: 0,
        loading: true
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const querySnapshot = await getDocs(collection(fireStore, "products"));
                let total = 0;
                let count = 0;

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const price = parseFloat(data.price) || 0;
                    total += price;
                    count++;
                });

                setMetrics({
                    totalExpense: total,
                    totalCount: count,
                    averageExpense: count > 0 ? (total / count).toFixed(2) : 0,
                    loading: false
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setMetrics(prev => ({ ...prev, loading: false }));
            }
        };

        fetchMetrics();
    }, []);

    if (metrics.loading) {
        return (
            <main>
                <div className="spinner-border text-white" role="status">
                    <span className="visually-hidden">Loading Dashboard...</span>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className='py-5 w-100'>
                <div className='container'>
                    <div className='row mb-4'>
                        <div className='col'>
                            <h1 className='text-white text-center mb-0'>Dashboard</h1>
                            <p className='text-center text-white-50'>Overview of your expenses</p>
                            <hr className='border-light opacity-25' />
                        </div>
                    </div>

                    <div className='row g-4'>
                        {/* Total Expense card */}
                        <div className='col-12 col-md-4'>
                            <div className='card h-100 text-center p-4'>
                                <div className='card-body'>
                                    <h5 className='text-white-50 mb-3 text-uppercase small ls-wide'>Total Expenditure</h5>
                                    <h2 className='text-white display-6 fw-bold'>PKR{metrics.totalExpense.toLocaleString()}</h2>
                                </div>
                            </div>
                        </div>

                        {/* Total Count Card */}
                        <div className='col-12 col-md-4'>
                            <div className='card h-100 text-center p-4'>
                                <div className='card-body'>
                                    <h5 className='text-white-50 mb-3 text-uppercase small ls-wide'>Total Items</h5>
                                    <h2 className='text-white display-6 fw-bold'>{metrics.totalCount}</h2>
                                </div>
                            </div>
                        </div>

                        {/* Average Expense Card */}
                        <div className='col-12 col-md-4'>
                            <div className='card h-100 text-center p-4'>
                                <div className='card-body'>
                                    <h5 className='text-white-50 mb-3 text-uppercase small ls-wide'>Average per Item</h5>
                                    <h2 className='text-white display-6 fw-bold'>PKR{metrics.averageExpense}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row mt-5'>
                        <div className='col-12 col-lg-8 offset-lg-2'>
                            <div className='card p-4'>
                                <h4 className='mb-3'>Expense Productivity</h4>
                                <p className='text-white-50 small mb-0'>
                                    Your current tracking system is monitoring <strong>{metrics.totalCount}</strong> items with a total value of <strong>PKR{metrics.totalExpense.toLocaleString()}</strong>. Keep managing your products to stay on top of your budget.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
