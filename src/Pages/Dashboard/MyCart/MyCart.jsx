import React from 'react';
import useCart from '../../../Hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyCart = () => {

    const [cart, refetch] = useCart()
    console.log(cart)
    const fee = cart?.length * 2
    const ClassPrice = cart.reduce((sum, item) => item.price + sum, 0)
    const total = cart.reduce((sum, item) => item.price + sum + fee, 0)
    const item = cart.length > 0


    console.log(cart)

    const handleDelete = item => {
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
                fetch(`https://language-masters-server.vercel.app/carts/${item?._id}`, {
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
            {item ?
                <>
                    <div className='relative md:flex justify-evenly lg:flex-row-reverse gap-x-24 rounded-md  px-10 '>
                        <div className='bg-purple-100 shadow-lg w-full md:w-1/3 md: h-2/3 rounded-lg p-5'>
                            <div className=''>
                                <h1 className='text-lg font-bold text-center'>Order Summary</h1>
                                <div className="divider"></div>
                                <div>
                                    <div className='flex justify-between'>
                                        <p>Total Class:</p>
                                        <p className='text-yellow-600 font-semiboldbold'>{cart?.length}</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p>Handling Fee :</p>
                                        <p className='text-yellow-600 font-semiboldbold'>$ {fee} </p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p>Total :</p>
                                        <p className='text-yellow-600 font-semiboldbold'>$ {ClassPrice.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className='flex justify-between'>
                                    <p className='text-lg font-bold'>Total :</p>
                                    <p>US $ <span className='text-yellow-600 font-semiboldbold'>{total.toFixed(2)}</span></p>
                                </div>

                                <div className='text-center mt-10 '>
                                    <button href="#_" class="w-full relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-red-700 transition duration-300 ease-out border-2 border-red-700 rounded-full shadow-md group">
                                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-700  group-hover:translate-x-0 ease">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>
                                        <span className="uppercase absolute flex items-center justify-center w-full h-full  transition-all duration-300 transform group-hover:translate-x-full ease">buy Now</span>
                                        <span className="relative invisible w-full text-black">PAY NOW</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto  bg-purple-100 shadow-md bg-opacity-25 w-full rounded-lg">
                            <table className="table tex- ">
                                <thead>
                                    <tr className='text-center text-lg'>
                                        <th>#</th>
                                        <th>Thumbnail</th>
                                        <th>Class Name</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center text-lg bg-purple-100 '>
                                    {
                                        cart.map((item, index) =>
                                            <tr key={item?._id}>
                                                <td>
                                                    <h1>{index + 1}</h1>
                                                </td>
                                                <td>
                                                    <Link to={`/allclass/${item?.itemId}`}>
                                                        <div className="avatar">
                                                            <div className="mask mask-square w-12 h-12">
                                                                <img src={item?.Thumbnail} className='' alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <p>{item?.Title}</p>
                                                </td>
                                                <td>$<span className='text-yellow-600'>{item?.price}</span></td>
                                                <td>
                                                    <button onClick={() => handleDelete(item)}>
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
                <h1 className='text-center uppercase justify-center items-center flex'>No Class Added</h1>
            
                </>

            }
        </div>
    );
};

export default MyCart;