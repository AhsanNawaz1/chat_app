import React, { useState, useLayoutEffect, useEffect } from 'react';
import ChatBox from '../Components/chatBox';
import ChatList from "../Components/chatList";
import { useSelector } from "react-redux";
import Dropdown from "../Components/dropdown";
import { getAllChat, getConversationList } from "../Services/chatServices";
import moment from 'moment';
import { socket } from "../utils/constants";

function Chat() {
  const user = useSelector((state) => state.root.user.user);

  const [selected, setSelected] = useState({});
  const [size, setSize] = useState([0, 0]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    socket?.emit("addUser", user._id);
  }, [socket])

  useEffect(() => {
    socket?.on("getUsers", (users) => {
      // console.log("users===>", users)
    })
  }, [socket])


  // For Selecting Active User
  const getSelectedUser = (select) => {
    setSelected(select)
  }

  // To check screen size for responsiveness
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // To get all conversations of User
  const getConversations = () => {

    getAllChat(user._id)
      .then(({ data } = data) => {
        setConversations(data);
      })
      .catch((err) => {
        console.log("err", err)
      })
  }


  useEffect(() => {
    getConversations();
  }, [])


  return (
    <div className='bg-[#EDDFE2] h-auto	'>
      <div className='p-8'>
        <Dropdown />
      </div>
      <div className={size[0] > 850 ? "pt-10 grid-cols-2 grid gap-4 pb-24" : "pt-10 pb-24"} >
        <div className={size[0] > 850 ? 'mt-0 mb-0 ml-[auto] mr-[auto] w-11/12 flex justify-center' : (selected && Object.keys(selected).length > 0) ? "hidden" : "ml-5 mr-5 flex justify-center"}>
          <ChatList selected={selected} getSelectedUser={getSelectedUser} conversations={conversations} />
        </div>
        <div className={size[0] > 850 || (selected && (Object.keys(selected).length > 0)) ? 'mr-5 ml-5 flex justify-center' : 'hidden'}>
          <ChatBox selected={selected} getSelectedUser={getSelectedUser} size={size} />
        </div>
      </div>
    </div>
  )
}

export default Chat