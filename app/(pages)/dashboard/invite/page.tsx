

'use client';
import React from 'react';
import { InviteFriends } from '../components/InviteFriends';

const Invite: React.FC = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-magic-card/30 p-6 rounded-3xl border border-white/5 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-black text-white mb-1 drop-shadow-lg flex items-center gap-2">
                        Invite Friends <i className="fa-solid fa-gift text-yellow-400 ml-2"></i>
                    </h1>
                    <p className="text-gray-400 text-sm font-bold">
                        Share the magic and earn rewards.
                    </p>
                </div>
            </div>

            <div className="bg-magic-card/30 rounded-3xl p-4 md:p-6 border border-white/5 min-h-[500px] flex flex-col justify-center">
                <InviteFriends />
            </div>
        </>
    );
};


export default Invite;