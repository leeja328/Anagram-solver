import './App.css';
import { useRef, useState } from 'react';
// this is the text file below
import raw from './words2.txt';
// import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';



export default function App() {

  const charRef = useRef();
  
  const [result, setResult] = useState('');

  // const handleChange = (event) => {
  //   setChar(event.target.value);
  // };
  
  let results;
  // Here is where I'm able to pull the words in the text file
    fetch(raw) 
    .then(r => r.text())
    .then(text => {
      results = text;
    });
  

  // This is the output where when the user clicks it will return the text
  function handleClick(e) {
    e.preventDefault()
    console.log(charRef)
    let words = results.split("\n");
    console.log(charRef.current.value.length)
    let l = []
    for (let i = 0; i < charRef.current.value.length; i++) {
      l.push(charRef.current.value[i])
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
    const result = text
    setResult(result);

    };

  
  return (
    <>
    
    <div className="App">
      <form onSubmit={handleClick}>
        <div className='title'>
          <h1 id='the_title'>Anagram Solver</h1>
          <h1 id='about'>?</h1>
        </div>
        <h5>Enter 6 letters below to find all the word combinations you can make!</h5>
        <h5>i.e. sradob</h5>
        <div className='answer'>
        {/* <Input defaultValue="Hello world" inputRef={inputsRef} /> */}
        {/* <input inputRef={charRef}></input> */}
        <TextField id="user_guess"  variant="standard" inputRef={charRef} />
        {/* <Button variant="contained" id='submit_button'>Submit</Button> */}
        <button>Submit</button>
        </div>
      </form>
    </div>
    <div>
      <h3 class="a" id="result">{result}</h3>
    </div>
    
    </>
  );
}


