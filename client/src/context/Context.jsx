import { createContext, useState } from "react";

export const Context = createContext();

function ContextProvider(props) {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Function to handle delay for rendering each word with a delay
  function delayPara(index, nextWord) {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  }

  // Function to reset the chat when starting a new chat
  function newChat() {
    setLoading(false);
    setShowResult(false);
  }

  // Fetch the response from the server
  const fetchResponse = async (promptToSend) => {
    try {
      const res = await fetch("https://gemini-chat-app-backend.onrender.com", {
        method: "POST", // POST request
        headers: {
          "Content-Type": "application/json", // Ensure the content type is JSON
        },
        body: JSON.stringify({ prompt: promptToSend }), // Send the prompt as JSON
      });

      // Check if response is ok (status 200-299)
      if (!res.ok) {
        throw new Error("Failed to fetch response from the server.");
      }

      // Parse the JSON response and return the data
      const data = await res.json();
      return data.response; // Assuming the response from your API has a field called 'response'
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setResultData("An error occurred while fetching the response.");
      return "";
    }
  };

  // Function to handle sending a prompt and getting a response
  const onSent = async (prompt) => {
    setResultData(""); // Clear previous results
    setLoading(true); // Start loading animation
    setShowResult(true); // Show result area

    let response;

    // If a prompt is provided, use it; otherwise, use the input
    if (prompt) {
      response = await fetchResponse(prompt); // Fetch the response for the prompt
      setRecentPrompt(prompt); // Update the most recent prompt
    } else {
      setPrevPrompts((prev) => [...prev, input]); // Add the input to previous prompts
      setRecentPrompt(input); // Update the most recent prompt
      response = await fetchResponse(input); // Fetch the response for the input
    }

    // Process the response by formatting it
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    // Add line breaks and split into words for delay-based rendering
    let newResponseTwo = newResponse.split("*").join("</br>");
    let newResponseArray = newResponseTwo.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false); // Stop loading animation
    setInput(""); // Clear input after sending
  };

  // Value to be provided to the context consumers
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    setResultData,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;

