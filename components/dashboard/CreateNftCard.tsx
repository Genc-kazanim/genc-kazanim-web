import React, { useState } from 'react';
import NftCard from '@/components/nft/nft_box';
import NftView from "@/components/nft/NftView";
import AdminNftCard from "@/components/nft/admin_nft";
import AdminNftCard2 from "@/components/nft/admin_v2";
const CreateNftCard = () => {
    const [nftImageUrl, setNftImageUrl] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [name, setName] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [certificationType, setCertificationType] = useState('');
    const [issuedPlace, setIssuedPlace] = useState('');
    const [selectedFile, setSelectedFile] = useState(null); // New state for storing the file

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNftImageUrl(URL.createObjectURL(file));
            setSelectedFile(file); // Store the file
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        // Append the image file and other details
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        formData.append('event_name', name);
        formData.append('issued_place', issuedPlace);
        formData.append('certification_type', certificationType);

        try {
            const response = await fetch('http://localhost:8000/create_event', {
                method: 'POST',
                body: formData,

            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            console.log('Saved Event:', result);
        } catch (error) {
            console.error('Error during API request:', error);
        }
    };




    const [showNftView, setShowNftView] = useState(false);
    const handleViewClick = () => {
        // Toggle visibility of NftView
        setShowNftView(!showNftView);
    };
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {/* Title */}
            <h1 className="text-center text-2xl font-bold mb-4">
                Sertifika Oluştur
            </h1>
            <div className="container  mx-auto flex justify-center flex-col lg:flex-row gap-10">

                <form className="flex flex-col gap-7 p-5 rounded-[20px] bg-white shadow-lg max-w-md dark:bg-gray-900"
                      onSubmit={handleSubmit}>
                    <input
                        type="file"
                        accept="image/*"
                        className="p-2 border rounded"
                        onChange={handleFileChange}
                    />
                    <input
                        type="text"
                        placeholder="kazanim adı"
                        className="p-2 border rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <select
                        className="p-2 border rounded"
                        value={issuedPlace}
                        onChange={(e) => setIssuedPlace(e.target.value)}
                    >
                        <option value="">Düzenleyen Gençlik Merkezi</option>
                        <option value="Izmir Buca Genclik Merkezi">İzmir Buca Gençlik Merkezi</option>
                        <option value="Istanbul Beykoz Genclik Merkezi">İstanbul Beykoz Gençlik Merkezi</option>
                        <option value="Ankara Cankaya Genclik Merkezi">Ankara Çankaya Gençlik Merkezi</option>
                        <option value="Antalya Muratpasa Genclik Merkezi">Antalya Muratpaşa Gençlik Merkezi</option>
                        <option value="Bursa Osmangazi Genclik Merkezi">Bursa Osmangazi Gençlik Merkezi</option>
                    </select>
                    <select
                        className="p-2 border rounded"
                        value={certificationType}
                        onChange={(e) => setCertificationType(e.target.value)}
                    >
                        <option value="">Kazanım Türü</option>
                        <option value="Gönüllülük Faaliyeti">Gönüllülük Faaliyeti</option>
                        <option value="Atölye Faaliyeti">Atölye Faaliyeti</option>
                        <option value="Gençlik Merkezi Gönüllüsü">Gençlik Merkezi Gönüllüsü</option>
                        <option value="Kamp Liderliği">Kamp Liderliği</option>
                        <option value="Kamp Katılımı">Kamp Katılımı</option>
                        <option value="Kurs Bitirme">Kurs Bitirme</option>
                    </select>
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Kazanım Belgesi Oluştur
                    </button>
                </form>

                {/* NFT Önizlemesi */}
                <AdminNftCard2
                    nftImageUrl={nftImageUrl || 'https://uniwave-main.s3.eu-central-1.amazonaws.com/codioful-formerly-gradienta-LeG68PrXA6Y-unsplash.jpg'}
                    creationName={name || 'Kazanım Adı'}
                    issuedPlace={issuedPlace || 'Düzenleyen Gençlik Merkezi'}
                    certificationType={certificationType || 'Kazanım Türü'}
                    onViewClick={handleViewClick} // Bu fonksiyon gerektiği gibi tanımlanmalıdır
                />

                {/* Conditional rendering of NftView */}
                {showNftView && (
                    <NftView
                        nftFullImageUrl={nftImageUrl || 'https://uniwave-main.s3.eu-central-1.amazonaws.com/codioful-formerly-gradienta-LeG68PrXA6Y-unsplash.jpg'}
                        name={name || 'Kazanım Adı'}
                        certificationType={certificationType || 'Sertifika Türü'}
                        issuedPlace={issuedPlace || 'Düzenleyen Gençlik Merkezi'} // Add issuedPlace
                        onShareClick={handleViewClick} // Use handleViewClick to close the NftView
                    />
                )}

            </div>
        </div>
    );
};

export default CreateNftCard;
