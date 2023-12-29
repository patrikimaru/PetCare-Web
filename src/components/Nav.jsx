import { useState, useEffect } from 'react';
import { navigation } from '../data';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Nav = () => {
  const { isAuthenticated, token, userId, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (isAuthenticated && userId) {
          const response = await axios.get(`http://localhost:3001/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [isAuthenticated, userId]);

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const openRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <nav className='text-[15px]'>
      <ul className='flex gap-x-10 items-center'>
        {navigation.map((item, index) => (
          <li key={index}>
            <a className='capitalize hover:text-orange transition font-semibold' href={item.href}>
              {item.name}
            </a>
          </li>
        ))}
        <li className='flex items-center gap-2'>
          {isAuthenticated ? (
            <>
              <h1 className='text-xl text-blue font-bold mr-2'>{user.username}</h1>
              <button onClick={logout} className='btn bg-logout py-1 font-semibold hover:bg-orange'>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={openLoginModal} className='btn py-1 font-semibold hover:bg-blue'>
                Login
              </button>
              <button onClick={openRegisterModal} className='btn bg-blue py-1 font-semibold hover:bg-orange'>
                Register
              </button>
            </>
          )}
        </li>
      </ul>

      {showLoginModal && <LoginModal closeModal={closeModals} />}
      {showRegisterModal && <RegisterModal closeModal={closeModals} />}
    </nav>
  );
};

export default Nav;
