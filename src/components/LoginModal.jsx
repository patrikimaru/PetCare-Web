import { useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const LoginModal = ({ closeModal }) => {
  const { setAuthInfo } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', formData);

      alert('Login Successful!');
      setAuthInfo(response.data.token, response.data.userId);
      closeModal();
    } catch (error) {
      alert('Login Error!');
    }
  };

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
        <span className="modal-close-btn text-4xl" onClick={closeModal}>
            &times;
          </span>
          <h1 className="font-bold text-blue text-4xl mb-2">Log In</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>

            <button type="submit" className="bg-blue font-semibold text-white p-2 rounded w-full">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
