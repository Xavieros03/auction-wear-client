import React, { useState, useEffect } from 'react';
import api from "./api";
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

function AuctionList() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const socket = io.connect('http://localhost:5005');


        socket.on('auctionCreatedOrUpdated', (updatedAuction) => {

            setAuctions((prevAuctions) => [updatedAuction, ...prevAuctions]);
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