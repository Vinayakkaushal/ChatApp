import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { Mail, MessageSquare, User, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import toast from 'react-hot-toast';

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim()){
      return toast.error("Full name is required");
  }
    if(!formData.email.trim()){
      return toast.error("Email is required");
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
      return toast.error("Invalid email format");
    }
    if(!formData.password){
      return toast.error("Password is required");
    }
    if(formData.password.length < 6){
      return toast.error("Password must be at least 6 characters long");
    }
    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if(isValid === true){
      signup(formData);
    }
  };
  
  const neon = { color: "#39FF14" };  // NEON GREEN 💡

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          
          {/* HEADER */}
          <div className='text-center'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/30 transition-colors'>
                <MessageSquare className='size-6' style={neon} />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get started with your free account</p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

  {/* FULL NAME */}
  <div className='form-control'>
    <label className='label'>
      <span className='label-text font-medium'>Full Name</span>
    </label>

    <div className='relative overflow-visible'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20'>
        <User className='size-5 text-primary' />
      </div>

      <input
        type="text"
        className="input input-bordered w-full pl-12"
        placeholder='John Doe'
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      />
    </div>
  </div>

  {/* EMAIL */}
  <div className='form-control'>
    <label className='label'>
      <span className='label-text font-medium'>Email Address</span>
    </label>

    <div className='relative overflow-visible'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20'>
        <Mail className='size-5 text-primary' />
      </div>

      <input
        type="email"
        className="input input-bordered w-full pl-12"
        placeholder='john@example.com'
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
    </div>
  </div>

  {/* PASSWORD */}
<div className='form-control'>
  <label className='label'>
    <span className='label-text font-medium'>Password</span>
  </label>

  <div className='relative overflow-visible'>
    {/* Left icon */}
    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20'>
      <Lock className='size-5 text-primary' />
    </div>

    {/* Input */}
    <input
      type={showPassword ? "text" : "password"}
      className="input input-bordered w-full pl-12 pr-12"
      placeholder='Enter your password'
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />

    {/* Show / hide button */}
    <button
      type='button'
      className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer z-20'
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeOff className='size-5 text-primary' />
      ) : (
        <Eye className='size-5 text-primary' />
      )}
    </button>
  </div>
</div>

  {/* SUBMIT BUTTON */}
  <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
    {isSigningUp ?(
      <>
      <Loader2 className='size-5 animate-spin'/>
      </>
    ):(
      "Create Account"
    )}
  </button>

</form>

      <div className='text-center'>
        <p className='text-base-content/60'>
          Already have an account? {""}
          <Link to="/login" className='link link-primary'>
            Sign in
          </Link>
          
        </p>
      </div>

        </div>
      </div>


      {/* right side */}
      <AuthImagePattern 
        title="Welcome to ChatApp" 
        subtitle="Connect with friends and the world around you on ChatApp. Sign up to get started!"
      />

    </div>
  );
}

export default SignUpPage;
