import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ManageDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    speciality: '',
    experience: '',
    address: '',
    location: '',
    openingTime: '',
    closingTime: '',
    contact: '',
    email: '',
    status: '',
    password: '',
  });

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch doctor data from Firestore
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const docRef = doc(db, 'doctors', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const doctorData = docSnap.data();
          setFormData(doctorData);
          setOriginalData(doctorData);
        } else {
          alert('Doctor not found');
          navigate('/dashboard');
        }
      } catch (err) {
        alert('Failed to fetch doctor');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const doctorRef = doc(db, 'doctors', id);
      await updateDoc(doctorRef, formData);
      alert('Doctor updated successfully');
      setIsEditing(false);
      setOriginalData(formData);
    } catch (error) {
      alert('Error updating doctor');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await deleteDoc(doc(db, 'doctors', id));
      alert('Doctor deleted');
      navigate('/dashboard');
    } catch (error) {
      alert('Error deleting doctor');
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
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

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Manage Doctor</h2>

      <div className="formInput">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formInput">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formInput">
        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="formInput">
        <label>Speciality</label>
        <input
          type="text"
          name="speciality"
          value={formData.speciality}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formInput">
        <label>Experience (years)</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formInput">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formInput">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formInput">
        <label>Opening Time</label>
        <input
          type="time"
          name="openingTime"
          value={formData.openingTime}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formInput">
        <label>Closing Time</label>
        <input
          type="time"
          name="closingTime"
          value={formData.closingTime}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formInput">
        <label>Contact</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formInput">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="formInput">
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Suspend">Suspend</option>
        </select>
      </div>
      <div className="formInput">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex space-x-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ManageDoctor;
