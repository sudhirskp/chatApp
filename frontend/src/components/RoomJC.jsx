import React from 'react';
import toast from 'react-hot-toast';
import { createRoom } from '../Services/roomServices';
import useChatContext from '../Context/chatContext';
import { useNavigate } from 'react-router';
import { joinChatApi } from '../Services/roomServices';

const RoomJC = () => {

  const [details, setDetails] = React.useState({
    name: "",
    roomId: "",
  });

const {roomId , setRoomId, currentUser, setcurrentUser , connect , setConnect, setIsCreator } = useChatContext();
const navigate = useNavigate();

  function handleTheForm(e){
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  }

  function formvalidation(){
    if(details.name === "" || details.roomId === "")
    {
      toast.error("Please fill all fields");
      return false;
    }
    return true
  }

  async function joinChat(e){
    if(formvalidation()){
      console.log(details);
      try{
      const room = await joinChatApi(details.roomId);
      console.log(room);
      toast.success("Room joined successfully");      setcurrentUser(details.name);
      setRoomId(room.roomId);
      setConnect(true);
      setIsCreator(false);
      navigate("/Chatpage");
      }catch(error){
        toast.error("Room not found");
        console.log(error);
      }

    }
}

  async function createChat(e){
    if(formvalidation()){
      console.log(details);
      //call api from backend to create room
      try {
        const response = await createRoom(details.roomId);
        console.log(response);
        toast.success("Room created successfully");
        //join room
        setcurrentUser(details.name);
        setRoomId(response.roomId);        setConnect(true);
        setIsCreator(true);
        navigate("/Chatpage");
      } catch (error) {
        console.log(error);
        if(error.response.status === 400){
          toast.error("Room already exists");
        }else{
          toast.error("Something went wrong");

        }
      }

    }
  }

    return (
      
        <div
            className="min-h-screen flex items-center justify-start bg-gray-100 dark:bg-gray-800"
            style={{
                backgroundImage: "url('robu-4-icon.png')",
                //background: "linear-gradient(135deg, rgb(63, 94, 251), rgb(252, 70, 107))",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            
           
        >
          
            <div
                className="p-8 col-auto w-auto max-w-2xl rounded-lg shadow-2xl bg-gray-100 dark:bg-gray-800 hover:border-4 hover:border-purple-300 hover:brightness-110 dark:hover:border-pink-300"
                style={{
                    backgroundImage: "url('image.png') ",
                    width:"500px",
                    backgroundSize: "cover",
                    backgroundPosition: "right",
                    marginLeft: '10%',
                    //background:'transparent',
                    boxShadow: "0 0 30px rgba(128, 90, 213, 0.7), 0 0 60px rgba(99, 102, 241, 0.5)",
                    borderRadius: "20px",
                }}
                
            >

                <h1 className="text-2xl col-auto text-gray-900 dark:text-gray-100 font-extrabold text-left">
                    <b>Join Or Create the Room</b>
                </h1>
                <form className="mt-6">

                    {/* input start */}
                    
                    <div className="mb-6">
  <label
    className="text-s col-auto text-gray-900 dark:text-gray-100 font-extrabold text-left"
    htmlFor="name"
  >
    <b>Enter Name:</b>
  </label>
  <input onChange={handleTheForm}
    value={details.name}
    type="text"
    id="name"
    name="name"
    placeholder="Name here"
    className="w-full px-4 py-3 rounded-lg shadow-inner text-white placeholder-white/50 
               transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-500"
    style={{
      background: "transparent",
      border: "2px solid white",
      color: "white",
    }}
    onFocus={(e) => {
      e.target.style.boxShadow = "0 0 20px rgba(190, 90, 255, 0.9)";
      e.target.style.borderColor = "#fff";
    }}
    onBlur={(e) => {
      e.target.style.boxShadow = "none";
      e.target.style.borderColor = "#fff";
    }}
  />
</div>

<div className="mb-6">
  <label
   className="text-s col-auto text-gray-900 dark:text-gray-100 font-extrabold text-left"
    htmlFor="roomId"
  >
    <b>Enter Room ID/New ID :</b>
  </label>
  <input onChange={handleTheForm}
    value={details.roomId}
    type="text"
    id="roomId"
    name="roomId"
    placeholder="Room ID here"
    className="w-full px-4 py-3 rounded-lg shadow-inner text-white placeholder-white/50 
               transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-pink-500"
    style={{
      background: "transparent",
      border: "2px solid white",
      color: "white",
    }}
    onFocus={(e) => {
      e.target.style.boxShadow = "0 0 20px rgba(255, 90, 200, 0.9)";
      e.target.style.borderColor = "#fff";
    }}
    onBlur={(e) => {
      e.target.style.boxShadow = "none";
      e.target.style.borderColor = "#fff";
    }}
  />
</div>


                    {/* //input end */}


                    {
                    <div className="flex space-x-6">
                    <button onClick={joinChat}
                      style={{
                        background: "transparent",
                        color: "white",
                        border: "2px solid white",
                        boxShadow: "0 0 30px rgba(128, 90, 213, 0.5)",
                        transition: "all 0.3s ease",
                      }}
                      type="button"
                      className="px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 focus:outline-none"
                      onMouseOver={e => {
                        e.target.style.boxShadow = "0 0 40px rgba(190, 90, 255, 0.9)";
                        e.target.style.borderColor = "#fff";
                      }}
                      onMouseOut={e => {
                        e.target.style.boxShadow = "0 0 30px rgba(128, 90, 213, 0.5)";
                        e.target.style.borderColor = "#fff";
                      }}
                    >
                      Join Room
                    </button>
                  
                    <button onClick={createChat}
                      type="button"
                      style={{
                        background: "transparent",
                        color: "white",
                        border: "2px solid white",
                        boxShadow: "0 0 30px rgba(128, 90, 213, 0.5)",
                        transition: "all 0.3s ease",
                      }}
                      className="px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 focus:outline-none"
                      onMouseOver={e => {
                        e.target.style.boxShadow = "0 0 40px rgba(90, 255, 180, 0.9)";
                        e.target.style.borderColor = "#fff";
                      }}
                      onMouseOut={e => {
                        e.target.style.boxShadow = "0 0 30px rgba(128, 90, 213, 0.5)";
                        e.target.style.borderColor = "#fff";
                      }}
                    >
                      Create Room
                    </button>
                  </div>
                   }



                </form>
            </div>
        </div>
    );
};

export default RoomJC;
