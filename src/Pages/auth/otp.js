import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { otpServices } from '../../Services/authServices';
import { login } from "../../Shared/Redux/userSlice";
import { toastMessage } from '../../Shared/toaster/toast';


function Otp() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.root.user.user);
  const token = useSelector((state) => state.root.user.token);

  const [otpCode, setOtpCode] = useState("");

  const handleFocus = (e, value) => {
    if (value[Object.keys(value)[0]]) {
      if (e.target.nextSibling) e.target.nextSibling.focus();
    } else {

      if (e.target.previousSibling) e.target.previousSibling.focus();
    }
  };

  const handleTarget = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleFocus(e, {
      [name]: value,
    });
    setOtpCode({
      ...otpCode,
      [name]: value,
    });
  };


  const handleSubmit = () => {
    let obj = {
      email: user.email,
      otp: Object.values(otpCode).join("")
    }

    otpServices(obj)
      .then((data) => {
        if (data.data.user) {
          let obj = {
            user: data?.data?.user,
            token: token
          }
          toastMessage(data?.data?.msg)
          dispatch(login(obj))
          navigate("/")
        }
      })
      .catch((err) => {
        toastMessage(err.response.data)
      })

  }
  return (
    <>
      <div className='bg-[#EDDFE2] h-screen flex items-center justify-center'>
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg w-5/6 shadow-md hover:bg-gray-100 ">
          <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900">One Time Password</h5>
          <p className="font-normal text-gray-700 text-center">Check your email: {user.email}</p>
          <div className='flex justify-center'>
            <input
              type="text"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              name="first"
              pattern="[0-9]{1}"
              inputmode="numeric"
              className="border mr-3 h-16 w-20 mt-6 text-3xl text-center"
              onChange={handleTarget}
              autocomplete="off"
            />
            <input
              type="text"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              name="second"
              pattern="[0-9]{1}"
              inputmode="numeric"
              className="border mr-3 h-16 w-20 mt-6 text-3xl text-center"
              onChange={handleTarget}
              autocomplete="off"
            />
            <input
              type="text"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              name="third"
              pattern="[0-9]{1}"
              inputmode="numeric"
              className="border mr-3 h-16 w-20 mt-6 text-3xl text-center"
              onChange={handleTarget}
              autocomplete="off"
            />
            <input
              type="text"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              name="fourth"
              pattern="[0-9]{1}"
              inputmode="numeric"
              className="border mr-3 h-16 w-20 mt-6 text-3xl text-center"
              onChange={handleTarget}
              autocomplete="off"
            />
          </div>
          <div className='flex justify-center mt-10'>
            <button className='bg-[#EDB0A0] hover:bg-[#EDB0A0]-400 text-white font-bold py-2 px-4   border-b-4 border-[#F09A84] hover:border-[#EDBDB1] rounded' onClick={() => handleSubmit()}>Send</button>
          </div>
        </div>
      </div >
    </>
  )
}

export default Otp