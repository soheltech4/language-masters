import React, { useContext } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';


const SocialLogin = ({title}) => {
    const {googlesignin} = useContext(AuthContext)
    
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    const handleGoogleSignIn = () =>{
        googlesignin()
        .then(result => {
            const loggeduser = result.user 
            console.log(loggeduser)

            const saveUser = {email: loggeduser.email, name: loggeduser.displayName}
            fetch('https://language-masters-server.vercel.app/users', {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(saveUser)
            }
            )
            .then(res => res.json())
            .then(() => {
                    navigate(from, {replace: true})
            })
            



            toast.success('Login Successfully!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            }); 
            navigate(from, {replace: true})
        })
    }

    return (
        <div>
            <div className='pt-5'>
                <button onClick={handleGoogleSignIn} className='text-center w-full justify-center shadow-lg input flex items-center gap-5 '>
                    <h1>Sign {title} with Google </h1>
                    <a><FaGoogle /></a>
                    <ToastContainer></ToastContainer>
                </button>
                <button className='text-center w-full mt-5 justify-center shadow-lg input flex items-center gap-5 '>
                    <h1>Sign {title} with Github </h1>
                    <a><FaGithub /></a>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;