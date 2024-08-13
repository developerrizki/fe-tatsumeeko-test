import axios from "axios";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function CollectionHolder() {
    const router = useRouter();
    const { symbol } = router.query;

    const [data, setData] = useState([]);

    useEffect(() => {
        if (symbol !== undefined) {
            const fetchData = async () => {
                const res = await axios.get('http://localhost:3000/api/v1/collections/holder-stats?symbol=' + symbol);
                setData(res.data);
            };
        
            fetchData();
        }
    }, [symbol]);

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <div className="text-4xl mb-5">
                <h1>Collections Holder</h1>
            </div>
            <div className="card w-full">
                <DataTable
                    value={data.topHolders} 
                    paginator={true} 
                    rows={25} 
                    rowsPerPageOptions={[25, 50, 100]} 
                    tableStyle={{ minWidth: '50rem' }}>
                    <Column 
                        header="#" 
                        body={(rowData, { rowIndex }) => rowIndex + 1}
                        style={{ padding: '8px' }}
                    />
                    <Column field="owner" header="Owner" sortable style={{ padding: '8px' }}/>
                    <Column field="tokens" header="Tokens" sortable style={{ padding: '8px' }}/>
                </DataTable>
            </div>
        </main>
    );
}
