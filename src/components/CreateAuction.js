import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/api';
import io from 'socket.io-client'; 

function CreateAuction() {
    const navigate = useNavigate()
    const [authenticated, setAuthenticated] = useState(false);
    const [userProducts, setUserProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [startingBid, setStartingBid] = useState('');
    const [scheduledStartTime, setScheduledStartTime] = useState('');

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            setAuthenticated(true);

            api
                .get('/products/all')
                .then((response) => {
                    setUserProducts(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching user products:', error);
                });
        }
    }, []);

    const handleCreateAuction = () => {
        const userId = localStorage.getItem('id');

        api
            .post('/auctions/create', {
                productId,
                sellerId: userId,
                startingBid: parseFloat(startingBid),
                scheduledStartTime: new Date(scheduledStartTime),
                userId,
                bids: [
                    {
                        bidder: userId,
                        amount: parseFloat(startingBid),
                        timestamp: new Date(), 
                    },
                ],
            })
            .then((response) => {
                console.log('Auction created:', response.data);
                navigate('/main')

                
                const socket = io.connect('http://localhost:5005'); 
                socket.emit('auctionCreatedOrUpdated', response.data);


                socket.disconnect();
            })
            .catch((error) => {
                console.error('Error creating auction:', error);
            });
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-darkgray text-gold">
            <h2 className="text-3xl font-semibold mb-4">Create Auction</h2>
            {authenticated ? (
                <div className="text-white space-y-4">
                    <div className="mb-2">
                        <label className="block">
                            Select a Product:
                            <select
                                className="w-full p-2 rounded bg-darkgray border border-gray-400 text-white"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            >
                                <option value="">Select a product</option>
                                {userProducts.map((product) => (
                                    <option key={product._id} value={product._id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="block">
                            Starting Bid:
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-darkgray border border-gray-400 text-white"
                                value={startingBid}
                                onChange={(e) => setStartingBid(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="block">
                            Scheduled Start Time:
                            <input
                                type="datetime-local"
                                className="w-full p-2 rounded bg-darkgray border border-gray-400 text-white"
                                value={scheduledStartTime}
                                onChange={(e) => setScheduledStartTime(e.target.value)}
                            />
                        </label>
                    </div>
                    <button
                        className="w-full bg-orange hover-bg-gold text-black font-bold py-2 px-4 rounded"
                        onClick={handleCreateAuction}
                    >
                        Create Auction
                    </button>
                </div>
            ) : (
                <p className="text-white">You need to log in to access this content.</p>
            )}
        </div>
    );
}

export default CreateAuction;