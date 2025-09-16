import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Actor, StudyAbroadLabel } from './types';
import { processActorData } from './services/dataService';
import { STUDY_ABROAD_LABELS } from './constants';
import FilterPanel from './components/FilterPanel';
import ActorList from './components/ActorList';
import ActorDetail from './components/ActorDetail';

const App: React.FC = () => {
    const [actors, setActors] = useState<Actor[]>([]);
    const [allScenes, setAllScenes] = useState<string[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const [selectedScenes, setSelectedScenes] = useState<Set<string>>(new Set());
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
    const [selectedActor, setSelectedActor] = useState<Actor | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const { processedActors, uniqueScenes, uniqueTags } = await processActorData();
                setActors(processedActors);
                setAllScenes(uniqueScenes);
                setAllTags(uniqueTags);
            } catch (err) {
                console.error("Error loading actor data:", err);
                setError("Failed to load actor data. Please try refreshing the page.");
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const filteredActors = useMemo(() => {
        // If no filters are applied, return all actors sorted by name with a score of 0.
        if (selectedScenes.size === 0 && selectedTags.size === 0) {
            return actors
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(actor => ({ actor, score: 0 }));
        }

        // Calculate a match score for each actor.
        const actorsWithScores = actors.map(actor => {
            const sceneMatches = [...selectedScenes].filter(scene => actor.scenes?.includes(scene)).length;
            const tagMatches = [...selectedTags].filter(tag => actor.tags?.includes(tag)).length;
            const score = sceneMatches + tagMatches;
            return { actor, score };
        });

        // Filter out actors with no matches and sort the rest by score.
        const sortedActors = actorsWithScores
            .filter(item => item.score > 0) // Only show actors that match at least one criterion
            .sort((a, b) => {
                // Sort by score descending
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                // If scores are equal, sort by name ascending
                return a.actor.name.localeCompare(b.actor.name);
            });

        return sortedActors;
    }, [actors, selectedScenes, selectedTags]);

    const handleSceneToggle = useCallback((scene: string) => {
        setSelectedScenes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(scene)) {
                newSet.delete(scene);
            } else {
                newSet.add(scene);
            }
            return newSet;
        });
    }, []);

    const handleTagToggle = useCallback((tag: string) => {
        setSelectedTags(prev => {
            const newSet = new Set(prev);
            if (newSet.has(tag)) {
                newSet.delete(tag);
            } else {
                newSet.add(tag);
            }
            return newSet;
        });
    }, []);
    
    const handleStudyAbroadChange = useCallback((label: StudyAbroadLabel) => {
        setSelectedScenes(new Set(label.scenes));
        setSelectedTags(new Set(label.tags));
    }, []);

    const handleResetFilters = useCallback(() => {
        setSelectedScenes(new Set());
        setSelectedTags(new Set());
    }, []);
    
    const handleSelectActor = useCallback((actor: Actor) => {
        setSelectedActor(actor);
    }, []);

    const handleBackToList = useCallback(() => {
        setSelectedActor(null);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg text-slate-300">Loading Actor Data...</p>
                </div>
            </div>
        );
    }

    if (error) {
         return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center p-8 bg-slate-800 rounded-lg shadow-lg border border-red-500/50">
                    <p className="text-xl text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    if (selectedActor) {
        return <ActorDetail actor={selectedActor} onBack={handleBackToList} />;
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                        Actor Finder
                    </h1>
                    <p className="mt-2 text-lg text-slate-400">Filter actors by scenes and tags to find the perfect match.</p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-3">
                        <FilterPanel
                            allScenes={allScenes}
                            allTags={allTags}
                            selectedScenes={selectedScenes}
                            selectedTags={selectedTags}
                            studyAbroadLabels={STUDY_ABROAD_LABELS}
                            onSceneToggle={handleSceneToggle}
                            onTagToggle={handleTagToggle}
                            onStudyAbroadChange={handleStudyAbroadChange}
                            onReset={handleResetFilters}
                        />
                    </div>
                    <div className="lg:col-span-9">
                        <ActorList actors={filteredActors} onSelectActor={handleSelectActor} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;