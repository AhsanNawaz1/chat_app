import React, { useEffect, useRef, useState } from 'react';
import { User1 } from "../Assets/index";
import { BsEmojiSmile } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi"
import { useNavigate, useParams } from 'react-router-dom';
import { getChat, createMessageService } from "../Services/chatServices";
import { useSelector } from "react-redux";
import moment from 'moment';
import Animation from './Animation/Animation';
import { AiOutlineSend } from "react-icons/ai"
import { socket } from "../utils/constants";
import EmojiPicker from 'emoji-picker-react';




function ChatBox({ selected, getSelectedUser, size }) {

  const navigate = useNavigate();
  const params = useParams();
  const user = useSelector((state) => state.root.user.user);
  const [loader, setLoader] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [MessageLoader, setMessageLoader] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [msg, setMsg] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // back arrow
  const handleBack = () => {
    getSelectedUser({})
    setMessages([])
    navigate("/")
    setText("")
  }


  const getMessages = () => {
    setLoader(true)

    if (selected) {
      getChat(params?.id)
        .then(({ data } = data) => {
          setLoader(false);
          setMessages(data);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }



  useEffect(() => {
    if (Object.keys(params).length > 0) {
      getMessages();
    }
  }, [params])

  useEffect(() => {
    var objDiv = document.getElementsByClassName("scroller");
    objDiv[0].scrollTop = objDiv[0].scrollHeight;

  }, [messages]);

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSendText = () => {

    if (text !== "") {
      let obj = {
        conversationId: selected.conversationId,
        senderId: user._id,
        text: text
      }
      createMessage(obj);


      socket.emit("sendMessage", {
        senderId: user._id,
        recieverId: selected._id,
        text: text
      })
      setText("");
    }
  }

  useEffect(() => {
    socket.on("getMessage", (msg) => {
      setMsg(msg)
    })
  }, [socket])

  useEffect(() => {
    console.log("msg", msg)
    setMessages([...messages, msg])
  }, [msg])
  console.log("messages", messages)




  const handleKeyDown = event => {

    if (text !== "") {
      if (event.key === 'Enter') {
        event.preventDefault();

        let obj = {
          conversationId: selected.conversationId,
          senderId: user._id,
          text: text
        }

        createMessage(obj);
        setText("");


        socket.emit("sendMessage", {
          senderId: user._id,
          recieverId: selected._id,
          text: text
        })
      }
    }

  };

  const createMessage = (obj) => {
    let temp = [...messages];


    let message = {
      senderId: user._id,
      text: text,
      createdAt: new Date(),
      loader: true
    }

    setMessageLoader(true)

    temp.push(message);
    setMessages(temp)


    createMessageService(obj)
      .then(({ data } = data) => {
        setMessageLoader(false)
        message.loader = false
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onEmojiClick = (event, emojiObject) => {
    setText(text + event.emoji);
    setShowEmojis(false);
  };

  useEffect(() => {

    if (messages.length > 1) {
      setCurrentDate(moment(messages[0].createdAt).format('Do MMMM YYYY'))
      // for (let i = 1; i < messages.length; i++) {
      //   let startDate = moment(messages[i].createdAt)
      //   let endDate = moment(messages[i - 1].createdAt)
      //   if (moment(messages[i].createdAt) != currentDate) {
      //     setCurrentDate(moment(messages[i].createdAt).format('Do MMMM YYYY'))
      //   }
      // }
    }
  }, [messages])


  return (
    <>
      <div className={selected && Object.keys(selected).length ? "rounded overflow-scroll relative bg-white shadow-lg w-full" : "rounded overflow-scroll relative bg-white shadow-lg flex text-center items-center w-full"}  >
        <div className={selected && Object.keys(selected).length ? "px-6 py-4" : "px-6 py-4 mt-0 mb-0 ml-auto mr-auto"}>
          {
            selected && Object.keys(selected).length > 0 ? <div className='flex items-center border-b-2 pb-3' >
              {size[0] > 850 ? "" : <BiArrowBack className='mr-4 cursor-pointer' onClick={() => handleBack()} />}
              <img src={selected?.imgUrl} className="h-10 w-10 rounded-full mr-2 " />
              <h1 className='text-lg'>{selected.name}</h1>
              {showEmojis ? <div className='absolute bottom-16'>
                <EmojiPicker
                  height="400px" width="300px"
                  onEmojiClick={onEmojiClick}
                />
              </div> : ""}
              <div className='absolute left-0 bottom-0 w-11/12 mt-0 mb-0 mr-[auto] ml-[auto]'>
                <div className='relative mb-2.5 ml-5 w-full'>
                  <BsEmojiSmile className='absolute top-3 left-2 emoji-icon' onClick={() => setShowEmojis(!showEmojis)} />
                  <input className='bg-[#F5F5F5] w-full rounded-md h-10 pl-8 pr-9' onChange={(e) => handleChange(e)} value={text} onKeyDown={handleKeyDown} />
                  <button type="submit" onClick={() => handleSendText()} className="absolute p-1.5 right-1 top-1 bg-[#EDB0A0] hover:bg-[#EDB0A0]-400 text-white font-bold  border-b-4 border-[#F09A84] hover:border-[#EDBDB1] rounded">
                    <AiOutlineSend />
                  </button>
                </div>
              </div>
            </div>
              : ""
          }

          <div className='mb-14 scroller' style={{ height: "69vh", overflow: "scroll" }} >
            {loader ?
              <Animation />
              :
              selected && Object.keys(selected).length ? messages?.map((i, inx) => {
                return (
                  <>
                    {messages.length > 0 && inx == 0 ?
                      <div className='bg-[#EDB0A0] text-xs w-2/5 text-center text-white mt-2 mb-2 mr-auto ml-auto p-1 rounded'>
                        {moment(messages[inx].createdAt).format("Do MMMM YYYY")}
                      </div> :
                      moment(messages[inx].createdAt).format("Do MMMM YYYY") !== moment(messages[inx - 1].createdAt).format("Do MMMM YYYY") ?
                        < div className=' bg-[#EDB0A0] w-2/5 text-xs text-center text-white mt-2 mb-2 mr-auto ml-auto p-1 rounded'>
                          {moment(messages[inx].createdAt).format("Do MMMM YYYY")}
                        </div> : <></>
                    }
                    {
                      i.senderId == user._id ?
                        <div>
                          <div className='flex'>
                            <div className='mt-2 mb-2 p-3 rounded-r-lg rounded-t-lg bg-[#C4C4C4] w-auto inline-block' style={{ maxWidth: "90%" }}>
                              {i.text}
                            </div>
                            {MessageLoader && i?.loader ? <div role="status" className='ml-2 mt-4'>
                              <svg className="inline mr-2  w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div> : ""}
                          </div>
                          <p className='text-xs'>{moment(i.createdAt).format('h:mm A')}</p>
                        </div>
                        :
                        <>
                          <div className='flex justify-end'>
                            <div className='mt-2 mb-2 p-3 rounded-t-lg rounded-l-lg bg-[#90595963]' style={{ maxWidth: "90%" }}>
                              {i.text}
                            </div>
                          </div>
                          <p className='text-xs text-right'>{moment(i.createdAt).format('h:mm A')}</p>
                        </>
                    }
                  </>
                )
              }) :
                <div>
                  Select/Search a member to chat
                </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatBox