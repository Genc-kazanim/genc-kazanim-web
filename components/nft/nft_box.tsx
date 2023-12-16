
import React, { useState } from 'react';

class NftCard extends React.Component<{
    nftImageUrl: string,
    profileImageUrl: string,
    name: string,
    obtainedDate: string,
    obtainedFrom: string,
    certificationType: string,
    onProfileClick: () => void,
    onViewClick: () => void
}> {
    render() {
        const {
            nftImageUrl,
            profileImageUrl,
            name,
            obtainedDate,
            obtainedFrom,
            certificationType,
            onProfileClick,
            onViewClick
        } = this.props;

        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="relative flex flex-col rounded-[20px] max-w-[300px] max-h-[500px] bg-white dark:bg-gray-900 shadow-3xl p-4 overflow-hidden">
                    <div className="relative mb-3 w-full h-[200px]">
                        <img src={nftImageUrl} className="w-full h-full object-cover rounded-xl" alt="NFT" />
                        <button
                            onClick={onProfileClick}
                            className="absolute top-3 right-3 rounded-full bg-white p-0 hover:cursor-pointer"
                            style={{ width: '3em', height: '3em' }}
                        >
                            <img src={profileImageUrl} alt="Profile" className="rounded-full object-cover object-center" style={{ width: '100%', height: '100%' }} />
                        </button>
                    </div>
                    <div className="mb-3 flex justify-between px-1">
                        <div>
                            <p className="text-lg font-bold text-gray-800">{name}</p>
                            <p className="text-sm font-medium text-gray-500">{obtainedFrom}</p>
                            <p className="text-sm font-medium text-gray-500">{obtainedDate}</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-sm font-bold text-brand-500">{certificationType}</p>
                        <button
                            onClick={onViewClick}
                            className="rounded-[20px] bg-gray-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800"
                        >
                            View
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NftCard;
