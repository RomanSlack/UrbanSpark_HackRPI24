import React, { useEffect, useState } from 'react';
import Query from './Ai.js'; // Adjust the path as needed
import Query2 from './FinalOutputAi.js';


function AiTest({}) {
  const [response,setResponse] = useState('');
  useEffect(
    () => {
      async function fetchData(){
        const result = await Query2();
        setResponse(result);
      }
      fetchData();
    },[]);

  return(
    <>
      
        <h1>{response}</h1>
   
    </>

  );
}

export default AiTest;