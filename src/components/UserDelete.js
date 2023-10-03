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
        <div>
            <h2>Delete User</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            {deleteError && <p>{deleteError}</p>}
            <button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete Account'}
            </button>
        </div>
    );
}

export default UserDelete;