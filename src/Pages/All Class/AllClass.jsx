import React, { useContext, useEffect, useState } from 'react';
import { FaSistrix, FaTh, FaThList } from 'react-icons/fa';
import ShowAllClass from './ShowAllClass';
import ShowClassList from './ShowClassList';
import { AuthContext } from '../../Provider/AuthProvider';

const AllClass = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [ShowByList, setShowByList] = useState(false)
    const [ShowByGrid, setShowByGrid] = useState(true)
    const {loading} = useContext(AuthContext)

    useEffect(() => {
        fetch('https://language-masters-server.vercel.app/allclass')
            .then(res => {
                if(!res.ok){
                    throw new Error('Network Response was no ok')
                }
                return res.json()
            })
            .then(data => {
                setItems(data);
                setFilteredItems(data);
            });
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = items.filter(item => item.Title.toLowerCase().includes(query.toLowerCase()));
        setFilteredItems(filtered);
    };

    const handleShowbyList = () => {
        setShowByList(true)
        setShowByGrid(false)
    }

    const handleShowbyGrid = () => {
        setShowByList(false)
        setShowByGrid(true)
    }

    return (
        <div className='md:flex p-5 pt-24'>
            <div className='md:w-2/6 mr-5'>
                <h1 className='text-lg font-bold'>View Data</h1>
                <div className='flex gap-5 text-xl pl-2 mb-5'>
                    <button onClick={handleShowbyList} className={`text-black ${ShowByGrid ? 'text-gray-400' : ''}`}>
                        <FaThList />
                    </button>
                    <button onClick={handleShowbyGrid} className={`text-black ${ShowByList ? 'text-gray-400' : ''}`}>
                        <FaTh />
                    </button>
                </div>
                <h1 className='text-lg font-bold'>Search Your Class</h1>
                <div className="relative mb-5">
                    <input
                        type="text"
                        placeholder="Search Languages Class"
                        className="input input-bordered w-full text-sm h-8 pr-16"
                        onChange={handleSearch}
                        value={searchQuery}
                    />
                    <button className="absolute top-0 right-0 rounded-l-none h-8 pr-3"><FaSistrix /></button>
                </div>
            </div>
            {ShowByGrid ?
                <>
                    <div className='grid md:grid-cols-5 gap-5 justify-center'>
                        {filteredItems.length === 0 ?
                            (
                                <p className='text-lg text-red-600 text-center'>No Class found</p>
                            ) 
                            : 
                            (
                                filteredItems.map(item => (<ShowAllClass key={item?._id} item={item} />))
                            )
                        }
                    </div>
                </>
                :
                <>
                    <div className='grid md:grid-cols-2 gap-5 justify-center'>
                        {filteredItems.length === 0 ?
                            (
                                <p className='text-lg text-red-600 text-center'>No Class found</p>
                            ) : (filteredItems.map(item => (<ShowClassList key={item?._id} item={item} />
                            ))
                            )}
                    </div>
                </>
            }
        </div>
    );
};

export default AllClass;