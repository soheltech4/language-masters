import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useCart from '../../../Hooks/useCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Users = () => {
    const [users, setUsers] = useState([])
    const [cart, refetch] = useCart()

    useEffect(() => {
        fetch('https://language-masters-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])


    const handleMakeAdmin = user => {
        fetch(`https://language-masters-server.vercel.app/users/admin/${user?._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    toast.success(`${user?.name} is admin Now!`, {
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
            })
    }

    const handleMakeInstructor = user => {
        fetch(`https://language-masters-server.vercel.app/users/instructor/${user?._id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    toast.success(`${user?.name} is Instructor Now!`, {
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
            })
    }



    const handleDelete = user => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://language-masters-server.vercel.app/users/${user?._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your Class has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }

    return (
        <div className='w-full h-full md:p-10 pt-10 text-lg'>
            {users ?
                <>
                    <div className='relative md:flex justify-evenly lg:flex-row-reverse gap-x-24 rounded-md  px-10 '>
                        <div className="overflow-x-auto  bg-purple-200 shadow-md bg-opacity-25 w-full rounded-lg">
                            <table className="table tex- ">
                                <thead>
                                    <tr className='text-center text-lg'>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>User</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center text-lg bg-purple-100 '>
                                    {
                                        users.map((user, indexOf) =>
                                            <tr key={user?._id}>
                                                <td>
                                                    <h1>{indexOf + 1}</h1>
                                                </td>
                                                <td>
                                                    <p>{user?.name}</p>
                                                </td>
                                                <td>{user?.email}</td>
                                                <td className='grid grid-cols-1'>
                                                    <p >
                                                        {user?.role === 'admin' ? 'Admin' :
                                                            <button className='text-white bg-orange-600 rounded-md px-2' onClick={() => handleMakeAdmin(user)}>
                                                                Make Admin
                                                                <ToastContainer />
                                                            </button>
                                                        }
                                                    </p>
                                                    <p>
                                                        {user?.role === 'instructor' ? 'Instructor' :
                                                            <button className='text-white bg-orange-600 rounded-md px-2' onClick={() => handleMakeInstructor(user)}>
                                                                Make Instructor
                                                                <ToastContainer />
                                                            </button>

                                                        }
                                                    </p>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleDelete(user)}>
                                                        <FaTrashAlt className='h-5 text-red-700'></FaTrashAlt>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </>
                :
                <>
                    <h1 className='text-center uppercase justify-center items-center flex'>No User Found</h1>

                </>

            }
        </div>
    );
};

export default Users;