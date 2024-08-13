import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Inter } from "next/font/google";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const inter = Inter({ subsets: ["latin"] });

export default function Wallet() {
    const [walletAddress, setWalletAddress] = useState("");
    const [walletData, setWalletData] = useState(null);
    const [walletActivity, setWalletActivity] = useState([]);

    const handleSearch = async () => {
        // Get detail wallet
        try {
            const res = await axios.get('http://localhost:3000/api/v1/wallets?wallet_address=' + walletAddress);
            setWalletData(res.data);
        } catch (error) {
            console.error(error);
        }

        // Get activity wallet
        try {
            const res = await axios.get('http://localhost:3000/api/v1/wallets/activities?wallet_address=' + walletAddress);
            setWalletActivity(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <div className="w-2/3">
                <h1 className="text-4xl mb-5 text-center">Search Wallet Address</h1>
                <div className="flex gap-2 mt-2">
                    <InputText
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        placeholder="Enter wallet address"
                        className="flex-1 py-2 px-4 text-black"
                    />
                    <a
                        href="#"
                        onClick={handleSearch}
                        className="p-button text-sm font-bold text-white flex-shrink-0"
                    >
                        Search
                    </a>
                </div>

                {walletData && (
                    <Card className="mt-4">
                        <h2 className="mb-4 text-lg">Wallet Details</h2>
                        <p><strong>Address:</strong> {walletAddress}</p>
                        <p><strong>Display Name:</strong> {walletData?.displayName}</p>
                        <p><strong>Avatar:</strong> {walletData?.avatar}</p>
                        <p><strong>Bio:</strong> {walletData.bio ?? '-'}</p>
                    </Card>
                )}

                { walletActivity.length > 0 && (
                    <Card className="mt-4">
                        <h2 className="mb-4 text-lg">Wallet Activities</h2>
                        <DataTable
                            value={walletActivity} 
                            paginator={true} 
                            rows={10} 
                            rowsPerPageOptions={[10, 25, 50]} 
                            tableStyle={{ minWidth: '50rem' }}>
                            <Column 
                                header="#" 
                                body={(rowData, { rowIndex }) => rowIndex + 1}
                                style={{ padding: '8px' }}
                            />
                            <Column field="collection" header="Collection" sortable style={{ padding: '8px' }}/>
                            <Column field="signature" header="Signature" sortable style={{ padding: '8px' }}/>
                            <Column field="type" header="Type" sortable style={{ padding: '8px' }}/>
                            <Column field="source" header="Source" sortable style={{ padding: '8px' }}/>
                            <Column field="slot" header="Slot" sortable style={{ padding: '8px' }}/>
                            <Column field="seller" header="Seller" sortable style={{ padding: '8px' }}/>
                            <Column
                                field="price"
                                header="Price"
                                sortable
                                style={{ padding: '8px' }}
                                body={(rowData) => rowData.price.toFixed(2) + ' SOL'}
                            />
                        </DataTable>
                    </Card>
                )}
            </div>
        </main>
    );
}
