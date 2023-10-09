import React, { useEffect, useState } from 'react';
import api from '../components/api';
import io from 'socket.io-client'; 

function CreateAuction() {
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
            })
            .then((response) => {
                console.log('Auction created:', response.data);

                
                const socket = io.connect('http://localhost:5005'); 
                socket.emit('auctionCreatedOrUpdated', response.data);


                socket.disconnect();
            })
            .catch((error) => {
                console.error('Error creating auction:', error);
            });
    };

    return (
        <div>
            <h2>Welcome to the Main Page</h2>
            {authenticated ? (
                <>
                    <p>This is the main page content for authenticated users.</p>
                    <div>
                        <h3>Create Auction</h3>
                        <label>
                            Select a Product:
                            <select
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
                        <label>
                            Starting Bid:
                            <input
                                type="text"
                                value={startingBid}
                                onChange={(e) => setStartingBid(e.target.value)}
                            />
                        </label>
                        <label>
                            Scheduled Start Time:
                            <input
                                type="datetime-local"
                                value={scheduledStartTime}
                                onChange={(e) => setScheduledStartTime(e.target.value)}
                            />
                        </label>
                        <button onClick={handleCreateAuction}>Create Auction</button>
                    </div>
                </>
            ) : (
                <p>You need to log in to access this content.</p>
            )}
        </div>
    );
}

export default CreateAuction;