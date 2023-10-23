import React, { useEffect, useState } from 'react';
import api from './api';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

function AuctionList() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const socket = io.connect('http://localhost:5005');

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