import React, { useEffect, useState } from 'react';
import Query from './Ai.js'; // Adjust the path as needed



function AiTest() {
  const [response,setResponse] = useState('');
  
  useEffect(
    () => {
      async function fetchData(){
        const result = await Query();
        setResponse(result);
      }
      fetchData();
    },[]);

  return(
    <>
        <p>Hello!</p>
        <h1>{response}</h1>
   
    </>

  );
}

export default AiTest;