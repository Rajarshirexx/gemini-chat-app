import { useContext } from "react";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/Context.jsx";


export default function Main() {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

    return (
        <div className="main flex-1 min-h-screen relative pb-15vh">
            <div className="nav flex items-center justify-between text-lg p-5 text-gray-600 border">
                <p>Gemini</p>
                <img className="w-10 rounded-full" src={assets.user_icon} alt="" />
            </div>
            
            <div className=" main-container max-w-224 mt-6 m-auto space-y-5 ">
                {!showResult
                ? <>
                    <div className="greet text-4xl p-5 text-neutral-400 space-y-4 text-center py-40">
                        <p><span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">Hello, User.</span></p>
                        <p>How can I help you today?</p>
                    </div>
                </> 
                : <div className="result py-5p max-h-65vh overflow-y-scroll px-3">
                    <div className="resultTitle flex items-center gap-5 mb-5">
                        <img className="w-10 rounded-full" src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="resultData flex items-start gap-5 mb-5">
                        <img className="w-10 rounded-full" src={assets.gemini_icon} alt="" />
                        {loading 
                        ? <div className="loader w-full flex flex-col gap-2.5 ">
                            <hr 
                            className="rounded-md border-none bg-custom-gradient bg-custom-size h-5" 
                            />
                            <hr  className="rounded-md border-none bg-custom-gradient bg-custom-size h-5" />
                            <hr  className="rounded-md border-none bg-custom-gradient bg-custom-size h-5" />
                        </div>                        
                        :  <p className="leading-relaxed  font-light" dangerouslySetInnerHTML={{__html:resultData}}></p>}
                    </div>
                </div>}

                <div className="main-bottom absolute bottom-0 w-full max-w-224 m-auto px-2">
                    <div className="searchBox flex items-center justify-between gap-5 px-2.5 py-5 bg-gray-200 rounded-full sm:px-3 sm:gap-3">
                        <input 
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text" 
                            placeholder="Enter a prompt here" 
                            className="flex-1 bg-transparent border-none outline-none pl-4 sm:w-full"
                        />
                        <div className="flex items-center gap-2 sm:gap-1">
                            <img 
                                onClick={()=>onSent()}
                                className="w-6 cursor-pointer sm:w-5" src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottomInfo m-4 text-center sm:text-xs">
                        Gemini may display inaccurate info, including about people, so double-check its responses.
                    </p>
                </div>
            </div>
        </div>
    );
}
