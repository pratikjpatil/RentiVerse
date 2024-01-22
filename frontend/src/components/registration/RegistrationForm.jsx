import React, {useState} from 'react'
import bgimg from '../../assets/bgimg.png'
import logo from "../../assets/logop.png"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function RegistrationForm({formData, handleInputChange, handleSendOtp, otpSent}) {
    const navigate = useNavigate()
  return (
    <>

    <img src={logo} onClick={()=>{navigate('/')}} alt="RentiVerse Logo" className="w-34 h-auto mx-auto pt-12 pb-6 md:pt-[2vh]" />

    <div className='flex flex-col bg-white w-5/6 rounded-xl m-auto px-6 py-8 lg:w-2/6'>

      <h1 className='text-xl text-slate-700 font-bold'>Sign Up</h1>
      <p className='text-xs text-slate-400'>Please enter your details to get started.</p>
      <form className='py-3' onSubmit={handleSendOtp}>

        <label htmlFor="firstName" className="block text-slate-600 text-base font-medium">Name</label>
        <div className="flex justify-between">
          <input type="text" className="w-[48%] text-sm font-medium h-8 p-2" name="firstName" placeholder="First Name" required maxLength="30" title="First name length should be max 30 characters" disabled={otpSent} value={formData.firstName} onChange={handleInputChange}/>
          <input type="text" className="w-[48%] text-sm font-medium h-8 p-2" name="lastName" placeholder="Last Name"  required maxLength="30" title="Last name length should be max 30 characters" disabled={otpSent} value={formData.lastName} onChange={handleInputChange}/>
        </div>

        <label htmlFor="phoneNumber" className="block text-slate-600 text-base font-medium mt-3">Phone Number</label>
        <input type="tel" className="text-sm font-medium h-8 p-2" name="phone" placeholder='9999999999' required pattern="\d{10}" title="Mobile number should contain 10 digits" disabled={otpSent} value={formData.phone} onChange={handleInputChange}/>

        <label htmlFor="email" className="block text-slate-600 text-base font-medium mt-3">Email Address</label>
        <input type="email" className="text-sm font-medium h-8 p-2" name="email" placeholder="example@abc.com" required maxLength="50" title="Email length should be max 50 characters" disabled={otpSent} value={formData.email} onChange={handleInputChange}/>

        <label htmlFor="address" className="block text-slate-600 text-base font-medium mt-3">Address</label>
        <input type="text" className="text-sm font-medium h-8 p-2" name="address" placeholder="123. Pratik residency, Chh. Shivaji Maharaj Nagar, Satara" required maxLength="80" title="Address length should be max 80 characters" disabled={otpSent} value={formData.address} onChange={handleInputChange}/>

        <label htmlFor="pincode" className="block text-slate-600 text-base font-medium mt-3">Pincode</label>
        <input type="number" className="text-sm font-medium h-8 p-2" name="pincode" placeholder="415001" required pattern="\d{6}" title="Pincode length should be 6 digits" disabled={otpSent} value={formData.pincode} onChange={handleInputChange}/>

        <label htmlFor="password" className="block text-slate-600 text-base font-medium mt-3">Password</label>
        <input type="password" className="text-sm font-medium h-8 p-2" name="password" required disabled={otpSent} value={formData.password} onChange={handleInputChange}/>

        <label htmlFor="confirmPassword" className="block text-slate-600 text-base font-medium mt-3">Confirm Password</label>
        <input type="password" className="text-sm font-medium h-8 p-2" name="confirmPassword" required disabled={otpSent} value={formData.confirmPassword} onChange={handleInputChange}/>

        <button type="submit" className="bg-blue-700 text-white text-sm mt-6 h-10 w-full rounded-lg">Send OTP</button>
      </form>

      <p className='text-sm text-slate-400 mx-auto'>Already a member? <span className="text-blue-700 font-bold cursor-pointer" onClick={()=>{navigate('/login')}}>Log in</span></p>

    </div>
</>
  )
}

export default RegistrationForm