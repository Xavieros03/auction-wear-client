import React, { useEffect, useState } from 'react';
import api from './api';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

function AuctionList() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const socket = io.connect('wss://auction-server-project.onrender.com');

        socket.on('auctionCreatedOrUpdated', (updatedAuction) => {
            setAuctions((prevAuctions) => [updatedAuction, ...prevAuctions]);

            if (updatedAuction.product) {
                const productId = updatedAuction.product._id;
               
                socket.on(`productUpdated_${productId}`, (updatedProduct) => {
                    setAuctions((prevAuctions) => {
                        const updatedAuctions = prevAuctions.map((prevAuction) => {
                            if (prevAuction._id === updatedAuction._id) {
                                return {
                                    ...prevAuction,
                                    product: updatedProduct,
                                };
                            }
                            return prevAuction;
                        });
                        return updatedAuctions;
                    });
                });
            }
        });

        api.get('/auctions/main', { timeout: 10000 })
            .then((response) => {
                setAuctions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching auctions:', error);
            });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h3>Auction List</h3>
            <ul>
                {auctions.map((auction) => (
                    <li key={auction._id}>
                        {auction.product ? (
                            <div>
                                <p>Product Name: {auction.product.name}</p>
                                <p>Product Description: {auction.product.description}</p>
                                <p>Product Brand: {auction.product.brand}</p>
                            </div>
                        ) : (
                            <p>No product information available</p>
                        )}
                        <Link to={`/auctions/${auction._id}`}>Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AuctionList;