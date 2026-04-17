import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import heroImage from '../assets/hero-cycling.jpg';

const HomePage = () => {
  const highlights = [
    'Improves cardiovascular health and builds endurance.',
    'Environmentally friendly transportation option.',
    'Offers opportunities for adventure and scenic routes.',
    'Accessible for all ages with proper gear.',
    'Builds community through group rides and events.'
  ];

  const previews = [
    {
      title: 'About Cycling',
      description: 'Learn about my journey and what makes cycling special.',
      link: '/about',
      linkText: 'Read More'
    },
    {
      title: 'Get in Touch',
      description: 'Contact me for resources and connections.',
      link: '/contact',
      linkText: 'Contact'
    },
    {
      title: 'Sign Up',
      description: 'Join for updates on cycling tips and events.',
      link: '/register',
      linkText: 'Register'
    }
  ];

  return (
    <div className="home-page">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Cycling Adventures</h1>
            <p>Discover the thrill of cycling: fitness, freedom, and exploration on two wheels.</p>
            <div className="hero-buttons">
              <Link to="/about" className="cta-button primary">Start Your Journey</Link>
              <Link to="/contact" className="cta-button secondary">Learn More</Link>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src={heroImage} 
              alt="Cyclist riding on scenic mountain road" 
            />
          </div>
        </section>

        {/* Previews Section */}
        <section className="previews">
          {previews.map((preview, index) => (
            <div className="preview-card" key={index}>
              <h2>{preview.title}</h2>
              <p>{preview.description}</p>
              <Link to={preview.link} className="preview-link">
                {preview.linkText} →
              </Link>
            </div>
          ))}
        </section>

        {/* Highlights Section */}
        <section className="highlights">
          <h2>Key Highlights of Cycling</h2>
          <ul>
            {highlights.map((highlight, index) => (
              <li key={index}>
                <span className="highlight-icon">🚴</span>
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HomePage;