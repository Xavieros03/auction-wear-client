import React, { useState, useEffect } from 'react';
import api from "./api";
import io from 'socket.io-client'; 

function AuctionList() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const socket = io.connect('http://localhost:5005'); 


        socket.on('auctionCreatedOrUpdated', (updatedAuction) => {
           
            setAuctions((prevAuctions) => [updatedAuction, ...prevAuctions]);
        });

        api.get('/auctions/main',{ timeout: 10000 })
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
                        <h4>Auction ID: {auction._id}</h4>
                        <p>Product: {auction.product}</p>
                        <p>Seller: {auction.seller}</p>
                        <p>Starting Bid: ${auction.startingBid}</p>
                        <p>Starting time: ${auction.startTime}</p>
                       
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AuctionList;