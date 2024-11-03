import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/messages', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                console.error('Error fetching messages');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleViewMore = (message) => {
        setSelectedMessage(message);
    };

    const handleDeleteConfirmation = (messageId) => {
        setMessageToDelete(messageId);
        setShowConfirmDelete(true);
    };

    const handleDelete = async () => {
        if (!messageToDelete) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/messages/${messageToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setMessages(messages.filter((message) => message.id !== messageToDelete));
            } else {
                console.error('Error deleting message');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setShowConfirmDelete(false);
            setMessageToDelete(null);
        }
    };

    const closeModal = () => {
        setSelectedMessage(null);
    };

    return (
        <div className="font-montserrat bg-gradient-to-b from-white via-[#E9D8C9] to-[#B39B84] min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Tableau de bord - Admin</h1>
                <div className="bg-white shadow-md rounded my-6">
                    <table className="text-left w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Nom</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Email</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Sujet</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Message</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Date</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message) => (
                                <tr key={message.id} className="hover:bg-grey-lighter">
                                    <td className="py-4 px-6 border-b border-grey-light">{message.name}</td>
                                    <td className="py-4 px-6 border-b border-grey-light">{message.email}</td>
                                    <td className="py-4 px-6 border-b border-grey-light">{message.subject}</td>
                                    <td className="py-4 px-6 border-b border-grey-light">
                                        {message.message.length > 50 ? (
                                            `${message.message.substring(0, 50)}...`
                                        ) : (
                                            message.message
                                        )}
                                    </td>
                                    <td className="py-4 px-6 border-b border-grey-light">{new Date(message.created_at).toLocaleString()}</td>
                                    <td className="py-4 px-6 border-b border-grey-light flex gap-2">
                                        <button
                                            onClick={() => handleViewMore(message)}
                                            className="text-white bg-[#593B21] hover:bg-[#4a331b] py-1 px-3 rounded"
                                        >
                                            Voir plus
                                        </button>
                                        <button
                                            onClick={() => handleDeleteConfirmation(message.id)}
                                            className="text-white bg-red-600 hover:bg-red-700 py-1 px-3 rounded"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                        <h2 className="text-2xl font-bold mb-4">Détails du message</h2>
                        <p><strong>Nom :</strong> {selectedMessage.name}</p>
                        <p><strong>Email :</strong> {selectedMessage.email}</p>
                        <p><strong>Sujet :</strong> {selectedMessage.subject}</p>
                        <p><strong>Date :</strong> {new Date(selectedMessage.created_at).toLocaleString()}</p>
                        <p><strong>Message :</strong> {selectedMessage.message}</p>
                        <button
                            onClick={closeModal}
                            className="mt-4 text-white bg-[#593B21] hover:bg-[#4a331b] py-2 px-4 rounded"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            {showConfirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <h2 className="text-lg font-bold mb-4">Êtes-vous sûr de vouloir supprimer ce message ?</h2>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleDelete}
                                className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
                            >
                                Oui
                            </button>
                            <button
                                onClick={() => setShowConfirmDelete(false)}
                                className="text-white bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded"
                            >
                                Non
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
