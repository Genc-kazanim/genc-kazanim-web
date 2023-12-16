import React from 'react';

class AdminNftCard2 extends React.Component<{
    nftImageUrl: any,
    creationName: any,
    issuedPlace: any,
    certificationType: any,
    onViewClick: any
}> {

    render() {
        let { nftImageUrl, creationName, certificationType, onViewClick,issuedPlace } = this.props;

        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div
                    className="relative flex flex-col rounded-[20px] max-w-[360px] max-h-[520px] bg-white dark:bg-gray-900 shadow-2xl p-4 overflow-hidden">
                    <div className="relative mb-4 w-full h-[220px]">
                        <img
                            src={nftImageUrl}
                            className="w-full h-full object-cover rounded-xl"
                            alt="NFT"
                        />
                    </div>
                    <div className="mb-4 flex justify-between px-0">
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{creationName}</p>
                    </div>
                    <p className={`text-sm`}>{issuedPlace}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-md font-bold text-brand-500">{certificationType}</p>
                        <button
                            onClick={onViewClick}
                            className="rounded-[20px] bg-black px-5 py-3 text-lg font-medium text-white transition duration-200 hover:bg-brand-700"
                        >
                            Görüntüle
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminNftCard2;
