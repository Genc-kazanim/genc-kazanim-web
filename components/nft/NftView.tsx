// NftView.tsx
import React, {useRef, useState} from "react";
import html2canvas from "html2canvas";

interface NftViewProps {
    nftFullImageUrl: string;
    name: string;
    certificationType: string;
    issuedPlace: string; // New prop for issued place
    onShareClick: () => void; // Function to handle the share button click
}

const NftView: React.FC<NftViewProps> = ({
                                             nftFullImageUrl,

                                             certificationType,
                                             issuedPlace, // Add issuedPlace here
                                             onShareClick
                                         }) => {
    const [transform, setTransform] = useState('');
    const nftRef = useRef(null); // Add a ref to the container you want to capture

    const handleDownload = async () => {
        if (nftRef.current) {
            const canvas = await html2canvas(nftRef.current);
            const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            const link = document.createElement('a');
            link.download = `${name}.png`;
            link.href = image;
            link.click();
        }
    };
    const calculateTransform = (e: { currentTarget: { getBoundingClientRect: () => any; }; clientX: number; clientY: number; }) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) - (rect.width / 2);
        const y = (e.clientY - rect.top) - (rect.height / 2);

        // Yeni yoğunluk hesaplamaları
        const rotateX = -Math.max(-10, Math.min(10, y / 10));
        const rotateY = Math.max(-10, Math.min(10, x / 10));

        // İmlecin konumuna bağlı yoğunluk ayarı
        const intensity = Math.min(1, Math.sqrt(x*x + y*y) / 300);

        return `perspective(1000px) rotateX(${rotateX * intensity}deg) rotateY(${rotateY * intensity}deg)`;
    };


    const handleMouseMove = (e: { currentTarget: { getBoundingClientRect: () => any; }; clientX: number; clientY: number; }) => {
        const newTransform = calculateTransform(e);
        setTransform(newTransform);
    };
    const handleBackdropClick = (e: { target: any; currentTarget: any; }) => {
        if (e.target === e.currentTarget) {
            onShareClick();
        }
    };
    const handleMouseLeave = () => {
        setTransform('');
    };
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={handleBackdropClick}
        >
            <div
                ref={nftRef}
                className="flex flex-col rounded-2xl bg-white dark:bg-gray-900 shadow-2xl p-6 max-w-3xl w-full transition-transform duration-300 ease-in-out"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{transform: transform}}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={nftFullImageUrl}
                    className="rounded-2xl mb-4"
                    alt="NFT Full"
                    style={{maxHeight: '60vh', objectFit: 'contain'}}
                />
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{name}</h2>
                    <p className="text-md text-gray-600 dark:text-gray-300">Sertifika Türü: {certificationType}</p>
                    <p className="text-md text-gray-600 dark:text-gray-300">Düzenleyen Gençlik Merkezi: {issuedPlace}</p> {/* New line for issued place */}
                </div>
                <button
                    onClick={handleDownload}
                    className="mt-4 self-center rounded-lg bg-blue-500 px-6 py-2 text-lg font-medium text-white hover:bg-blue-600"
                >
                    İndir
                </button>
            </div>
        </div>
    );
};

export default NftView;
