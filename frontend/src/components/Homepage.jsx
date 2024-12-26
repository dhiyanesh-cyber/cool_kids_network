// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from "@nextui-org/react";

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start mt-24 text-dark-text">
            <Card className="w-[600px] px-6 py-8">
                <CardBody>
                    <h1 className="text-3xl font-bold text-center mb-6">Welcome to Cool Kids Network</h1>
                    <p className="text-center mb-8">
                        Join the Cool Kids Network, a place for the coolest kids to connect, share, and grow together. Whether you're a Cool Kid, Cooler Kid, or the Coolest Kid, there's a place for you here!
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/signup" className="bg-dark-text text-dark-bg px-4 py-2 rounded-lg hover:bg-dark-hover transition duration-300">
                            Signup
                        </Link>
                        <Link to="/login" className="bg-dark-text text-dark-bg px-4 py-2 rounded-lg hover:bg-dark-hover transition duration-300">
                            Login
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default HomePage;