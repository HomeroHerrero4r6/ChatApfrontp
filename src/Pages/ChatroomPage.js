import React from "react";
import Button from "./components/Button";
import { withRouter } from "react-router-dom";
import  s from "./ChatroomPage.module.css";


const ChatroomPage = ({ match, socket }) => {
    const chatroomId = match.params.id;
    const [messages, setMessages] = React.useState([]);
    const messageRef = React.useRef();
    const [userId, setUserId] = React.useState("");

    const sendMessage = () => {
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId,
                message: messageRef.current.value,
            });

            messageRef.current.value = "";
        }
    };

    React.useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.id);
        }
        if (socket) {
            socket.on("newMessage", (message) => {
                const newMessages = [...messages, message];
                setMessages(newMessages);
            });
        }
        //eslint-disable-next-line
    }, [messages]);

    React.useEffect(() => {
        if (socket) {
            socket.emit("joinRoom", {
                chatroomId,
            });
        }

        return () => {
            //Component Unmount
            if (socket) {
                socket.emit("leaveRoom", {
                    chatroomId,
                });
            }
        };
        //eslint-disable-next-line
    }, []);

    return (
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className={s.cardHeader}>Start chatting!</div>
                <div className="chatroomContent">
                    {messages.map((message, i) => (
                        <div key={i} className={`bg-light rounded-left mw-30 mt-2`}>
                            <span
                                className={
                                    userId === message.userId ? "text-success" : "text-danger"
                                }
                            >
                                {message.name}:
              </span>{" "}
                            {message.message}
                        </div>
                    ))}
                </div>
                <div className="chatroomActions">
                    <div>
                        <input
                            type="text"
                            name="message"
                            placeholder="Type here!"
                            ref={messageRef}
                        />
                    </div>
                    <div>
                    <Button
                    name='Send'
                    action={sendMessage}
                    style={`btn btn-info`}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(ChatroomPage);