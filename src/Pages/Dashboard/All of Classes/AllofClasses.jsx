import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllofClasses = () => {
    const [Classes, setClasses] = useState([])

    useEffect(() => {
        fetch('https://language-masters-server.vercel.app/allclass')
            .then(res => res.json())
            .then(data => {
                setClasses(data);
            });
    }, []);


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
                fetch(`https://language-masters-server.vercel.app/alclass/${item?._id}`, {
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
            <div className='relative md:flex justify-evenly lg:flex-row-reverse gap-x-24 rounded-md  px-10 '>
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
                                Classes.map((item, index) =>
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
        </div>
    );
};

export default AllofClasses;