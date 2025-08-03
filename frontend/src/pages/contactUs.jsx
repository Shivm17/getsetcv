import React, { useState } from "react";
import { API_PATHS } from "../utils/apiPath";
import toast, { Toaster } from 'react-hot-toast';

const ContactUs = ({ landingPageStyles }) => {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Surname, setSurname] = useState("");
  const [Description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state


  const checkValidation = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Please Enter Name";
    if (!Surname.trim()) newErrors.surname = "Please Enter Surname";
    if (!Email.trim()) newErrors.email = "Please Enter Email";
    if (!Description.trim()) newErrors.description = "Please Enter Description";

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async  () => {
    if (checkValidation()) {
      setLoading(true);
      try{
        const requestAPI = await fetch(API_PATHS.AUTH.contactus,{
          method : 'POST',
          headers : {'Content-Type':'application/json'},
          body: JSON.stringify({name : name , email : Email , surname : Surname , description : Description })   
        })
         const response = await requestAPI.json()
         console.log(response);
         
         if(response.success){
          toast.success(response.message || 'Request Sent Succesfully')
          setName('');
          setSurname('');
          setEmail('');
          setDescription('');
          setError({});
         }else{
          toast.error(response.message || 'something Went wrong')
         }
      }catch(error){
       toast.error('something Went wrong')
       console.log(error)
      }finally{
        setLoading(false);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center text-center items-center content-center mb-12" 
      
      >
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 sm:mb-6 max-w-3xl">
          Have questions, feedback, or need support?{" "}
        </h3>
        <span className={landingPageStyles.featuresDescription}>
          " Fill out the form below and our team will get back to you as soon as
          possible "
        </span>
      </div>
      <div className="min-h-screen pt-8 flex items-center justify-center bg-transparent px-4">
        <div className="flex flex-col md:flex-row items-stretch gap-16 max-w-6xl w-full">
          <div className="md:w-1/2 flex items-center justify-center">
            <img
              src="/contactus.png"
              alt="Contact illustration"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          <div
            className={`md:w-[60%] ${error.description ? 'sm:max-h-[711px]' : 'sm:max-h-[600px]'} *:max-h-[600px] bg-white rounded-2xl p-8 shadow-lg`}
            style={{
              boxShadow:
                "rgb(102 93 93 / 40%) 0px 2px 4px, rgb(86 87 205 / 57%) 0px 7px 13px -3px, rgb(0 54 86 / 20%) 0px -3px 0px inset",
            }}
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              Contact&nbsp;-&nbsp;us
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First Name"
                  className="w-full border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/50"
                />
                {error.name && (
                  <p className="text-red-600 mt-2 font-semibold">
                    {error.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Surname <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={Surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Last Name"
                  className="w-full border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/50"
                />
                {error.surname && (
                  <p className="text-red-600 mt-2 font-semibold">
                    {error.surname}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-1">
                Email
                <span className="text-red-500"> *</span>
              </label>
              <input
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shivam@gmail.com"
                className="w-full border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/50"
              />
              {error.email && (
                <p className="text-red-600 mt-2 font-semibold">{error.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Your message..."
                className={`w-full ${error.description ? 'mb-0' : 'mb-4' }   border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/50`}
              ></textarea>
              {error.description && (
                <p className="text-red-600  font-semibold">{error.description}</p>
              )}
            </div>

            <button
              className={`${landingPageStyles.desktopAuthButton} ${error.description ? 'mt-4' : 'mt-0'} !w-full `}
              onClick={handleSubmit}
            >  
            {loading ?  (
              <span className="flex justify-center items-center">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
          </span>
            ) : (
              <span className={landingPageStyles.desktopAuthButtonText}>
                Submit
              </span>)}
            </button>
          </div>
        </div>
        <Toaster />

      </div>
    </>
  );
};

export default ContactUs;
