import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "./api"

function AuctionDetails() {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [isJoinable, setIsJoinable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        
        api.get(`/auctions/${id}`)
            .then((response) => {
                setAuction(response.data);

                
                const isScheduled = response.data.status === 'scheduled';


                setIsJoinable(isScheduled)

                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching auction details:', error);
                setIsLoading(false);
            });
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

    return (
        <div>
            {isLoading ? (
                <p>Loading auction details...</p>
            ) : auction ? (
                <div>
                    <h2>Auction Details</h2>
                    <p>Starting Bid: {auction.startingBid}</p>
                    <p>Participants: {auction.participants}</p>

                        {auction.product && (
                            <div>
                                <p>Product Name: {auction.product.name}</p>
                                <p>Product Description: {auction.product.description}</p>
                                <p>Product Brand: {auction.product.brand}</p>
                            </div>
                        )}

                    {isJoinable ? (
                        <button onClick={joinAuction}>Join Auction</button>
                    ) : (
                        <p>Auction is not joinable at the moment.</p>
                    )}
                </div>
            ) : (
                <p>No auction found.</p>
            )}
        </div>
    );
}

export default AuctionDetails;