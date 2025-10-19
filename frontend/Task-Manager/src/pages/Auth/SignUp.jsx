import React, { useState } from 'react'
import AuthLayout from "../../components/layouts/AuthLayout";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { Link } from "react-router-dom";


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fulName, setFulName] = useState("");
  const[email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [asminInviteToken, setAdminInviteToken] = useState('');

  const [error, setError] = useState(null);

      //Handle SignUp Form Submit
      const handleSignUp = async (e) => {
          e.preventDefault();
  
          if (!fulName){
              setError("Please enter ful name.");
              return;
          }

          if (!validateEmail(email)){
              setError("Please enter a valid email address.");
              return;
          }
  
  
          if (!password){
              setError("Please enter the password.")
              return;
          }
  
          setError("");
  
          //SignUp API call
      };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black"> Create An Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below. 
        </p>

        <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage ={setProfilePic}/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={fulName}
                onChange={({ target }) => setFulName(target.value)}
                label="Full Name"
                placeholder="Anju"
                type="text"
              />

              <Input
                    value={email}
                    onChange = {({ target }) => setEmail(target.value)}
                    label = "Email Address"
                    placeholder = "anju@example.com"
                    type="text"
                />

                <Input
                    value={password}
                    onChange = {({ target }) => setPassword(target.value)}
                    label = "Password"
                    placeholder = "Min 8 Characters"
                    type="password"
                />

                <Input
                    value={password}
                    onChange = {({ target }) => setPassword(target.value)}
                    label = "Admin Invite Token"
                    placeholder = "6 Digit Code"
                    type="text"
                />
              </div>
                
                {error && <p className="text-red-500 text-x5 pb-2.5">{error}</p>}
            
                <button type ="submit" className="btn-primary">
                    SIGN UP
                </button>

                <p className="text-[13px] text-slate-800 mt-3">
                    Already an account?{" "}
                    <Link className="font-medium text-primary underline" to="/login" >
                        LOGIN
                    </Link>
                  </p>

            
        </form>


      </div>

    </AuthLayout>
  )
}

export default SignUp