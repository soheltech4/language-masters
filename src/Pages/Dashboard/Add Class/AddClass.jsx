import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';

const img_hoisting_token = import.meta.env.VITE_Img_Upload_Token

const AddClass = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const img_hoisting_url = `https://api.imgbb.com/1/upload?key=${img_hoisting_token}`

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
    
        fetch(img_hoisting_url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((imgRes) => {
                if (imgRes.success) {
                    const Thumbnail = imgRes?.data?.display_url;
                    const { Title, Description, InstructorEmail, InstructorName, price, Rating, Seat } = data;
                    const newClass = {Title, Description, InstructorEmail, InstructorName, price: parseFloat(price), Rating: parseFloat(Rating), Seat: parseFloat(Seat), Thumbnail };
                    console.log(newClass);
                    fetch('https://language-masters-server.vercel.app/allclass', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newClass),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.insertedId) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Class Added Successfully',
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                            } 
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className='w-3/4'>
            <div className='bg-purple-200 shadow-md p-5 md:p-10 rounded-lg w-full'>
                <h1 className='text-3xl text-center pb-10'>ADD CLASS</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-5'>
                    <div className="form-control w-full ">
                            <input type="text" placeholder="Class Title" {...register("Title", { required: true })} className="input input-bordered w-full " />
                        </div>
                        <div className="form-control w-full ">
                            <input type="text" {...register("InstructorName", { required: true })} defaultValue={user?.displayName} placeholder="Instructor Name" required className="input input-bordered w-full " />
                        </div>
                        <div className="form-control w-full ">
                            <input type="email" {...register("InstructorEmail", { required: true })} defaultValue={user?.email} placeholder="Instructor Email" className="input input-bordered w-full " />
                        </div>
                        <div className="form-control w-full ">
                            <input type="number" placeholder="Class Price" {...register("price", { required: true })} className="input input-bordered w-full " />
                        </div>
                        <div className="form-control w-full ">
                            <input type="number" placeholder="Rating" {...register("Rating", { required: true })} className="input input-bordered w-full " />
                        </div>
                        <div className="form-control w-full ">
                            <input type="number" placeholder="Seat" {...register("Seat", { required: true })} className="input input-bordered w-full " />
                        </div>
                    </div>
                    <div className="form-control py-5">
                        <textarea className="textarea textarea-bordered h-24" {...register("Description", { required: true })} placeholder="Description"></textarea>
                    </div>
                    <div className='flex justify-between'>
                        <div className="form-control w-full max-w-xs">
                            <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                        </div>
                        <input className='relative px-5 hover:bg-indigo-950 inline-flex items-center justify-center overflow-hidden  text-black hover:text-white font-bold transition duration-300 ease-out border-2 border-black rounded-full shadow-md group' type="submit" value="ADD TOY">
                        </input>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default AddClass;