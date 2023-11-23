
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {

//varibles
  const [length, setLength] = useState(7)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef

  const passwordRef = useRef(null)


  //Password generator using callback hook
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP"


    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "<>?}{|@#$%^&*()+="

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
   
  }, [length,numAllowed,charAllowed,setPassword])

//copy password to clipboard

const copyPassword = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 99);
  window.navigator.clipboard.writeText(password)
}, [password])
  //call password generator

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

//JSX

  return (

<div className='w-full maz-w-md mx- shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
<h1 className='mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-white-300 md:text-5xl lg:text-6xl dark:text-white'>Password Generator</h1>

<div className='flex shadow rounded-lg overflow-hidden mb-4'>

<input 
type='text'
value={password}
className='outline-none w-full py-1 px-3'
placeholder='Password'
readOnly
ref={passwordRef}
/>

<button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:text-orange-600'>Copy</button>

</div>


<div className='flex text-sm gap-x-2'>
<input 
type='range'
min={6}
max={99}
value={length}
className='curosr-pointer'
onChange={(e) => {setLength(e.target.value)}}
/>

<label>length:{length}</label>
</div>

<div className='flex-items-center gap-x-1'>
<input 
type='checkbox'
defaultChecked={numAllowed}
id='numberInput'
onChange={() => {setNumAllowed((prev) => !prev)}}
/>
<label htmlFor='numberInput'>Numbers</label>
</div>


<div className='flex-items-center gap-x-1'>
<input 
type='checkbox'
defaultChecked={charAllowed}
id='characterInput'
onChange={() => {setCharAllowed((prev) => !prev)}}
/>
<label htmlFor='characterInput'>Characters</label>
</div>


</div>
  );
}

export default App;
