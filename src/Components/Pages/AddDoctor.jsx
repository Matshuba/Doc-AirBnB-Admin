import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./AddDoctor.css";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    dob: "",
    gender: "",
    speciality: "",
    experience: "",
    address: "",
    location: "",
    latitude: "", 
    longitude: "",
    openingTime: "",
    closingTime: "",
    contact: "",
    email: "",
    status: "",
    distance: "", 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        if (data.address) {
          setFormData((prev) => ({
            ...prev,
            address: data.display_name || "Unknown Address",
          }));
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "doctors"), {
        ...formData,
        timestamp: new Date(),
      });
      console.log("Doctor added successfully with ID:", docRef.id);
      alert("Doctor added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding doctor:", error.message || error);
      alert(`Failed to add doctor: ${error.message || "Unknown error occurred"}`);
    }
  };

  return (
    <div className="add">
      <div className="newContainer">
        <h1 className="formTitle">Add New Doctor</h1>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Name</label>
                <input type="text" name="doctorName" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="formInput">
                <label>Speciality</label>
                <input type="text" name="speciality" value={formData.speciality} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Experience (years)</label>
                <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Latitude</label>
                <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Longitude</label>
                <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Opening Time</label>
                <input type="time" name="openingTime" value={formData.openingTime} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Closing Time</label>
                <input type="time" name="closingTime" value={formData.closingTime} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Contact</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange} required>
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Suspend">Suspend</option>
                </select>
              </div>
              <button type="button" onClick={fetchLocation}>Use Current Location</button>
              <button type="submit">Add Doctor</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
