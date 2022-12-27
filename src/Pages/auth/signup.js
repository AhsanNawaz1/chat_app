import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Formik, Form, Field } from 'formik';
import { SignUpSchema } from "../../Shared/formik";
import { Dummy } from "../../Assets/index"
import { useNavigate } from 'react-router-dom';
import { SignUpServices } from "../../Services/authServices";
import { login } from "../../Shared/Redux/userSlice";
import { useDispatch } from "react-redux";
import { toastMessage } from '../../Shared/toaster/toast';


function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ProfileImageurl, setProfileImageurl] = useState(Dummy);
  const [ProfileImagefile, setProfileImagefile] = useState(Dummy);

  const ProfileImageChange = (e) => {
    let file = e.target.files[0];
    setProfileImagefile(file);
    if (file) {
      let url = URL.createObjectURL(file);
      setProfileImageurl(url);
    }
  };

  const handleSubmit = (values) => {
    let obj = { ...values, profilepic: ProfileImagefile }

    SignUpServices(obj)
      .then((data) => {
        if (data.data) {
          navigate("/");
          let obj = {
            user: data.data.user,
            token: data.data.access_token
          }
          dispatch(login(obj));
          toastMessage(data?.data?.msg)
        }
      })
      .catch((err) => {
        toastMessage(err.response.data)
      })
  }



  return (
    <div className='bg-[#EDDFE2] h-screen flex items-center justify-center'>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg w-5/6 shadow-md hover:bg-gray-100">
        <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900">Sign Up</h5>
        <p className="font-normal text-gray-700 text-center ">Enter your details and sign up</p>
        <input
          type="file"
          id="ProfileImage"
          name="ProfileImage"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={(e) => {
            ProfileImageChange(e)
          }}
        />

        <img src={ProfileImageurl} className="h-16 mt-0 mb-0 ml-auto mr-auto" />

        <label htmlFor="ProfileImage" className='flex justify-center'>
          <div className='font-normal text-gray-700 mt-5 mb-2 cursor-pointer'>Upload</div>
        </label>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: ''
          }}
          validationSchema={SignUpSchema}
          onSubmit={values => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <p className="font-normal text-gray-700  mt-3 mb-2">Name</p>
                <Field name="name" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" />
                {errors.name && touched.name ? (
                  <div className='text-xs h-1 text-right'>{errors.name}</div>
                ) : <div className='h-1'></div>}

                <p className="font-normal text-gray-700  mt-4 mb-2">Email</p>
                <Field name="email" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John@gmail.com" />
                {errors.email && touched.email ? (
                  <div className='text-xs h-1 text-right'>{errors.email}</div>
                ) : <div className='h-1'></div>}

                <p className="font-normal text-gray-700  mt-4 mb-2">Password</p>
                <div className='relative'>
                  <Field name="password" type={!showPassword ? "password" : "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                  {showPassword ?
                    <AiOutlineEye onClick={() => setShowPassword(!showPassword)} className='absolute top-3 right-2' />
                    : <AiOutlineEyeInvisible onClick={() => setShowPassword(!showPassword)} className='absolute top-3 right-2 ' />}
                </div>
                {errors.password && touched.password ? (
                  <div className="text-xs h-1 text-right">{errors.password}</div>
                ) : <div className='h-1'></div>}


                <div className='flex justify-center mt-5'>
                  <button type="submit" className="bg-[#EDB0A0] hover:bg-[#EDB0A0]-400 text-white font-bold py-2 px-4 border-b-4 border-[#F09A84] hover:border-[#EDBDB1] rounded">
                    sign up
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <p className="font-normal text-gray-700 text-center dark:text-gray-400 mt-5">Already have an account? <label onClick={() => navigate("/")} className="cursor-pointer">Login</label></p>
      </div>
    </div >
  )
}

export default SignUp