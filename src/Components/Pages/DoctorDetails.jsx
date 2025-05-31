import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const DoctorDetails = ({ selectedDoctor }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(selectedDoctor || null);
    const [loading, setLoading] = useState(!selectedDoctor);

    useEffect(() => {
        if (!selectedDoctor) {
            const fetchDoctor = async () => {
                try {
                    const docRef = doc(db, 'doctors', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setDoctor(docSnap.data());
                    } else {
                        alert('Doctor not found');
                        navigate('/dashboard/doctors');
                    }
                } catch (err) {
                    alert('Failed to fetch doctor');
                } finally {
                    setLoading(false);
                }
            };
            fetchDoctor();
        }
    }, [id, navigate, selectedDoctor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        if (!doctor.name || !doctor.email) {
            alert("Name and Email are required");
            return;
        }

        try {
            const doctorRef = doc(db, 'doctors', id);
            await updateDoc(doctorRef, doctor);
            alert('Doctor updated');
            navigate('/dashboard/doctors');
        } catch (error) {
            alert('Error updating doctor');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this doctor?')) return;
        try {
            await deleteDoc(doc(db, 'doctors', id));
            alert('Doctor deleted');
            navigate('/dashboard/doctors');
        } catch (error) {
            alert('Error deleting doctor');
        }
    };

    if (loading) {
        return (
            <div className="p-4 max-w-2xl mx-auto animate-pulse space-y-4">
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-full"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
        );
    }

    if (!doctor) return null;

    return (
        <div className="p-4 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">Doctor Details</h2>

            <input
                type="text"
                name="name"
                value={doctor.name || ''}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2 w-full rounded"
            />
            <input
                type="text"
                name="surname"
                value={doctor.surname || ''}
                onChange={handleChange}
                placeholder="Surname"
                className="border p-2 w-full rounded"
            />
            <input
                type="email"
                name="email"
                value={doctor.email || ''}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 w-full rounded"
            />
            <input
                type="text"
                name="contact"
                value={doctor.contact || ''}
                onChange={handleChange}
                placeholder="Contact"
                className="border p-2 w-full rounded"
            />
            <input
                type="text"
                name="address"
                value={doctor.address || ''}
                onChange={handleChange}
                placeholder="Address"
                className="border p-2 w-full rounded"
            />
            <input
                type="text"
                name="location"
                value={doctor.location || ''}
                onChange={handleChange}
                placeholder="Location"
                className="border p-2 w-full rounded"
            />
            <input
                type="text"
                name="specialty"
                value={doctor.specialty || ''}
                onChange={handleChange}
                placeholder="Specialty"
                className="border p-2 w-full rounded"
            />
            <textarea
                name="biography"
                value={doctor.biography || ''}
                onChange={handleChange}
                placeholder="Biography"
                className="border p-2 w-full rounded"
            />

            <div className="flex space-x-4">
                <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update
                </button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete
                </button>
                <button onClick={() => navigate('/dashboard/doctors')} className="bg-gray-400 text-white px-4 py-2 rounded">
                    Cancel
                </button>
            </div>

            <div className="mt-6 p-6 border rounded-lg shadow bg-gray-50">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">Doctor Info</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p><strong>Name:</strong> {doctor.name || 'N/A'}</p>
                    <p><strong>Date of Birth:</strong> {doctor.dob || 'N/A'}</p>
                    <p><strong>Gender:</strong> {doctor.gender || 'N/A'}</p>
                    <p><strong>Specialty:</strong> {doctor.specialty || 'N/A'}</p>
                    <p><strong>Experience:</strong> {doctor.experience ? `${doctor.experience} years` : 'N/A'}</p>
                    <p><strong>Address:</strong> {doctor.address || 'N/A'}</p>
                    <p><strong>Location:</strong> {doctor.location || 'N/A'}</p>
                    <p><strong>Opening Time:</strong> {doctor.openingTime || 'N/A'}</p>
                    <p><strong>Closing Time:</strong> {doctor.closingTime || 'N/A'}</p>
                    <p><strong>Contact:</strong> {doctor.contact || 'N/A'}</p>
                    <p><strong>Email:</strong> {doctor.email || 'N/A'}</p>
                    <p><strong>Status:</strong> {doctor.status || 'N/A'}</p>
                    <p><strong>Password:</strong> ******</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
