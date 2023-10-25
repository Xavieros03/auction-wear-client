import React, { useEffect, useState } from 'react';
import api from './api';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

function AuctionList() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const socket = io.connect('http://localhost:5005');

        socket.on('auctionCreatedOrUpdated', (responseData) => {
            
            console.log('Received updated data:', responseData);
            setAuctions((prevAuctions) => [responseData, ...prevAuctions]);
            window.location.reload();
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {auctions.map((auction) => (
                <div key={auction._id} className="bg-white border rounded shadow-md p-4">
                    {auction.product ? (
                        <div>
                            <img src={auction.product.image} alt={auction.product.name} className="w-full h-48 object-cover mb-2" />
                            <div className="text-black flex items-center justify-between">
                                <h3 className="text-lg font-semibold mb-2">{auction.product.name}</h3>
                                <h3 className="text-lg font-semibold mb-2">{auction.startingBid}$</h3>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600">No product information available</p>
                    )}
                    <Link to={`/auctions/${auction._id}`}>
                        <div className="flex justify-center mt-4">
                            <button className="bg-orange hover:bg-gold text-white font-bold py-2 px-4 rounded">
                                Details
                            </button>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default AuctionList;