import { createContext, useState } from "react";
import run from "../config/gemini.js";

export const Context= createContext();

const ContextProvider = (props) =>{
    const[input,setInput]= useState("");   // to see input prompt
    const[recentPrompt,setRecentPrompt]= useState("");  // the O/P is displayed on our main component that is our main screen
    const[prevPrompts,setPrevPrompts]= useState([]);   // to display our I/P history and display it on our Recent Tab
    const[showResult,setShowResult]= useState(false);  // once it is true it will hide the Hello sarang and those 4 cards for our result to be displayed
    const[loading,setLoading]= useState(false);  // once true it will display loading animation and once we get the data we will have to make it flase 
    const[resultData,setResultData]= useState("");  // result is displayed on our web page

    const delayPara = (index, nextWord) => {
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent= async(prompt) =>{
        setResultData("")
        setLoading(true)

        
        setShowResult(true)
        let response;
        if(prompt!=undefined){
            response =await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
        // setRecentPrompt(input)
        // setPrevPrompts(prev=>[...prev,input])

        // const response = await run(input)
        let responseArray = response.split("**");
        let newResponse;
        for(let i=0; i< responseArray.length; i++){
            if  (i%2!=1){
                newResponse+= responseArray[i];
            }
            if(i==0){
                newResponse="";
            }
            else{
                newResponse+= "<b>"+ responseArray[i] + "</b>" ;
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        // setResultData(newResponse2)
        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord+" ");
        }
        setLoading(false)
        setInput("")
    }
    

    const contextValue={
        prevPrompts,setPrevPrompts,onSent,setRecentPrompt,recentPrompt,showResult,loading,resultData,input,setInput, newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider