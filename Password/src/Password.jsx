import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function Password() {
    const [password,setPassword]=useState("");
    const [length,setLength]=useState(8);
    const [numAllowed,setNumAllowed]=useState(false);
    const [charAllowed,setCharAllowed]=useState(false);


    const passwordRef=useRef(null);

    const passwordGenerator=useCallback(()=>{
        let pass="";
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(numAllowed) str+="0123456789";
        if(charAllowed) str+="~!@#$%^&*"; 

        for(let i=1; i<=length; i++){
            const char=Math.floor(Math.random()*str.length+1);
            pass += str.charAt(char);
        }

        setPassword(pass);
        },[length,numAllowed,charAllowed,setPassword]);

    const copyHandler=useCallback(()=>{
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password)
    },[password]);

    // useState(passwordGenerator);
    useEffect(()=>{
        passwordGenerator();
    },[length,numAllowed,charAllowed,passwordGenerator]);

   


  return (
    <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-5 py-6 my-12 text-orange-500 bg-gray-800 '>
    <h1 className='text-center text-white text-3xl'>Password Genrator</h1>
    <div className='flex shadow rounded-xl overflow-hidden my-5 relative'>
        <input
        type='text' 
        className='outline-none rounded-xl w-full px-4 py-2 overflow-hidden'
        placeholder='Password'
        readOnly=""
        id='input'
        ref={passwordRef}
        value={password}
       
        />
        <button className='outline-none bg-blue-700 text-white px-4 py-2 shrink-0 absolute right-0 rounded-xl' onClick={copyHandler}>
            Copy
        </button>
    </div>
    <div className='flex text-lg gap-x-2 '>
        <input
            type='range'
            className='cursor-pointer w-full px-4 py-2 '
            id='len'
            value={length}
            onChange={(val)=>{
                setLength(val.target.value);
            }}
        />

        <label htmlFor='len'>Length:{length}</label>
    </div>
    <div className='flex items-center text-lg gap-x-2'>
    <input
        type='checkbox'
        id='numberInput'
        defaultChecked={numAllowed}
        onChange={()=>{
           setNumAllowed((previous)=>!previous)
        }}

    />
    <label htmlFor='numberInput'>Numbers</label>
    </div>

    <div className='flex items-center text-lg gap-x-2'>
        <input  
            type='checkbox'
            id='charInput'
            defaultChecked={charAllowed}
            onChange={()=>{
                setCharAllowed((previous)=>!previous)
            }}
        />
        <label htmlFor='charInput'>Characters</label>
    </div>
    </div>
  )
}
