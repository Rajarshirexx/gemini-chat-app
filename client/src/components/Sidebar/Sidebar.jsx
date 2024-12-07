import { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/Context.jsx";

export default function Sidebar() {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    async function loadPrompt(prompt) {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <div className={`sidebar min-h-screen sm:flex flex-col justify-between bg-gray-200 px-5 py-4 transition-all duration-300 ite ${extended ? "w-48" : "w-16"} hidden`}>
            <div className="top">
                {/* Menu Icon */}
                <img 
                    className="w-5 block cursor-pointer" 
                    src={assets.menu_icon} 
                    alt="menu icon" 
                    onClick={() => setExtended(!extended)} 
                />

                {/* New Chat Button */}
                <div 
                    onClick={newChat}
                    className={`new-chat inline-flex mt-4 justify-center gap-2.5 px-2 py-1 rounded-full cursor-pointer bg-white text-gray-800 hover:shadow-md w-full items-center ${extended ? "block" : "hidden"}`}
                >
                    <img className="w-5" src={assets.plus_icon} alt="plus icon" />
                    {extended && <p>New Chat</p>}
                </div>

                {/* Recent Prompts */}
                <div className={`recent animate-fadeIn-1.5s flex flex-col ${extended ? "block" : "hidden"}`}>
                    <p className="recent-title mt-7 mb-4">
                        {extended && "Recent"}
                    </p>
                    {prevPrompts.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => loadPrompt(item)}
                            className="recent-entry flex items-start gap-2 p-2 rounded-full cursor-pointer border-black hover:bg-gray-300 hover:shadow-md"
                        >
                            <img className={`w-${extended ? "5" : "7"}`} src={assets.message_icon} alt="message icon" />
                            {extended && <p className="text-sm">{item.slice(0, 18)} ...</p>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bottom flex flex-col border space-y-1 mt-auto">
                {/* Help */}
                <div className={`flex items-center gap-3 p-2 rounded-full cursor-pointer border-black hover:bg-gray-300 text-sm hover:shadow-md ${extended ? "block" : "hidden"}`}>
                    <img className={`w-${extended ? "5" : "7"}`} src={assets.question_icon} alt="help icon" />
                    {extended && <p>Help</p>}
                </div>

                {/* Activity */}
                <div className={`flex items-center gap-3 p-2 rounded-full cursor-pointer border-black hover:bg-gray-300 text-sm hover:shadow-md ${extended ? "block" : "hidden"}`}>
                    <img className={`w-${extended ? "5" : "7"}`} src={assets.history_icon} alt="history icon" />
                    {extended && <p>Activity</p>}
                </div>

                {/* Settings */}
                <div className={`flex items-center gap-3 p-2 rounded-full cursor-pointer border-black hover:bg-gray-300 text-sm hover:shadow-md ${extended ? "block" : "hidden"}`}>
                    <img className={`w-${extended ? "5" : "7"}`} src={assets.setting_icon} alt="settings icon" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
}
