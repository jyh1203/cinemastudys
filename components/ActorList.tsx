import React from 'react';
import type { Actor } from '../types';

interface ActorListProps {
    actors: { actor: Actor; score: number }[];
    onSelectActor: (actor: Actor) => void;
}

const ActorList: React.FC<ActorListProps> = ({ actors, onSelectActor }) => {
    const hasActiveFilter = actors.length > 0 && actors[0].score > 0;

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">
                Filtered Actors <span className="text-slate-400 text-lg">({actors.length})</span>
            </h2>
            {actors.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {actors.map(({ actor, score }) => (
                        <button
                            key={actor.name}
                            onClick={() => onSelectActor(actor)}
                            className="text-left p-3 bg-slate-700 rounded-lg hover:bg-slate-600 hover:shadow-cyan-500/20 shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <div className="flex justify-between items-start">
                                <span className="font-semibold text-slate-100 pr-2">{actor.name}</span>
                                {hasActiveFilter && (
                                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-slate-900 text-xs font-bold bg-cyan-400 rounded-full">
                                        {score}
                                    </span>
                                )}
                            </div>
                            <span className="block text-xs text-slate-400 mt-1">{actor.nat} / {actor.sex}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <svg className="w-16 h-16 text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <p className="text-slate-400">No actors match the current filters.</p>
                    <p className="text-sm text-slate-500">Try removing some filters or using a preset label.</p>
                </div>
            )}
        </div>
    );
};

export default ActorList;