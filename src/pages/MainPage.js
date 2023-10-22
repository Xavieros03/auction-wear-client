import React, { useEffect, useState } from 'react';
import AuctionList from '../components/AuctionList';
import io from 'socket.io-client';
import { Link, NavLink } from 'react-router-dom';

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
        <div>
            <h2>Welcome to the Main Page</h2>
            {authenticated ? (
                <>
                    <p>This is the main page content for authenticated users.</p>
                    <Link to="/products/all">Products</Link>
                    <br />
                    <Link to="/auctions/create">Create Auction</Link>
                    <AuctionList auctions={auctions} />
                </>
            ) : (
                <p>You need to log in to access this content.</p>
            )}
        </div>
    );
}

export default MainPage;