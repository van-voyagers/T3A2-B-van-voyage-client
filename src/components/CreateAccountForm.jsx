import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateAccountForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users/create-account', { email, password });

      // Handle successful submission here
      alert("Account successfully created!");
      navigate('/login');
    } catch (error) {
      // Handle error during submission here
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center px-5 space-y-4 text-voyage-black">
      <div className="w-full shadow-lg">
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email..."
          required
          className="w-full h-10 pl-2 border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
        />
      </div>
      <div className="w-full shadow-lg">
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password..."
          required
          className="w-full h-10 pl-2 border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
        />
      </div>
      <div className="underline">
        <Link to="/login" className="text-voyage-black">Already have an account? Log in here ➚</Link>
      </div>
      <div className="self-start">
        <button type="submit" className="bg-voyage-green text-white font-roboto font-light rounded px-4 py-2">Submit</button>
      </div>
    </form>
  );
}

export default CreateAccountForm;














