  import React, { useState, useEffect } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import './AiScheduler.css'; // Import the CSS file

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];

  const predefinedInstruction = `
    Please provide the following event details in JSON format: title, start time, end time, and description.
    Today’s date is ${currentDateString}.
    I want appropriate Title good Grammar, try to limit words but don't change or make the meaning difficult.
    If the time is not mentioned, then set the time as per the universal standards.
    Just give me only in JSON format alone such that I can post in the backend. If extra words are given, then it will cause an error, so strictly follow the JSON format.
    Example format: [
      {
        "title": "Event Title",
        "start": "2024-07-26T00:00",
        "end": "2024-07-26T01:00",
        "description": "Event Description"
      }
    ]
  `;

  const AiScheduler = () => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("");
    const [description, setDescription] = useState("");
    const [recognition, setRecognition] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [userId, setUserId] = useState(null);
    const [events, setEvents] = useState([]);
    const [isApproved, setIsApproved] = useState(false);
    const loggedInUser = localStorage.getItem('username');

    const handleLogout = () => {
      localStorage.removeItem('user');
      navigate('/login');
    };

    useEffect(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
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

    useEffect(() => {
      fetchUserInfo();
    }, [loggedInUser]);

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/login');
        const currentUser = response.data.find(user => user.username === loggedInUser);

        if (currentUser) {
          setUserId(currentUser.id);
        } else {
          console.error('User not found in API response');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const parseResponseToEvents = (responseText) => {
      try {
        const cleanedText = responseText
        .replace(/```json/g, '') // Remove starting ```json
        .replace(/```/g, '')    // Remove remaining ```
        .trim();                // Remove extra spaces
        let events = JSON.parse(cleanedText);

        if (Array.isArray(events)) {
          if (events[0] && events[0].description) {
            setDescription(events[0].description.trim());
          }

          return events.map(event => ({
            userId: userId,
            title: event.title ? event.title.trim() : 'Untitled',
            start: event.start ? event.start.trim() + ':00' : new Date().toISOString().slice(0, 19),
            end: event.end ? event.end.trim() + ':00' : new Date(new Date().getTime() + 3600000).toISOString().slice(0, 19),
            description: event.description ? event.description.trim() : 'No description'
          }));
        } else {
          throw new Error('Parsed data is not an array.');
        }
      } catch (error) {
        console.error('Error parsing response:', error);
        alert('Failed to parse AI response. Please ensure the format is correct.');
        return [];
      }
    };

    const generateAnswer = async () => {
      // setAnswer("Loading...");
      try {
        const fullPrompt = predefinedInstruction + '\n' + prompt;

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyARWROMSPKHahhdQDW193k6WHZ9UBm1bDY', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: fullPrompt
                  }
                ]
              }
            ]
          }),
        });
        const data = await response.json();
        console.log('Full API response:', data);

        if (response.ok) {
          if (data.candidates && data.candidates.length > 0) {
            const responseText = data.candidates[0].content.parts.map(part => part.text).join(' ');
            console.log('Raw response text:', responseText);

            const parsedEvents = parseResponseToEvents(responseText);
            setEvents(parsedEvents); // Store parsed events in state for approval
            setIsApproved(false); // Reset approval state
          } else {
            alert('No valid response received from the AI.');
          }
        } else {
          alert('Error: ' + (data.message || 'Unknown error occurred'));
        }
      } catch (error) {
        console.error('Error during API call:', error);
        alert('API call failed: Network error or server not responding.');
      }
    };

    const approveEvents = async () => {
      try {
        const calendarResponse = await fetch('http://localhost:8080/api/events/multiple', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(events),
        });

        if (calendarResponse.ok) {
          alert('Events added to calendar successfully.');
          setIsApproved(true);
        } else {
          alert('Failed to add events to calendar.');
        }
      } catch (error) {
        console.error('Error adding events to calendar:', error);
        alert('Failed to add events to calendar.');
      }
    };

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

  const handleCancel = () => {
    setEvents([]); // Clear events
    setDescription(""); // Clear description
    setIsApproved(false); // Reset approval state
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
            <h2>Create your schedule!</h2>
            <div className="prompt-input">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="your wish is my command..."
              />
              <button className="mic-button" onClick={generateAnswer}>Schedule it!</button>
              <button
                className="mic-button2"
                onClick={isListening ? stopDictation : startDictation}
              >
                {isListening ? 'Stop Dictation' : 'Start Dictation'}
              </button>
            </div>
            {description && (
              <div className="ai-description">
                <h3>Event Description</h3>
                <p>{description}</p>
              </div>
            )}
            {!isApproved && events.length > 0 && (
              <div>
                <h3>Event Details</h3>
                <table className="scheduler-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr key={index}>
                        <td>{event.title}</td>
                        <td>{event.start}</td>
                        <td>{event.end}</td>
                        <td>{event.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={approveEvents} className='approver'>Approve</button>
                <button onClick={handleCancel} className='cancel-button'>Cancel</button>
              </div>
            )}
            <div
              className="answer-output"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </div>
        </main>
      </div>
    );
  };

  export default AiScheduler;
