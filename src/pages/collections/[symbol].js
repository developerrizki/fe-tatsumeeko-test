import axios from "axios";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function CollectionDetail() {
    const router = useRouter();
    const { symbol } = router.query;

    const [data, setData] = useState([]);
    const [layout, setLayout] = useState('grid');

    useEffect(() => {
        if (symbol !== undefined) {
            const fetchData = async () => {
                const res = await axios.get('http://localhost:3000/api/v1/collections?symbol=' + symbol);
                setData(res.data);
            };
        
            fetchData();
        }
    }, [symbol]);

    const listItem = (collection, index) => {
        return (
            <div className="col-12" key={collection.pdaAddress}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-[72px] sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${collection.token.image}`} alt={collection.token.collectionName} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{collection.token.collectionName}</div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">{collection.price.toFixed(2)} SOL</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (collection) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={collection.pdaAddress}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-[128px] shadow-2 border-round" src={`${collection.token.image}`} alt={collection.token.collectionName} />
                    </div>
                    <div className="">
                        <div className="text-2xl font-bold">{collection.token.collectionName}</div>
                        <div className="text-2xl font-semibold">{collection.price.toFixed(2)} SOL</div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (collection, layout, index) => {
        if (!collection) {
            return;
        }

        if (layout === 'list') return listItem(collection, index);
        else if (layout === 'grid') return gridItem(collection);
    };

    const listTemplate = (collections, layout) => {
        return <div className="grid grid-nogutter">{collections.map((collection, index) => itemTemplate(collection, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <div className="text-4xl mb-5">
                <h1>Collections {symbol}</h1>
            </div>
            <div className="card w-full">
                <DataView value={data} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
        </main>
    );
}
