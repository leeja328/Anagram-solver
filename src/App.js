import './App.css';
import { useState } from 'react';
// this is the text file below
import raw from './words2.txt';



export default function App() {

  const [char, setChar] = useState();

  const [updated, setUpdated] = useState(char);

  const handleChange = (event) => {
    setChar(event.target.value);
  };

  // Here is where I'm able to console.log the words in the text file
  fetch(raw) 
  .then(r => r.text())
  .then(text => {
    console.log(text)
  });


  // This is the output where when the user clicks it will return the text
  function handleClick() {

    // setUpdated(words_lst);
  }

  return (
    <><div className="App">
      <h1>Anagram Solver</h1>
      <h5>Enter your letters below</h5>
      <input type="text"
                    id="message"
                    name="message"
                    onChange={handleChange}
                    value={char}>
      </input><button onClick={handleClick}>submit</button>
    </div>
    <div>
      <h3 id="result">{updated}</h3>
    </div>
    </>
  );
}


