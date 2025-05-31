import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './Manage.css';
import { db } from '../../firebaseConfig';

const Manage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch doctors from Firestore
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doctors'));
        const fetchedDoctors = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = doctors.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedDoctor(null);
  };

  const handleRowClick = (doctor) => {
    setSelectedDoctor({ ...doctor });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedDoctor((prevDoctor) => ({ ...prevDoctor, [name]: value }));
  };

  const handleSave = async () => {
    if (selectedDoctor) {
      try {
        const doctorRef = doc(db, 'doctors', selectedDoctor.id);
        await updateDoc(doctorRef, selectedDoctor);
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor.id === selectedDoctor.id ? selectedDoctor : doctor
          )
        );
        alert('Changes saved successfully!');
      } catch (error) {
        console.error('Failed to save changes:', error);
      }
    }
  };

  const handleDelete = async (doctorId) => {
    try {
      await deleteDoc(doc(db, 'doctors', doctorId));
      setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
      alert('Doctor deleted successfully!');
    } catch (error) {
      console.error('Failed to delete doctor:', error);
    }
  };

  return (
    <div className="paginated-doctor-container">
      <h1>Doctors Table</h1>
      <table className="doctor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Speciality</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>{doctor.location}</td>
              <td>{doctor.status}</td>
              <td>
                <button onClick={() => handleRowClick(doctor)}>View</button>
                <button onClick={() => handleDelete(doctor.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(doctors.length / itemsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(doctors.length / itemsPerPage)}
        >
          Next
        </button>
      </div>

      {/* Doctor Details Section */}
      {selectedDoctor && (
        <div className="doctor-details">
          <h2>Doctor Details</h2>
          <form>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={selectedDoctor.name || ''}
              onChange={handleInputChange}
              required
            />
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={selectedDoctor.dob || ''}
              onChange={handleInputChange}
              required
            />
            <label>Gender:</label>
            <select
              name="gender"
              value={selectedDoctor.gender || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label>Speciality:</label>
            <input
              type="text"
              name="speciality"
              value={selectedDoctor.speciality || ''}
              onChange={handleInputChange}
              required
            />
            <label>Experience (years):</label>
            <input
              type="number"
              name="experience"
              value={selectedDoctor.experience || ''}
              onChange={handleInputChange}
              required
            />
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={selectedDoctor.address || ''}
              onChange={handleInputChange}
              required
            />
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={selectedDoctor.location || ''}
              onChange={handleInputChange}
              required
            />
            <label>Opening Time:</label>
            <input
              type="time"
              name="openingTime"
              value={selectedDoctor.openingTime || ''}
              onChange={handleInputChange}
              required
            />
            <label>Closing Time:</label>
            <input
              type="time"
              name="closingTime"
              value={selectedDoctor.closingTime || ''}
              onChange={handleInputChange}
              required
            />
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={selectedDoctor.contact || ''}
              onChange={handleInputChange}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={selectedDoctor.email || ''}
              onChange={handleInputChange}
              required
            />
            <label>Status:</label>
            <select
              name="status"
              value={selectedDoctor.status || ''}
              onChange={handleInputChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Suspend">Suspend</option>
            </select>
          </form>
          <button onClick={() => setSelectedDoctor(null)}>Close</button>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Manage;
