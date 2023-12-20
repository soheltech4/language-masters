import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../Social Login/SocialLogin';
import { AuthContext } from '../../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const saveUser = {email, password}
                fetch('https://language-masters-server.vercel.app/users', {
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
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
                        }
                        navigate(from, { replace: true })
                        form.email.value = '';
                        form.password.value = ''
                    })
            });
    };

    return (
        <div className="md:flex bg-purple-50 pb-20 w-full justify-center items-center pt-20 ">
            <div className="md:w-1/3 text-center ">
                <img src="https://i.ibb.co/VjMP2wM/logo2.png" className="w-66 fiexed" alt="" />
            </div>
            <div className="m-10 p-5 md:w-1/4 rounded-lg">
                <div>
                    <SocialLogin title="in"></SocialLogin>
                    <div className="divider text-black">OR</div>
                    <form onSubmit={handleLogin}>
                        <div className="form-control pb-5">
                            <input type="email" name="email" placeholder="Email" className="shadow-lg input w-full" required />
                        </div>
                        <div className="form-control">
                            <input type="password" name="password" placeholder="password" className="shadow-lg input w-full" required />
                        </div>
                        <div className="form-control mt-6 ">
                            <input className="btn btn-secondary shadow-lg" type="submit" value="Login" />
                        </div>
                    </form>
                </div>
                <a className="flex justify-center items-center gap-x-2 mt-5">
                    <Link className="underline text-purple-600 text-lg" to="/signup">Sign Up</Link> If you don't have an account
                </a>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;