import  { useState, useEffect } from 'react';
import { bundleData } from '../data';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import DogImg from '../assets/img/dogs/dog-appointment.png';

const Appointment = () => {
    const { isAuthenticated, token, userId } = useAuth();
    const [minDate, setMinDate] = useState(getCurrentDateTime());
    const [formData, setFormData] = useState({
      dogCategory: '',
      service: '',
      schedule: '',
      price: 0,

    });
  
    useEffect(() => {
      if (formData.dogCategory && formData.service) {
        const selectedBundle = bundleData.find((bundle) => bundle.name === formData.dogCategory);
        const selectedService = selectedBundle?.services.find((service) => service.name === formData.service);
        const price = selectedService?.price || 0;
  
        setFormData((prevData) => ({
          ...prevData,
          price: price,
        }));
      }
    }, [formData.dogCategory, formData.service]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleDateTimeChange = (e) => {
      const selectedDate = new Date(e.target.value);
      const formattedDate = selectedDate.toISOString();
  
      setFormData({
        ...formData,
        schedule: formattedDate,
      });
  
      setMinDate(getCurrentDateTime());
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!isAuthenticated) {
        alert('Please log in to create an appointment.');
        return;
      }
    
      const confirmed = window.confirm('Are you sure you want to create this appointment?');
    
      if (!confirmed) {
        return;
      }
    
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
    
        const appointmentData = {
          dogCategory: formData.dogCategory,
          service: formData.service,
          schedule: formData.schedule,
          price: formData.price,
          status: 'unconfirmed',
          user: userId,
        };
    
        await axios.post('http://localhost:3001/api/appointments', appointmentData, { headers });
    
        alert('Appointment created successfully!');
      } catch (error) {
        alert('Error creating appointment!', error);
      }
    };
    
  
    function getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
  
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

  return (
    <section className='bg-yellow-secondary py-12 lg:pb-12 lf:mt-32 relative min-h[584]' id='appointment'>
      <div className='container mx-auto'>
        <div className='hidden w-full max-w-[790px] mx-auto lg:flex justify-center'>
          <img src={DogImg} alt="" />
        </div>
        <form className='bg-yellow py-8 px-6 w-full max-w-[790px] h-[500px] mx-auto lg:-mt-5 rounded-[60px] text-center flex flex-col justify-start items-center gap-y-4' onSubmit={handleSubmit}>
          <h2 className='h2 py-4'>Get an Appointment</h2>
          <select id="dog-category" name="dogCategory" className='input-control' onChange={handleInputChange}>
            <option value="">Select a Dog Category</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="big">Big</option>
            <option value="super">Super</option>
          </select>
          <select id="services" name="service" className='input-control' onChange={handleInputChange}>
            <option value="">Select a service</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="royal">Royal</option>
          </select>
          <input
            className='input-control'
            type="datetime-local"
            name="schedule"
            placeholder='Schedule'
            min={minDate}
            onChange={handleDateTimeChange}
          />
            {formData.price !== 0 && (
              <p className='text-2xl font-semibold'>Total: ₱{formData.price}</p>
            )}
          <button type="submit" className='btn w-full max-w-[514px] font-semibold'>Send</button>
        </form>
      </div>
    </section>
  );
};

export default Appointment;
