import { FaRobot, FaUser } from "react-icons/fa";

function ChatMessage({ sender, text }) {
const isBot = sender === "bot";

    return (
        <div className={`message ${isBot ? "bot" : "user" }`}>
            {isBot && (
                <div className="message-icon bot-icon">
                    <FaRobot size={20} />
                </div>
            )}
            
            
            <div className="bubble">
                {text}
            </div>

            {!isBot && (
                <div className="message-icon user-icon">
                    <FaUser size={20} />
                </div>
            )}
        </div>
    );
}
export default ChatMessage;