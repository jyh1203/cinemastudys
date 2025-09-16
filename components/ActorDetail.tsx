
import React from 'react';
import type { Actor } from '../types';

interface ActorDetailProps {
    actor: Actor;
    onBack: () => void;
}

const DetailRow: React.FC<{ label: string; value?: string | string[]; colorClass?: string }> = ({ label, value, colorClass = 'text-slate-100' }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    const renderValue = () => {
        if (Array.isArray(value)) {
            return (
                 <div className="flex flex-wrap gap-2">
                    {value.map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-cyan-800 text-cyan-200 text-xs font-medium rounded-full">{item}</span>
                    ))}
                </div>
            );
        }
        return <p className={`font-semibold ${colorClass}`}>{value}</p>;
    };

    return (
        <div className="py-3 px-4 bg-slate-800/70 rounded-md grid grid-cols-3 gap-4 items-start">
            <dt className="text-sm font-medium text-slate-400">{label}</dt>
            <dd className="mt-1 text-sm text-slate-100 sm:mt-0 sm:col-span-2">{renderValue()}</dd>
        </div>
    );
};

const SkillRow: React.FC<{ num: number; skill?: string; desc?: string }> = ({ num, skill, desc }) => {
    if (!skill && !desc) return null;
    return (
        <div className="py-3 px-4 bg-slate-800 rounded-md">
            <p className="font-semibold text-cyan-400">{num}. {skill || 'N/A'}</p>
            <p className="text-sm text-slate-300 ml-4 mt-1">{desc || 'No description available.'}</p>
        </div>
    );
};

const ActorDetail: React.FC<ActorDetailProps> = ({ actor, onBack }) => {
    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-900"
                >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to List
                </button>

                <div className="bg-slate-800/50 shadow-xl rounded-lg overflow-hidden backdrop-blur-sm border border-slate-700">
                    <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900">
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{actor.name}</h1>
                        <p className="mt-1 text-lg text-slate-400">{actor.stat}</p>
                    </div>
                    
                    <div className="px-6 py-5 space-y-3">
                       <h3 className="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2 mb-3">Actor Details</h3>
                        <DetailRow label="Star" value={'★'.repeat(parseInt(actor.star, 10))} colorClass="text-yellow-400" />
                        <DetailRow label="Sex" value={actor.sex} />
                        <DetailRow label="Nationality" value={actor.nat} />
                        <DetailRow label="Character" value={`${actor.char1 || ''} / ${actor.char2 || ''}`} />
                        <DetailRow label="Stat" value={actor.stat1} />
                        <DetailRow label="Partner" value={actor.fair_total} />
                        <DetailRow label="Scenes" value={actor.scenes} />
                        <DetailRow label="Tags" value={actor.tags} />
                    </div>

                    <div className="px-6 py-5 space-y-3">
                         <h3 className="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2 mb-3">Skills</h3>
                         <SkillRow num={1} skill={actor.skill1} desc={actor.skill1_desc} />
                         <SkillRow num={2} skill={actor.skill2} desc={actor.skill2_desc} />
                         <SkillRow num={3} skill={actor.skill3} desc={actor.skill3_desc} />
                         <SkillRow num={4} skill={actor.skill4} desc={actor.skill4_desc} />
                         <SkillRow num={5} skill={actor.skill5} desc={actor.skill5_desc} />
                         <SkillRow num={6} skill={actor.skill6} desc={actor.skill6_desc} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActorDetail;
