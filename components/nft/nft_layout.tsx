import React, {useEffect, useState} from "react";
import NftCard from "@/components/nft/nft_box";
import NftView from "@/components/nft/NftView";
import {useAccount} from "wagmi"; // Yolunuza göre ayarlayın

interface HandleViewClickParams {
    nft: any;
}

const NftLayout = () => {
    const { address, isConnected } = useAccount();
    const [nftsData, setNftsData] = useState<NftType[]>([]);
    const [selectedNft, setSelectedNft] = useState<NftType | null>(null);

    useEffect(() => {
        if (!address) return;

        const fetchNfts = async () => {
            if (!address) return;
            console.log('dsfsdfsdf',address)
            try {
                const response = await fetch(`http://localhost:8000/user_events/${address}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const events = await response.json();
                setNftsData(events); // Store the events in the state
                console.log(events);
            } catch (error) {
                console.error('Error while fetching user events:', error);
            }
        };

        fetchNfts();
    }, [address]);
    console.log(nftsData)
    const groupedNfts = nftsData.reduce<Record<string, NftType[]>>((acc, nft) => {
        const key = nft.certification_type;
        acc[key] = acc[key] ?? [];
        acc[key].push(nft);
        return acc;
    }, {});


    const openNftView = (nft: NftType) => {
        setSelectedNft(nft);
    };

    const closeNftView = () => {
        setSelectedNft(null);
    };
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => setHasMounted(true), []);
    if (!hasMounted) {
        return null;
    }
    if (!isConnected) {
        return <div className="text-center p-5">No wallet connected.</div>; // Or any other placeholder you want
    }
    console.log(groupedNfts)
    return (
        <div className="container mx-auto px-8 py-8">
            {Object.entries(groupedNfts).map(([certification_type, nfts], index) => (
                <div key={index} className="mb-10">
                    <h2 className="text-xl font-semibold mb-4">{certification_type}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {nfts.map((nft, idx) => ( // iterate over `nfts` instead of `nftsData`
                            <NftCard
                                key={idx}
                                nftImageUrl={`https://coffee-changing-camel-226.mypinata.cloud/ipfs/${nft.image_ipfs_hash}?pinataGatewayToken=6yvbVp44rWl1Lht7h3_Od8MI4yM2LJJFYih2NZTc-jLlbmPsGo9o61W9KwHWcAPr`}
                                profileImageUrl={"https://uniwave-main.s3.eu-central-1.amazonaws.com/915D2D0A-8718-43AD-B5C0-EB618E074439.JPG"} // Update this according to your data structure
                                name={nft.event_name}
                                obtainedDate={new Date(nft.timestamp * 1000).toLocaleDateString()}
                                obtainedFrom={nft.issued_place}
                                certificationType={nft.certification_type}
                                onProfileClick={() => { /* Define what should happen on profile click */
                                }}
                                onViewClick={() => openNftView(nft)}
                            />
                        ))}
                    </div>
                </div>
            ))}
            {selectedNft && (
                <NftView
                    nftFullImageUrl={`https://coffee-changing-camel-226.mypinata.cloud/ipfs/${selectedNft.image_ipfs_hash}?pinataGatewayToken=6yvbVp44rWl1Lht7h3_Od8MI4yM2LJJFYih2NZTc-jLlbmPsGo9o61W9KwHWcAPr`}
                    name={selectedNft.event_name}
                    creationDate={new Date(selectedNft.timestamp * 1000).toLocaleDateString()} // Assuming 'obtainedDate' is the creation date
                    certificationType={selectedNft.certification_type}
                    issuedPlace={selectedNft.issued_place} // Assuming 'obtainedFrom' is the issued place
                    onShareClick={closeNftView} // Assuming you want to close the view on share click
                />
            )}
        </div>
    );
};

export default NftLayout;
