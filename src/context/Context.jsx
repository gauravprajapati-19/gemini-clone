import { createContext, useState } from 'react';
import runChat from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    setResultData('');
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    const response = await runChat(input);
    let responseArray = response.split('**');
    let newResponse;
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += '</br>' + '<b>' + responseArray[i] + '</b>';
      }
    }
    let newResponse2 = newResponse.split('*').join('</br>');
    let newResponse3 = newResponse2
      .split('undefined##' && 'undefined')
      .join('');
    // setResultData(newResponse2);
    let newResponseArray = newResponse3.split(' ');
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + ' ');
    }
    setLoading(false);
    setInput('');
  };

  //   onSent("What is React JS?");

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
