import React, { Component } from 'react';
import './App.css';





class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: null,
      showWelcome: true,
      messages:{
        question:"",
        answer:""
      }
    };
  }

  componentDidMount() {
    // Hide the welcome animation after 4 seconds
    this.timer = setTimeout(() => {
      this.setState({ showWelcome: false });
    }, 4000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = () => {
    const url = 'http://localhost:8080/members';

    // Data to send in the request body
    const data = {
      question: 'How to make Dosa?'
    };

    // Configure the request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    // Send the POST request
    fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed with status code ' + response.status);
        }
      })
      .then(responseData => {
        this.setState({ responseData });
      })
      .catch(error => {
        console.error(error);
      });
  };






  handleSubmit =  (event) => {
    event.preventDefault();
    const input = event.target.elements[0].value;
    event.target.elements[0].value="";
  
    if (input) {
      const { messages } = this.state;
      this.appendQuestion(input);
      this.setState((prevState) => ({
        messages: {
          ...prevState.messages,
          question: input
        }
      }),async ()=>{
        const url = 'http://localhost:8080/members';
        const {messages} = this.state;
      const data = {
        question: messages.question
      };
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
  
      try {
        // Send the POST request
        const response = await fetch(url, requestOptions);
  
        if (response.ok) {
          const responseData = await response.json();
          const newAnswer = responseData.result; // Get the answer from the response data
          this.appendMessage(messages.question, newAnswer); // Append the question and answer
  
          this.setState({
            messages: {
              question: input,
              answer: newAnswer
            }
          });
        } else {
          throw new Error('Request failed with status code ' + response.status);
        }
      } catch (error) {
        console.error(error);
      }
      });
    }
  };










  
  





















  

  appendMessage = (question, answer) => {
    const chatbox = document.querySelector('.chatbox');
    const answerElement = document.createElement('div');
    answerElement.classList.add("message-cont");
    const answerElementImg = document.createElement('img');
    answerElementImg.src="https://res.cloudinary.com/nihars3/image/upload/v1684595335/DP-modified_vhu4ws.png";
    answerElement.appendChild(answerElementImg);
    answerElementImg.classList.add("message-cont-img");
    const answerElementh1 = document.createElement('h1');
    answerElement.appendChild(answerElementh1);
    answerElementh1.classList.add("message-cont-h1")
    answerElementh1.textContent = answer;
    chatbox.appendChild(answerElement);
  };

  appendQuestion = (question) => {
    const chatbox = document.querySelector('.chatbox');
    const questionElement = document.createElement('div');
    questionElement.classList.add("question-cont");
    const questionElementh1 = document.createElement('h1');
    questionElement.appendChild(questionElementh1);
    questionElementh1.classList.add("question-cont-h1");
    const questionElementImg = document.createElement('img');
    questionElementImg.src="https://res.cloudinary.com/nihars3/image/upload/v1642694540/My%20pics/ProfilePictureMaker_xhc1gm.png";
    questionElement.appendChild(questionElementImg);
    questionElementImg.classList.add("question-cont-img");
    questionElementh1.textContent = question;
    chatbox.appendChild(questionElement);
  }











  renderResultContent() {
    const { responseData } = this.state;
    if (responseData && responseData.result) {
      // Remove double quotes from the content
      const content = responseData.result.replace(/"/g, '');

      return (
        <div>
          <h2>Response Data:</h2>
          <pre>{content}</pre>
        </div>
      );
    }
    return null;
  }

  render() {
    const { showWelcome,messages } = this.state;

    return (
      <div>
        {showWelcome ? (
          <div className='app'>
            <div className="welcome-animation">
                <h1 className="nihar-bard-h1">Welcome to Nihar's Bard!</h1>
            </div>
          </div>
        ) : (
          <div className="main">
            <div className='top'>
                <h1 className='header-h1'>Nihar's Bard</h1> 
                <p className='exp-h1'>Experiment</p>
            </div>
            <div className='chatbox'>
                
            </div>
            <div className='footer'>
                <form className="user-input"  onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Type your message..."/>
                    <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                    </svg>
                    </button>
                </form>
            </div>
          </div>
        )}
        
      </div>
    );
  }
}

export default MyComponent;







// {/* Button to trigger the POST request */}
// <button onClick={this.handleButtonClick}>Send POST Request</button>

// {/* Display the content of the 'result' key */}
// {this.renderResultContent()}