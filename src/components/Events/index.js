import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // Assuming this file contains all necessary styles

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({ title: '', date: '', location: '', description: '' });
  const [weatherData, setWeatherData] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };

    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (currentEvent) {
        await axios.put(`http://localhost:5000/api/events/${currentEvent._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/events', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setFormData({ title: '', date: '', location: '', description: '' });
      setCurrentEvent(null);
      setShowForm(false);

      const response = await axios.get('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to save event', error);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      date: event.date.split('T')[0], // Convert ISO date to yyyy-MM-dd
      location: event.location,
      description: event.description,
    });
    setCurrentEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axios.get('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to delete event', error);
    }
  };

  const fetchWeather = async (location, date) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/weather?location=${location}&date=${date}`);
      setWeatherData(response.data);
      setWeatherError(null);
    } catch (error) {
      setWeatherError('Failed to fetch weather data');
      setWeatherData(null);
      console.error('Failed to fetch weather data', error);
    }
  };

  return (
    <div className="events">
      <div className="sidebar">
        <button onClick={() => setShowForm(true)} className="add-event-btn">Add Event</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="event-form">
          <h2>{currentEvent ? 'Edit Event' : 'Create Event'}</h2>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Event Title"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            placeholder="Event Date"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Event Location"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Event Description"
          />
          <button type="submit">{currentEvent ? 'Update Event' : 'Create Event'}</button>
          <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
        </form>
      )}

      <div className="event-list">
        {events.map(event => (
          <div key={event._id} className="event-item">
            <h3>{event.title}</h3>
            <p>Date: {event.date.split('T')[0]}</p> {/* Convert ISO date to yyyy-MM-dd */}
            <p>Location: {event.location}</p>
            <p>{event.description}</p>
            <button onClick={() => handleEdit(event)} className="edit-btn">Edit</button>
            <button onClick={() => handleDelete(event._id)} className="delete-btn">Delete</button>
            <button onClick={() => fetchWeather(event.location, event.date.split('T')[0])} className="weather-btn">Get Weather</button> {/* Convert ISO date to yyyy-MM-dd */}
            {weatherData && (
              <div className="weather-info">
                <h4>Weather Info</h4>
                <p>Temperature: {weatherData.main.temp}K</p>
                <p>Description: {weatherData.weather[0].description}</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
              </div>
            )}
            {weatherError && <p className="weather-error">{weatherError}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
