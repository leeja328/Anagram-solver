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
  
  let results;
  // Here is where I'm able to console.log the words in the text file
    fetch(raw) 
    .then(r => r.text())
    .then(text => {
      results = text;
    });
  

  // This is the output where when the user clicks it will return the text
  function handleClick() {
    let words = results.split("\n");
    
    let l = []
    for (let i = 0; i < char.length; i++) {
      l.push(char[i])
    }
    
    let d = [];

    let count = 0;
    let leng = 0;
    let lst = [];
    
    while (count < words.length) {
      while (leng < (words[count]).length){
          if (l.includes(words[count][leng])) {
              d.push(words[count][leng]);
              l.splice(l.indexOf(words[count][leng]),1)
              leng += 1; }
          else {
              break;
            }
          }
      for (let i = 0; i < l.length; i++){
          d.push(l[i]);
        }
      l = []
      for (let i = 0; i < d.length; i++){
          l.push(d[i]);
        }
      d = []
      if (leng === (words[count]).length && (words[count]).length < 7 && (words[count]).length >= 3){
          lst.push(words[count])
          leng = 0;
          count += 1; }
          
      else {
          leng = 0;
          count += 1;
        }
    }
    
    lst.sort(function(a, b){return b.length - a.length});

    let text = '';
    
    for (let i = 0; i < lst.length - 1; i++) {
      text += (i+1) + ". " + lst[i] + "\n";
    }

    if (text === "") {
      text = "No words were found :( try again!"
    }
    
    console.log(text)
    setUpdated(document.getElementById("result").innerHTML = text);

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
      <h3 class="a" id="result">{updated}</h3>
    </div>
    </>
  );
}


