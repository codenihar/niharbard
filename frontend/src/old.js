import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    const url = 'http://localhost:8080/members';

    const question = {
      question: 'What is Happiness?'
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    };

    fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed with status code ' + response.status);
        }
      })
      .then(responseData => {
        setData(responseData.response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {data}
    </div>
  );
}

export default App;
