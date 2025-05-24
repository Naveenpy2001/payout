import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogIn } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Companies', path: '/companies' },
    { name: 'Post a Job', path: '/employer/login' },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.header 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.04 }}
        >
          <a href="/">Payout<span>Job</span></a>
        </motion.div>

        <nav className="desktop-nav">
          <ul>
            {navLinks.map((link) => (
              <motion.li 
                key={link.name}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={link.path}>{link.name}</a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="auth-buttons">
          <a href="/login">
          <motion.button 
            className="login-btn cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogIn /> Login
          </motion.button>
          </a>
         <a href="/register">
          <motion.button 
            className="register-btn cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiUser /> Register
          </motion.button>
         </a>
         
        </div>
            

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
          >
            <ul>
              {navLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <a href={link.path}>{link.name}</a>
                </motion.li>
              ))}
              <li>
                <a href="/login">
                <button className="mobile-login-btn">
                  <FiLogIn /> Login
                </button>
                </a>
              </li>
              <li>
                <button className="mobile-register-btn">
                  <FiUser /> Register
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;