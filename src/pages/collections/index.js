import axios from "axios";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Collection() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3000/api/v1/collections/list');
            setData(res.data);
        };
    
        fetchData();
    }, []);

    console.log(data);

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <div className="text-4xl mb-5">
                <h1>Collections</h1>
            </div>

            <div className="flex flex-wrap">
                {data.map((collection, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-2">
                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href={`/collections/${collection.symbol}`}>
                                <img className="rounded-t-lg object-cover h-48 w-full" src={collection.image} alt={collection.name} />
                            </a>
                            <div className="p-5 flex flex-col justify-between h-48">
                                <a href={`/collections/${collection.symbol}`}>
                                    <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                        {collection.name}
                                    </h5>
                                </a>
                            </div>
                        </div>
                    </div>                
                ))}
            </div>
        </main>
    );
}
