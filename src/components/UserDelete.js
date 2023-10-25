import React, { useState } from 'react';
import api from '../components/api';

function UserDelete() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const handleDelete = () => {
        setIsDeleting(true);
        setDeleteError(null);

        
        const userId = localStorage.getItem('id');

        
        api
            .delete(`/user/profile/${userId}`)
            .then(() => {
                
                console.log('User deleted successfully');
            })
            .catch((error) => {
                
                console.error('Error deleting user:', error);
                setDeleteError('Failed to delete user. Please try again later.');
            })
            .finally(() => {
                setIsDeleting(false);
            });
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-darkgray text-gold">
            <h2 className="text-3xl font-semibold mb-4">Delete User</h2>
            <p className=" text-2xl text-white font-semibold mb-4">
                Are you sure you want to delete your account? This action cannot be undone.
            </p>
            {deleteError && <p className="text-red-500">{deleteError}</p>}
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`${isDeleting
                        ? 'bg-orange opacity-50 cursor-not-allowed'
                        : 'bg-orange hover:bg-gold text-black font-bold py-2 px-4 rounded'
                    }`}
            >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
            </button>
        </div>
    );
}

export default UserDelete;