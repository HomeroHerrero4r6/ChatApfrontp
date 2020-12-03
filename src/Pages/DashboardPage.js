import React from "react";
import axios from "axios";
import Button from './components/Button'
import { Link } from "react-router-dom";

const DashboardPage = (props) => {
    const [chatrooms, setChatrooms] = React.useState([]);
    const getChatrooms = () => {
        axios
            .get("http://localhost:8000/chatroom", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("CC_Token"),
                },
            })
            .then((response) => {
                setChatrooms(response.data);
            })
            .catch((err) => {
                setTimeout(getChatrooms, 3000);
            });
    };

    React.useEffect(() => {
        getChatrooms();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="card ">
            <h1 className={`d-flex justify-content-center text-white bg-dark large`}>Chatrooms</h1>
            <div className={`container `}>
              <div className="cardBody ">
                <div className="inputGroup d-flex">
                    <input
                        type="text"
                        name="chatroomName"
                        id="chatroomName"
                        placeholder="Name.."
                    />
            <Button
                name='Create Chatroom'
                action={``}
                style={`float-rigth btn btn-primary mt-2`}></Button>
                </div>
            </div>
            <div className="chatrooms mt-1 ">
                <h2 className={`d-flex justify-content-center text-white bg-dark`}>Start Chating!</h2>
                {chatrooms.map((chatroom) => (
                    <div key={chatroom._id} className="chatroom">
                        <div>{chatroom.name}</div>
                        <Link to={"/chatroom/" + chatroom._id}>
                            <div className={`btn btn-link `}>Join</div>
                        </Link>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default DashboardPage;