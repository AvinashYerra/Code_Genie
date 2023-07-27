import React, { useState } from 'react';
import axios from 'axios';



const InputTextArea = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputExplanation, setOutputExplanation] = useState('');


  const handleChange = (event) => {
    setInputCode(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model:"text-davinci-003",
          prompt: `explain the code  ${inputCode} `,
          max_tokens: 1000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );

      setOutputExplanation(response.data.choices[0].text);
    } catch (error) {
      console.error('Error fetching explanation:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="headingContainer">Code Genie</h1>
      <div className="textarea-container">
        <textarea value={inputCode} onChange={handleChange} placeholder="Enter the code here to get explanation" />
        <div className="button-container">
          <button className="button" onClick={handleSubmit}>
            Get Explanation
          </button>
        </div>
      </div>
      <div className="output-container">{outputExplanation}</div>
    </div>
  );
};


export default InputTextArea;
