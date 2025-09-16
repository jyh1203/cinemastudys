import type { Actor } from '../types';

export const processActorData = async () => {
    const [actorResponse, scenesAndTagsResponse] = await Promise.all([
        fetch('/data/actors.json'),
        fetch('/data/scenesAndTags.json')
    ]);

    if (!actorResponse.ok || !scenesAndTagsResponse.ok) {
        throw new Error('Failed to fetch actor data');
    }

    const actorData = await actorResponse.json();
    const scenesAndTagsData = await scenesAndTagsResponse.json();

    // Type assertion for fetched JSON
    const typedActorData: { actors: Actor[] } = actorData;
    const typedScenesAndTagsData: {
        actorscenes: Record<string, string[]>;
        actorstags: Record<string, string[]>;
    } = scenesAndTagsData;

    const scenesMap = typedScenesAndTagsData.actorscenes;
    const tagsMap = typedScenesAndTagsData.actorstags;

    const processedActors: Actor[] = typedActorData.actors.map(actor => ({
        ...actor,
        scenes: scenesMap[actor.name] || [],
        tags: tagsMap[actor.name] || [],
    }));
    
    const allScenes = new Set<string>();
    const allTags = new Set<string>();

    processedActors.forEach(actor => {
        actor.scenes?.forEach(scene => allScenes.add(scene));
        actor.tags?.forEach(tag => allTags.add(tag));
    });

    const uniqueScenes = Array.from(allScenes).sort();
    const uniqueTags = Array.from(allTags).sort();

    return { processedActors, uniqueScenes, uniqueTags };
};
