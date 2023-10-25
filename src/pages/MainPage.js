import React, { useEffect, useState } from 'react';
import AuctionList from '../components/AuctionList';
import io from 'socket.io-client';
import { Link} from 'react-router-dom';

const socket = io.connect('http://localhost:5005');

function MainPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [auctions, setAuctions] = useState([]);
    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setAuthenticated(true);
        }


        socket.on('auctionCreatedOrUpdated', (updatedAuction) => {

            setAuctions((prevAuctions) => {

                const existingAuctionIndex = prevAuctions.findIndex(
                    (auction) => auction._id === updatedAuction._id
                );

                if (existingAuctionIndex !== -1) {

                    prevAuctions[existingAuctionIndex] = updatedAuction;
                    return [...prevAuctions];
                } else {

                    return [...prevAuctions, updatedAuction];
                }
            });
        });


        socket.on('productUpdated', (updatedProduct) => {

            setAuctions((prevAuctions) => {
                return prevAuctions.map((auction) => {
                    if (auction.product && auction.product._id === updatedProduct._id) {

                        return {
                            ...auction,
                            product: updatedProduct,
                        };
                    }
                    return auction;
                });
            });
        });

        return () => {
            socket.off('auctionCreatedOrUpdated');
            socket.off('productUpdated');
        };
    }, []);

    return (
        <div className="bg-darkgray text-gold p-4">
            <h2 className="text-4xl font-semibold mb-4">All Auctions:</h2>
            {authenticated ? (
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Link to="/products/all">
                            <button className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded">
                                Products
                            </button>
                        </Link>
                        <Link to="/auctions/create">
                            <button className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded">
                                Create Auction
                            </button>
                        </Link>
                    </div>
                    <AuctionList auctions={auctions} />
                </div>
            ) : (
                <p>You need to log in to access this content.</p>
            )}
        </div>
    );
}

export default MainPage;