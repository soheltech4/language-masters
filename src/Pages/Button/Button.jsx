import React, { useContext } from 'react';
import useCart from '../../Hooks/useCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Button = ({ title, item }) => {
    const { _id, Title, InstructorName, Thumbnail, price, Seat, Enroll, Language } = item

    const { user } = useContext(AuthContext)
    const [cart, refetch] = useCart()
    const navigate = useNavigate()
    const location = useLocation()

    const handleAddCart = item => {
        console.log(item)
        if (user && user?.email) {
            const classItem = { itemId: _id, Title, InstructorName, Thumbnail, price, Language, email: user?.email }
            console.log(classItem)
            fetch('https://language-masters-server.vercel.app/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(classItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch()
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Class Added Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please Login to Add the Class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div>
            {Seat - Enroll == 0 ?
                <>
                    <p href="#_" className="relative inline-flex items-center px-3 py-2 overflow-hidden text-lg font-medium text-gray-400 border-2 border-gray-400 rounded-full group ">
                        <span className="relative text-xs">{title}</span>
                    </p>                        </>
                :
                <>
                    <button onClick={() => { handleAddCart(item) }} href="#_" className="relative inline-flex items-center px-3 py-2 overflow-hidden text-lg font-medium text-purple-600 border-2 border-purple-600 rounded-full hover:text-white group hover:bg-gray-50">
                        <span className="absolute left-0 block w-full h-0 transition-all bg-purple-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                        <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        </span>
                        <span className="relative text-xs">{title}</span>
                    </button>
                </>
            }

        </div>
    );
};

export default Button;