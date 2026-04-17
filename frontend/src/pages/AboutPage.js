// frontend/src/pages/AboutPage.js
import React from 'react';
import '../App.css';
import cyclingImage1 from '../assets/about-cycling1.jpg';
import cyclingImage2 from '../assets/about-cycling2.jpg';

const AboutPage = () => {
  const cyclingJourney = [
    "Age 10: First bike ride with family, sparking initial interest.",
    "Age 15: Joined a local cycling club, learning basic maintenance.",
    "Age 16: Completed my first long-distance ride, building endurance.",
    "Age 19: Started organizing group rides, sharing passion with others.",
    "Present: Advocate for eco-friendly transport through cycling."
  ];

  return (
    <div className="about-page">
      <main className="main">
        <section className="content-section">
          <h1>About Cycling and My Passion</h1>
          
          <div className="content-section">
            <h2>What I Love About Cycling</h2>
            <p>
              Cycling is more than a hobby; it's a lifestyle that promotes health, 
              sustainability, and adventure. The feeling of wind on your face while 
              pedaling through scenic trails is unmatched. It reduces carbon emissions, 
              strengthens muscles, and clears the mind. As someone passionate about 
              the outdoors, cycling allows me to explore new places while staying fit.
            </p>
            <div className="images">
              <img src={cyclingImage1} alt="Mountain biking trail in forest" />
              <img src={cyclingImage2} alt="Cyclist enjoying sunset ride" />
            </div>
          </div>

          <div className="content-section">
            <h2>My Journey with Cycling</h2>
            <p>I've been cycling since childhood, starting with simple neighborhood rides. Over the years, it has evolved into a key part of my life.</p>
            <ol>
              {cyclingJourney.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>

          <blockquote>
            "Life is like riding a bicycle. To keep your balance, you must keep moving." 
            <cite>– Albert Einstein</cite>
          </blockquote>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;