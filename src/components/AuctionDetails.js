import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './api';
import io from 'socket.io-client';


function AuctionDetails() {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [isJoinable, setIsJoinable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState(0);
    const [socket, setSocket] = useState(null);
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        const socket = io.connect('wss://auction-server-project.onrender.com');
        setSocket(socket);

        api.get(`/auctions/${id}`)
            .then((response) => {
                setAuction(response.data);

                const isScheduled = response.data.status === 'scheduled';
                setIsJoinable(isScheduled);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching auction details:', error);
                setIsLoading(false);
            });

        socket.on(`participantsUpdated_${id}`, (updatedParticipants) => {
            setAuction((prevAuction) => ({
                ...prevAuction,
                participants: updatedParticipants,
            }));
        });

        socket.on('auctionDetails', (updatedAuction) => {
            if (updatedAuction._id === id) {
                setAuction(updatedAuction);
            }
        });

        socket.on('bidPlaced', (updatedAuction) => {
            console.log('Bid placed event received:', updatedAuction);
            setAuction(updatedAuction);
        });

        socket.on('auctionWinner', (auction) => {
            if (auction._id === id) {
                setAuction(auction);
            }
            if (auction.status === 'completed') {
                window.location.reload();
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

   
    useEffect(() => {
        if (!auction || auction.status !== 'scheduled') return;

        const interval = setInterval(() => {
            const currentTimestamp = new Date();
            const scheduledStartTime = new Date(auction.scheduledStartTime);

            const timeRemaining = scheduledStartTime - currentTimestamp;

            if (timeRemaining <= 0) {
                clearInterval(interval);
                window.location.reload();
            } else {
                setCountdown(timeRemaining);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [auction]);


    const joinAuction = () => {
        const userId = localStorage.getItem('id');

        api.put(`/auctions/join/${auction._id}`, { userId })
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

        api.put(`/auctions/bid/${auction._id}`, newBid)
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
        <div className="h-screen flex bg-darkgray text-white p-4 items-center">
            {isLoading ? (
                <p>Loading auction details...</p>
            ) : auction ? (
                <div className="w-full text-2xl flex space-x-4">
                    <div className="w-1/2">
                        {auction.product && (
                            <div className="h-150 w-200">
                                <img
                                    src={auction.product.image}
                                    alt=""
                                    className="w-full h-100 object-cover"
                                />
                            </div>
                        )}
                    </div>
                    <div className="w-1/2">
                        <div className="mb-8">
                            <h2 className="text-3xl mb-8 font-semibold text-gold">Auction Details</h2>
                            {auction.product && (
                                <>
                                    <p className="text-1xl mb-6 font-semibold">{auction.product.name}</p>
                                    <p className="text-lg mb-6">Description: {auction.product.description}</p>
                                    <p className="text-lg mb-6">Brand: {auction.product.brand}</p>
                                </>
                            )}
                        </div>
                        <hr className="my-8" />
                        <div>
                            <h2 className="text-3xl mb-8 font-semibold text-orange">Auction Status</h2>
                            {countdown !== null && auction.status === 'scheduled' ? (
                                <div>
                                    <p className="text-lg mb-6">Auction starts in {Math.floor(countdown / 1000)} seconds</p>
                                    <p className="text-lg mb-6">Participants: {auction.participants.length}</p>
                                    <p className="text-lg mb-6">Starting Bid: {auction.startingBid}$</p>
                                    <p className="text-lg mb-6">Current Bid: {auction.currentBid}$</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-lg mb-6">Participants: {auction.participants.length}</p>
                                    <p className="text-lg mb-6">Starting Bid: {auction.startingBid}$</p>
                                    <p className="text-lg mb-6">Current Bid: {auction.currentBid}$</p>
                                </>
                            )}

                            {auction.status === 'completed' ? (
                                <p className="text-lg mb-6">Winner: {auction.winner ? auction.winner.name : 'No winner'}</p>
                            ) : (
                                <>
                                    {isJoinable ? (
                                        <div>
                                            <button
                                                className="bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded mb-2"
                                                onClick={joinAuction}
                                            >
                                                Join Auction
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-lg mb-2">You can place bids now</p>
                                    )}

                                    {auction.status === 'active' && (
                                        <div>
                                            <input
                                                type="number"
                                                className="p-2 rounded text-black"
                                                value={bidAmount}
                                                onChange={(e) => setBidAmount(e.target.value)}
                                            />
                                            <button
                                                className="bg-orange hover-bg-gold text-black font-bold py-2 px-4 rounded"
                                                onClick={placeBid}
                                            >
                                                Place Bid
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p>No auction found.</p>
            )}
        </div>
    );
}

export default AuctionDetails;