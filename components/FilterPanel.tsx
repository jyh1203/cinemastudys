
import React, { useState } from 'react';
import type { StudyAbroadLabel } from '../types';

interface FilterPanelProps {
    allScenes: string[];
    allTags: string[];
    selectedScenes: Set<string>;
    selectedTags: Set<string>;
    studyAbroadLabels: StudyAbroadLabel[];
    onSceneToggle: (scene: string) => void;
    onTagToggle: (tag: string) => void;
    onStudyAbroadChange: (label: StudyAbroadLabel) => void;
    onReset: () => void;
}

const FilterSection: React.FC<{
    title: string;
    items: string[];
    selectedItems: Set<string>;
    onToggle: (item: string) => void;
}> = ({ title, items, selectedItems, onToggle }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-2 px-3 bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
                <h3 className="font-semibold text-lg">{title}</h3>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="mt-2 p-3 bg-slate-800 rounded-md max-h-60 overflow-y-auto grid grid-cols-2 gap-2">
                    {items.map(item => (
                        <label key={item} className="flex items-center space-x-2 cursor-pointer text-sm hover:text-cyan-400">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 rounded bg-slate-700 border-slate-600 text-cyan-500 focus:ring-cyan-500"
                                checked={selectedItems.has(item)}
                                onChange={() => onToggle(item)}
                            />
                            <span>{item}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};


const FilterPanel: React.FC<FilterPanelProps> = ({
    allScenes,
    allTags,
    selectedScenes,
    selectedTags,
    studyAbroadLabels,
    onSceneToggle,
    onTagToggle,
    onStudyAbroadChange,
    onReset,
}) => {
    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLabel = studyAbroadLabels.find(label => label.name === e.target.value);
        if (selectedLabel) {
            onStudyAbroadChange(selectedLabel);
        }
    };
    
    return (
        <aside className="sticky top-8 p-4 bg-slate-800/50 rounded-lg shadow-lg backdrop-blur-sm border border-slate-700">
            <div className="mb-4">
                <label htmlFor="study-abroad" className="block text-sm font-medium text-slate-300 mb-2">유학 라벨 (Pre-set)</label>
                <select
                    id="study-abroad"
                    onChange={handleDropdownChange}
                    className="w-full bg-slate-700 border-slate-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500"
                >
                    {studyAbroadLabels.map(label => (
                        <option key={label.name} value={label.name}>
                            {label.name}
                        </option>
                    ))}
                </select>
            </div>

            <FilterSection title="시나리오 (Scenes)" items={allScenes} selectedItems={selectedScenes} onToggle={onSceneToggle} />
            <FilterSection title="특기 (Tags)" items={allTags} selectedItems={selectedTags} onToggle={onTagToggle} />
            
            <button
                onClick={onReset}
                className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-105"
            >
                필터 초기화 (Reset)
            </button>
        </aside>
    );
};

export default FilterPanel;
