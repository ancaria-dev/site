// Every event class in dev.ancaria.coderpack.api.event that a mod can
// subscribe to, as of API 3 (coderpack 0.200.0). Abstract bases and Unknown
// are left out on purpose; the page mentions Unknown under the table.
// `decides` is what a returned Mutation can do, or null for a read-only event.
export type CoveredEvent = {
  name: string
  action: string
  decides: string | null
  description: string
}

export const coveredEvents: CoveredEvent[] = [
  {
    name: 'Gold',
    action: 'Gold about to change',
    decides: 'change delta, veto',
    description: 'Decided as a delta, never a total, so the game keeps its own mirrors in step.',
  },
  {
    name: 'Experience',
    action: 'Experience about to be granted',
    decides: 'change total, veto',
    description: 'The decision is the new total, and the game clamps it itself.',
  },
  {
    name: 'Damage',
    action: 'Hero about to take damage or be healed',
    decides: 'change HP, veto',
    description: 'The value is the HP about to be committed, clamped to the hero’s maximum.',
  },
  {
    name: 'Skill',
    action: 'Skill value about to change',
    decides: 'change value, veto',
    description: 'Slots are reported by index, since the skill set differs per character.',
  },
  {
    name: 'Attribute',
    action: 'Attribute point spent',
    decides: 'change value, veto',
    description: 'Written straight after the game’s own grant, before anything reads it.',
  },
  {
    name: 'CombatArt',
    action: 'Rune invested in a combat art',
    decides: 'change level, veto',
    description: 'The decision is the art’s new base level. A veto still spends the rune.',
  },
  {
    name: 'Pickup',
    action: 'Item about to be picked up',
    decides: 'veto, replace, retype, reshape',
    description: 'Swap which object is picked up, or edit the one that is.',
  },
  {
    name: 'Console',
    action: 'Line typed into the console',
    decides: 'veto (claim as a command)',
    description: 'A veto claims the line as the mod’s command, and the game never sees it.',
  },
  {
    name: 'Hero',
    action: 'Hero found in a world',
    decides: null,
    description: 'Once per world load and on a character switch: class, level, HP, gold.',
  },
  {
    name: 'World',
    action: 'Session phase changed',
    decides: null,
    description: 'Attached, loaded, and the moment the hero pointer stops being valid.',
  },
  {
    name: 'Save',
    action: 'Save file written',
    decides: null,
    description: 'The moment to store per-save mod data next to the save, keyed by slot.',
  },
  {
    name: 'Load',
    action: 'Save file read',
    decides: null,
    description: 'Arrives twice per load, as it starts and as it ends.',
  },
  {
    name: 'Position',
    action: 'Hero moved',
    decides: null,
    description: 'Fires only when the HUD coordinates change, in world and HUD units.',
  },
  {
    name: 'LevelUp',
    action: 'Hero level changed',
    decides: null,
    description: 'Read-only: the level drives the grant tables and a mirrored anti-cheat field.',
  },
  {
    name: 'Death',
    action: 'Hero HP reached zero',
    decides: null,
    description: 'Already happened, with the HP before and the size of the blow.',
  },
  {
    name: 'NearDeath',
    action: 'Hero fell to 15% HP or below',
    decides: null,
    description: 'Fires once on the way down, having been above the threshold.',
  },
  {
    name: 'HealthChanged',
    action: 'Hero HP written',
    decides: null,
    description: 'What the game stored after Damage, plus the writes nobody can decide.',
  },
  {
    name: 'MaxHealthChanged',
    action: 'Maximum HP recomputed',
    decides: null,
    description: 'Once per recalculation after gear, a level or an attribute changed.',
  },
  {
    name: 'GoldChanged',
    action: 'Gold total moved',
    decides: null,
    description: 'The total after any change, read a moment after the write.',
  },
  {
    name: 'ExperienceChanged',
    action: 'Experience stored',
    decides: null,
    description: 'The total the game actually kept, after its own clamp.',
  },
  {
    name: 'SkillChanged',
    action: 'Skill slot holds a new value',
    decides: null,
    description: 'What a Skill decision came to.',
  },
  {
    name: 'AttributeChanged',
    action: 'Attribute holds a new value',
    decides: null,
    description: 'What an Attribute decision came to.',
  },
  {
    name: 'CombatArtChanged',
    action: 'Combat art holds a new level',
    decides: null,
    description: 'What a CombatArt decision came to.',
  },
  {
    name: 'SkillPointsChanged',
    action: 'Unspent skill points changed',
    decides: null,
    description: 'Spent on a skill or granted by a level-up.',
  },
  {
    name: 'AttributePointsChanged',
    action: 'Unspent attribute points changed',
    decides: null,
    description: 'Spent on an attribute or granted by a level-up.',
  },
  {
    name: 'Region',
    action: 'Hero crossed a region',
    decides: null,
    description: 'The game’s own map cell, entered or left. Ids only, no names.',
  },
  {
    name: 'Sector',
    action: 'Hero entered a sector',
    decides: null,
    description: 'The coarse grid the world streams in, once per crossing.',
  },
  {
    name: 'Spawn',
    action: 'Creature entered the world',
    decides: null,
    description: 'A monster spawned or an NPC streamed in. Silent while a world loads.',
  },
  {
    name: 'Despawn',
    action: 'Creature left the world',
    decides: null,
    description: 'A corpse cleared or a sector streamed out. Not a death.',
  },
  {
    name: 'MobHit',
    action: 'Creature took a hit',
    decides: null,
    description: 'Any creature but the hero, with its HP before and after.',
  },
  {
    name: 'MobDeath',
    action: 'Creature died',
    decides: null,
    description: 'Any creature but the hero whose HP reached zero, whoever dealt the blow.',
  },
  {
    name: 'Kill',
    action: 'Journal counted a defeated opponent',
    decides: null,
    description: 'The game’s own notion of a kill that counts, from the Statistics page.',
  },
  {
    name: 'Resurrection',
    action: 'Hero brought back after dying',
    decides: null,
    description: 'The game confirms the death and counts it in the journal.',
  },
  {
    name: 'Discovery',
    action: 'New area discovered',
    decides: null,
    description: 'The “World Discovered” count went up. Which area isn’t known.',
  },
  {
    name: 'Quest',
    action: 'Quest started or ended',
    decides: null,
    description: 'Identified by the number Sacred’s quest files use, without a title.',
  },
  {
    name: 'Loot',
    action: 'Creature dropped loot or chest opened',
    decides: null,
    description: 'Every item is already a world object a mod can retype or reshape.',
  },
  {
    name: 'Drink',
    action: 'Potion drunk',
    decides: null,
    description: 'By the hero or by another creature.',
  },
  {
    name: 'Trade',
    action: 'Bought from or sold to a merchant',
    decides: null,
    description: 'The payment follows as a Gold event, where the amount can be decided.',
  },
  {
    name: 'Moved',
    action: 'Item dragged between slots',
    decides: null,
    description: 'Grid indices only: a bag was rearranged, without saying what by.',
  },
  {
    name: 'Equip',
    action: 'Equipment slot changed',
    decides: null,
    description: 'Equipping and unequipping both arrive here.',
  },
  {
    name: 'Stored',
    action: 'Item went into an inventory',
    decides: null,
    description: 'Into the hero’s or another creature’s inventory.',
  },
]
