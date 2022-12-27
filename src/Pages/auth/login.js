import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Formik, Form, Field } from 'formik';
import { LoginSchema } from "../../Shared/formik"
import { useNavigate } from 'react-router-dom';
import { login } from "../../Shared/Redux/userSlice";
import { loginServices } from "../../Services/authServices";
import { useDispatch } from "react-redux";
import { toastMessage } from "../../Shared/toaster/toast"



function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  

  const handleSubmit = (values) => {

    loginServices(values)
      .then((data) => {
        let obj = {
          user: data?.data?.user,
          token: data?.data?.token
        }
        dispatch(login(obj))
        toastMessage(data?.data?.msg)
      })
      .catch((err) => {
        toastMessage(err.response.data)
      })
  }

  return (
    <div className='bg-[#EDDFE2] h-screen flex items-center justify-center'>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg w-5/6 shadow-md hover:bg-gray-100">
        <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900">Login</h5>
        <p className="font-normal text-gray-700 text-center">Enter your credentials and login</p>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <p className="font-normal text-gray-700  mt-5 mb-2">Email</p>
                <Field name="email" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John@gmail.com" />
                {errors.email && touched.email ? (
                  <div className='text-xs h-1 text-right'>{errors.email}</div>
                ) : <div className='h-1'></div>}

                <p className="font-normal text-gray-700 mt-7 mb-2">Password</p>
                <div className='relative'>
                  <Field name="password" type={!showPassword ? "password" : "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  {showPassword ?
                    <AiOutlineEye onClick={() => setShowPassword(!showPassword)} className='absolute top-3 right-2' />
                    : <AiOutlineEyeInvisible onClick={() => setShowPassword(!showPassword)} className='absolute top-3 right-2 ' />}
                </div>
                {errors.password && touched.password ? (
                  <div className="text-xs h-1 text-right">{errors.password}</div>
                ) : <div className='h-1'></div>}


                <div className='flex justify-center mt-5'>
                  <button type="submit" className="bg-[#EDB0A0] hover:bg-[#EDB0A0]-400 text-white font-bold py-2 px-4 border-b-4 border-[#F09A84] hover:border-[#EDBDB1] rounded">
                    login
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <p className="font-normal text-gray-700 text-center dark:text-gray-400 mt-5">Don't have an account? <label onClick={() => navigate("/signup")} className="cursor-pointer">Sign Up</label></p>
      </div>
    </div >
  )
}

export default Login