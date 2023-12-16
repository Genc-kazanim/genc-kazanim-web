import React, {useEffect, useState} from 'react';

interface UserNFTItem {
    nftImageUrl: string;
    name: string;
    certificationType: string;
    optainedDate: string;
    optainedFrom: string;
}

interface User {
    wallet_id: string;
    nfts: UserNFTItem[];
}

interface NFTItem {
    _id: string;
    nftImageUrl: string;
    name: string;
    creationDate: string;
    issuedPlace: string;
    certificationType: string;
}

const AddNftToUser: React.FC = () => {
    const [walletId, setWalletId] = useState<string>('');
    const [nftItems, setNftItems] = useState<NFTItem[]>([]);
    const [selectedNftId, setSelectedNftId] = useState<string>('');
    const [obtainedDate, setObtainedDate] = useState<string>('');

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/nft');
                const data = await response.json();
                console.log('NFTs:', data);
                setNftItems(data);
            } catch (error) {
                console.error('Error fetching NFTs:', error);
            }
        };
        console.log('Fetching NFTs...');
        fetchNFTs();

    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const selectedNft = nftItems.find(nft => nft._id === selectedNftId);

        if (!selectedNft) {
            return;
        }

        const userNftItem: UserNFTItem = {
            nftImageUrl: selectedNft.nftImageUrl,
            name: selectedNft.name,
            certificationType: selectedNft.certificationType,
            obtainedDate: obtainedDate,
            obtainedFrom: selectedNft.issuedPlace
        };

        const user: User = {
            wallet_id: walletId,
            nfts: [userNftItem]
        };
        console.log('Data being sent to /user_create:', user);
        try {
            const response = await fetch('http://127.0.0.1:8000/user_create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('User updated with NFT:', data);
        } catch (error) {
            console.error('Error adding NFT to user:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="walletId">
                        Wallet ID
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="walletId"
                        type="text"
                        placeholder="Wallet ID"
                        value={walletId}
                        onChange={(e) => setWalletId(e.target.value)}
                    />
                </div>
                {/* Add other fields for NFT data similar to above */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nftSelection">
                        Select NFT
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nftSelection"
                        value={selectedNftId}
                        onChange={(e) => setSelectedNftId(e.target.value)}
                    >
                        <option value="">Select an NFT</option>
                        {nftItems.map((nft) => (
                            <option key={nft._id} value={nft._id}>{nft.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="obtainedDate">
                        Obtained Date
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="obtainedDate"
                        type="date"
                        value={obtainedDate}
                        onChange={(e) => setObtainedDate(e.target.value)}
                    />
                </div>
                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add NFT to User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNftToUser;
