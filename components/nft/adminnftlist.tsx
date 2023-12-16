import React, { useState, useEffect } from 'react';
import AdminNftCard from './admin_nft';

function AdminNftList() {
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        async function fetchNFTs() {
            try {
                const response = await fetch('http://localhost:8000/all_events');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('NFTs:', data)
                setNfts(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        fetchNFTs();
    }, []);

    const groupNFTsByCertificationType = (nftArray) => {
        return nftArray.reduce((acc, nft) => {
            acc[nft.certification_type] = acc[nft.certification_type] || [];
            acc[nft.certification_type].push(nft);
            return acc;
        }, {});
    };

    const groupedNFTs = groupNFTsByCertificationType(nfts);
    console.log('groupedNFTs:', groupedNFTs);
    return (
        <div>
            {Object.keys(groupedNFTs).map(certification_type => (
                <div key={certification_type}>

                    <h2 className="text-lg font-bold mb-4">{certification_type}</h2>
                    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(8, minmax(200px, 8fr))' }}>
                        {groupedNFTs[certification_type].map(nft => (
                            <AdminNftCard
                                key={nft._id}
                                creationName={nft.event_name}
                                nftImageUrl={`https://coffee-changing-camel-226.mypinata.cloud/ipfs/${nft.image_ipfs_hash}?pinataGatewayToken=6yvbVp44rWl1Lht7h3_Od8MI4yM2LJJFYih2NZTc-jLlbmPsGo9o61W9KwHWcAPr`}
                                creationDate={nft.timestamp}
                                certificationType={nft.certification_type}
                                onViewClick={() => console.log('View button clicked for', nft._id)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminNftList;
