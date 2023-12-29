import { useState, useEffect } from 'react';
import { navigation } from '../data';
import { useAuth } from '../AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const NavMobile = () => {
  const { isAuthenticated, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
   
  }, [isAuthenticated]);
  

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
    <nav className='h-full'>
      <ul className='flex flex-col justify-center items-center h-full space-y-5'>
      {navigation.map((item, index) => {
          return(
            <li key={index} className='capitalize font-semibold text-blue'>
              <a className='uppercase' href={item.href}>{item.name}</a>
            </li>
          )
        })}
      <li className='flex items-center gap-2'>
        {isAuthenticated ? (
          <>
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

export default NavMobile;