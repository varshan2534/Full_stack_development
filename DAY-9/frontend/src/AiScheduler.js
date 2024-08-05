import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AiScheduler.css'; // Import the CSS file
import axios from "axios";

const AiScheduler = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    // Check if the browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setPrompt(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error('SpeechRecognition is not supported in this browser.');
    }
  }, []);

  const startDictation = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopDictation = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const parseEventDetails = (content) => {
    console.log("Received content:", content); // Log the content for debugging

    // Example parsing logic for plain text or Markdown - adjust as needed
    const lines = content.split('\n');

    const event = {};
    for (const line of lines) {
      if (line.startsWith('Title:')) {
        event.title = line.replace('Title:', '').trim();
      } else if (line.startsWith('Start:')) {
        event.start = line.replace('Start:', '').trim();
      } else if (line.startsWith('End:')) {
        event.end = line.replace('End:', '').trim();
      } else if (line.startsWith('Description:')) {
        event.description = line.replace('Description:', '').trim();
      }
    }

    // Validate the event structure
    if (event.title && event.start && event.end) {
      return {
        title: event.title,
        start: event.start,
        end: event.end,
        description: event.description || ''
      };
    } else {
      console.error('Invalid event details:', event);
      return null;
    }
  };

  const generateAnswer = async () => {
    setAnswer("loading...");
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC_ah33_xONRXekT1DsDRch4K50Y8uiAPc",
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );

      const content = response.data.candidates[0].content.parts[0].text;
      setAnswer(content);

      // Extract event details from the content
      const eventDetails = parseEventDetails(content);
      if (eventDetails) {
        try {
          await axios.post('http://localhost:8080/api/events', eventDetails);
          console.log('Event added successfully');
        } catch (error) {
          console.error('Error adding event:', error.response ? error.response.data : error.message);
        }
      }
    } catch (error) {
      console.error('Error generating answer:', error.response ? error.response.data : error.message);
      setAnswer('Failed to generate content or add event.');
    }
  };

  return (
    <div className="ai-scheduler-container6">
      <aside className="sidebar6">
        <h2 className='titlet'>ChronoCraft</h2>
        <nav>
          <ul>
            <li><Link to="/contentpage">Home</Link></li>
            <li><Link to="/work">Notes</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/timer">Pomodoro Tracker</Link></li>
            <li><Link to="/todolist">To-Do List</Link></li>
            <li><Link to="/aischeduler">Ai Scheduler</Link></li>
            <li><button onClick={handleLogout} className="only-but6">Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main className="ai-scheduler-content6">
        <div className="card6">
          <h2>Enter Your Prompt</h2>
          <div className="prompt-input">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Speak or type your prompt here..."
            ></textarea>
            <button className="mic-button" onClick={generateAnswer}>🎙</button>
            <button className="mic-button" onClick={isListening ? stopDictation : startDictation}>
              {isListening ? 'Stop Dictation' : 'Start Dictation'}
            </button>
          </div>
          <p>{answer}</p>
        </div>
      </main>
    </div>
  );
};

export default AiScheduler;
