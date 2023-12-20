import React, { useContext } from 'react';
import SocialLogin from '../Social Login/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

const Img_hosting_token = import.meta.VITE_Img_hosting_token

const SignUp = () => {
    const { auth, createUser, userUpdate } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    const Img_hosting_url = `https://api.imgbb.com/1/upload?key=${Img_hosting_token}`

    const handleSignup = event => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const file = form.file.value
        const password = form.password.value

        console.log(file)

        const formData = new FormData()
            formData.append('image', file)

            fetch(Img_hosting_url, {
                method : 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(imageresponse=>{
                if(imageresponse.success){
                    const photoURL = imageresponse.data.display_url 
                    userUpdate(name, photoURL)
                }

            })

        createUser(auth, email, password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)

                const seveUser = {name, email }
                fetch('https://language-masters-server.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(seveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insetedId) {
                            toast.success('Signup Successfully!', {
                                position: 'top-center',
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'light',
                            });
                        }
                        navigate(from, { replace: true })
                        form.name.value = "",
                            form.email.value = ""
                        form.password.value = ""
                    })

            })
    }

    return (
        <div className='md:flex bg-purple-50 w-full justify-center items-center pt-20'>
            <div className='md:w-1/3 text-center '>
                <img src="https://i.ibb.co/VjMP2wM/logo2.png" className='w-66 fiexed' alt="" />
            </div>
            <div className='m-10 p-5 md:w-1/4 rounded-lg'>
                <div>
                    <SocialLogin title="up"></SocialLogin>
                    <div className="divider text-black">OR</div>
                    <form onSubmit={handleSignup}>
                        <div className="form-control pb-5">
                            <input type="text" name='name' placeholder="Your Name" className="shadow-lg input w-full" required />
                        </div>
                        <div className="form-control pb-5">
                            <input type="email" name='email' placeholder="Email" className="shadow-lg input w-full" required />
                        </div>
                        <div className="form-control pb-5 grid grid-cols-2 gap-x-5">
                            <input type="file" photo="file" name='file' required className="file-input  file-input-bordered w-full max-w-xs" />
                            <input type="password" name='password' placeholder="password" className="shadow-lg input w-full" required />
                        </div>
                        <div className="form-control mt-6 ">
                            <input className="btn btn-secondary shadow-lg" type="submit" value="Sign Up" />
                        </div>
                    </form>
                </div>
                <a className='flex justify-center items-center gap-x-2 mt-5' ><Link className='underline text-purple-600 text-lg' to={"/login"}>Login</Link> If you have an account</a>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;