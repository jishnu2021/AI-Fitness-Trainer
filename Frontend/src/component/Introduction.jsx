import React, { useState } from 'react';
import '../styles/introduction.css';
import img2 from '../images/img2.jpg';

const Introduction = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [output, setOutput] = useState('');

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleStartTask = async () => {
    try {
      const response = await fetch('http://localhost:5000/run-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.text();
      setOutput(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="container">
        <img src={img2} alt="" />
        <button
          className={`collapsible ${activeIndex === 0 ? 'active' : ''}`}
          onClick={() => handleToggle(0)}
        >
          Push-up Tasks
        </button>
        <div className={`content ${activeIndex === 0 ? 'show' : ''}`}>
          <ul>
            <li>Push-ups: 3 sets of 15 reps</li>
            <li>Diamond Push-ups: 3 sets of 10 reps</li>
            <li>Wide Grip Push-ups: 3 sets of 12 reps</li>
          </ul>
          <button
            style={{ backgroundColor: 'blue', padding: 8, color: 'white' }}
            onClick={handleStartTask}
          >
            Start Task
          </button>
        </div>

        <button
          className={`collapsible ${activeIndex === 1 ? 'active' : ''}`}
          onClick={() => handleToggle(1)}
        >
          Pull-up Tasks
        </button>
        <div className={`content ${activeIndex === 1 ? 'show' : ''}`}>
          <ul>
            <li>Pull-ups: 3 sets of 10 reps</li>
            <li>Chin-ups: 3 sets of 8 reps</li>
            <li>Wide Grip Pull-ups: 3 sets of 6 reps</li>
          </ul>
          <button
            style={{ backgroundColor: 'blue', padding: 8, color: 'white' }}
            onClick={handleStartTask}
          >
            Start Task
          </button>
        </div>

        <button
          className={`collapsible ${activeIndex === 2 ? 'active' : ''}`}
          onClick={() => handleToggle(2)}
        >
          Leg Exercises
        </button>
        <div className={`content ${activeIndex === 2 ? 'show' : ''}`}>
          <ul>
            <li>Squats: 3 sets of 20 reps</li>
            <li>Lunges: 3 sets of 15 reps per leg</li>
            <li>Calf Raises: 3 sets of 25 reps</li>
          </ul>
          <button
            style={{ backgroundColor: 'blue', padding: 8, color: 'white' }}
            onClick={handleStartTask}
          >
            Start Task
          </button>
        </div>

        <button
          className={`collapsible ${activeIndex === 3 ? 'active' : ''}`}
          onClick={() => handleToggle(3)}
        >
          Core Exercises
        </button>
        <div className={`content ${activeIndex === 3 ? 'show' : ''}`}>
          <ul>
            <li>Planks: 3 sets of 1 minute</li>
            <li>Russian Twists: 3 sets of 20 reps</li>
            <li>Leg Raises: 3 sets of 15 reps</li>
          </ul>
          <button
            style={{ backgroundColor: 'blue', padding: 8, color: 'white' }}
            onClick={handleStartTask}
          >
            Start Task
          </button>
        </div>
        <div>
          <h3>Python Script Output:</h3>
          <pre>{output}</pre>
        </div>
      </div>
    </>
  );
};

export default Introduction;
