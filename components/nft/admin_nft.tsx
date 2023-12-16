
import React, { useState } from 'react';

class AdminNftCard extends React.Component<{
    nftImageUrl: any,
    creationName: any,
    certificationType: any,
    onViewClick: any
}> {


    render() {
        let {
            nftImageUrl,
            creationName,
            certificationType,
            onViewClick
        } = this.props;


        return (
            <div className="flex justify-center items-center h-[40vh]">
                <div
                    className="relative flex flex-col rounded-[20px] max-w-[300px] max-h-[400px] bg-white dark:bg-gray-900 shadow-3xl p-4 overflow-hidden">
                    <div className="relative mb-3 w-full h-[150px]">
                        <img
                            src={nftImageUrl}
                            className="mb-3 w-full h-full object-cover rounded-xl w-[200px] " alt="NFT"
                        />
                    </div>
                    <div className="mb-3 flex justify-between px-1">
                        <div>
                            <p className="text-lg font-bold text-white">{creationName}</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-sm font-bold text-brand-500">{certificationType}</p>
                        <button
                            onClick={onViewClick}
                            className="rounded-[20px] bg-gray-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800"
                        >
                            Görüntüle
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminNftCard;
