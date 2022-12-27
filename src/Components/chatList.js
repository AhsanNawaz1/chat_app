import React, { useState, useEffect } from 'react';
import {
  User1,
  User2
} from "../Assets/index";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { getUserServices, createConversation, getConversationList } from "../Services/chatServices";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { toastMessage } from "../Shared/toaster/toast"




function ChatList({ getSelectedUser, conversations, selected }) {
  const params = useParams();
  const user = useSelector((state) => state.root.user.user);
  const navigate = useNavigate();
  const [items, setItems] = useState([])
  const [members, setMembers] = useState([]);
  const [loader, setLoader] = useState(false);

  // For Autocomplete Users in Search
  const handleClick = (person) => {
    getSelectedUser(person);
    navigate(`/conversation/${person.conversationId}`)
  }

  const handleOnSearch = (string, results) => {
    // console.log(string, results)
  }

  const handleOnHover = (result) => {
    // console.log(result)
  }

  const handleOnSelect = (item) => {


    if (!item.conversationId) {
      let obj = {
        senderId: user?._id,
        receieverId: item._id
      }
      createConversation(obj)
        .then(({ data } = data) => {
          item['conversationId'] = data._id
          getSelectedUser(item);
          navigate(`/conversation/${item.conversationId}`)
        })
        .catch((err) => {
          navigate(`/conversation/undefined`)
          toastMessage(err.response.data)
        })
    }
    else {
      getSelectedUser(item);
      navigate(`/conversation/${item.conversationId}`)
    }
  }

  const handleOnFocus = () => {
  }

  const getAllUsers = () => {
    setLoader(true)

    getUserServices()
      .then(({ data } = data) => {
        setLoader(false)
        setItems(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }





  // const getAllConvo = () => {
  //   setLoader(true)
  //   getConversationList()
  //     .then(({ data } = data) => {
  //       setLoader(false)
  //       setItems(data)
  //     })
  //     .catch((err) => { })
  // }

  useEffect(() => {
    // getAllConvo()
    getAllUsers()
  }, [])

  const formatResult = (item) => {
    return (
      <div className='flex'>
        <img src={item.imgUrl} className="rounded-full	h-6	w-6 mr-2" />
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </div>
    )
  }

  // Matching User data with Members
  useEffect(() => {
    let chats = []
    conversations.forEach((i) => {
      i.members.map((id) => {
        if (id != user._id) {
          const matched = items.filter((i) => i._id == id);

          if (matched.length > 0) {
            matched[0].conversationId = i._id
          }

          if (i._id == params.id) {
            getSelectedUser(matched[0])
          }
          chats.push(matched[0]);
        }
      })
    })



    if (items.length > 0) {
      let filteration = chats.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t._id === value._id
        ))
      )
      setMembers(filteration)
    }
  }, [conversations]);



  return (
    <>
      <div className="rounded bg-white shadow-lg overflow-scroll w-full" style={{ height: "90vh" }}>
        <div className="px-6 py-4">
          <div className='relative'>
            <div className="App">
              <header className="App-header">
                <div>
                  <ReactSearchAutocomplete
                    items={items}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                    placeholder={"Search name to chat"}
                  />
                </div>
              </header>
            </div>
          </div>
          <div className='border-t-2 mt-6'>

            {loader ? <div role="status" className='mt-8 mr-auto mb-0 ml-auto justify-center flex'>
              <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div> : members.length > 0 ?
              members.map((person) => {
                return (
                  <>
                    <div className={selected?._id == person._id ? 'p-4 flex bg-[#F5F5F5] mt-3 cursor-pointer  hover:rounded' : 'p-4 flex hover:bg-[#F5F5F5] mt-3 cursor-pointer  hover:rounded'} onClick={() => handleClick(person)}>
                      <div className='mr-4'>
                        <img src={person.imgUrl} className="h-12 w-12 rounded-full" />
                      </div>
                      <div className='flex justify-between w-full'>
                        <div>
                          <h1 className='text-xl font-semibold	'>{person.name}</h1>
                          {/* <p className='text-sm'>{person?.lastMsg}  </p> */}
                        </div>
                        <div>
                          {/* <p className='text-xs'>13:00</p> */}
                          {/* <p className='text-xs bg-[#EDDFE2] rounded-full mt-3 ml-4 h-4 w-4 text-center'>1</p> */}
                        </div>
                      </div>
                    </div>
                  </>
                )
              }) :
              <div className='mt-20 text-center w-full'>
                <span>Select a member to chats</span>
              </div>
            }
          </div>
        </div>
      </div></>
  )
}

export default ChatList