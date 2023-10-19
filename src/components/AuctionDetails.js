import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "./api";
import io from 'socket.io-client';

function AuctionDetails() {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [isJoinable, setIsJoinable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState(0);

    useEffect(() => {
        const socket = io.connect('https://auction-server-project.onrender.com/api');

        api.get(`/auctions/${id}`)
            .then((response) => {
                setAuction(response.data);

                const isScheduled = response.data.status === 'scheduled';
                setIsJoinable(isScheduled);
                setIsLoading(false);

                if (response.data.product) {
                    socket.on(`productUpdated_${response.data.product._id}`, (updatedProduct) => {
                        setAuction((prevAuction) => ({
                            ...prevAuction,
                            product: updatedProduct,
                        }));
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching auction details:', error);
                setIsLoading(false);
            });

        socket.on('auctionUpdated', (updatedAuction) => {
            if (updatedAuction._id === id) {
                setAuction(updatedAuction);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    const joinAuction = () => {
        const userId = localStorage.getItem('id');

        api
            .put(`/auctions/join/${auction._id}`, { userId })
            .then((response) => {
                console.log('Joined the auction:', response.data);
            })
            .catch((error) => {
                console.error('Error joining the auction:', error);
            });
    };

    const placeBid = () => {
        if (auction.status !== 'active') {
            console.log('Auction is not active.');
            return;
        }

        const newBidAmount = parseFloat(bidAmount);
        if (isNaN(newBidAmount) || newBidAmount <= auction.currentBid) {
            console.log('Invalid bid amount.');
            return;
        }

        const userId = localStorage.getItem('id');
        const newBid = {
            bidder: userId,
            amount: newBidAmount,
        };

        api
            .put(`/auctions/bid/${auction._id}`, newBid)
            .then((response) => {
                const updatedAuction = response.data;
                setAuction(updatedAuction);
                console.log('Bid placed successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error placing bid:', error);
            });
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading auction details...</p>
            ) : auction ? (
                <div>
                    <h2>Auction Details</h2>
                    <p>Starting Bid: {auction.startingBid}</p>
                    <p>Participants: {auction.participants.length}</p>
                    <p>Current Bid: {auction.currentBid}</p>

                    {auction.product && (
                        <div>
                            <img src={auction.product.image} alt="" />
                            <p>Product Name: {auction.product.name}</p>
                            <p>Product Description: {auction.product.description}</p>
                            <p>Product Brand: {auction.product.brand}</p>
                        </div>
                    )}

                    {auction.status === 'completed' ? (
                        <p>Winner: {auction.winner ? auction.winner.name : 'No winner'}</p>
                    ) : (
                        <>
                            {isJoinable ? (
                                <div>
                                    <button onClick={joinAuction}>Join Auction</button>
                                </div>
                            ) : (
                                <p>Auction has already started</p>
                            )}

                            {auction.status === 'active' && (
                                <div>
                                    <input
                                        type="number"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                    />
                                    <button onClick={placeBid}>Place Bid</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <p>No auction found.</p>
            )}
        </div>
    );
}

export default AuctionDetails;