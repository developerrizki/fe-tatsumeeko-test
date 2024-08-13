import { Inter } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const inter = Inter({ subsets: ["latin"] });

export default function Market() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3000/api/v1/marketplaces');
            setData(res.data);
        };
    
        fetchData();
    }, []);

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <div className="text-4xl mb-5">
                <h1>Top Collections</h1>
            </div>
            <div className="card w-full">
                <DataTable 
                    value={data} 
                    paginator={true} 
                    rows={10} 
                    rowsPerPageOptions={[10, 25, 50]} 
                    tableStyle={{ minWidth: '50rem' }}>
                    <Column 
                        header="#" 
                        body={(rowData, { rowIndex }) => rowIndex + 1}
                        style={{ padding: '8px' }}
                    />
                    <Column 
                        field="image" 
                        header="Collection"
                        body={(rowData) => (
                            <img 
                                src={rowData.image} 
                                alt={rowData.name} 
                                width="72" 
                                height="72" 
                                className="rounded-full"
                            />
                        )}
                        style={{ padding: '8px' }}
                    />
                    <Column field="name" header="Name" sortable style={{ padding: '8px' }}/>
                    <Column
                        field="floorPrice"
                        header="Floor"
                        sortable
                        style={{ padding: '8px' }}
                        body={(rowData) => (rowData.floorPrice/1000000000).toFixed(2) + ' SOL'}
                    />
                    <Column
                        field="volumeAll"
                        header="Volume"
                        sortable
                        style={{ padding: '8px' }}
                        body={(rowData) => (rowData.volumeAll/1000).toFixed(2) + ' SOL'}
                    />
                    <Column
                        header="Action"
                        body={(rowData) => (
                            <>
                                <a href={`/collections/${rowData.symbol}`} className="p-button p-button-rounded text-sm font-bold text-white">List</a> 
                                <a href={`/collections/holder/${rowData.symbol}`} className="p-button p-button-rounded p-button-secondary ml-2 text-sm font-bold text-white ">Holder</a>
                            </>
                        )}
                    />
                </DataTable>
            </div>
        </main>
    );
}
