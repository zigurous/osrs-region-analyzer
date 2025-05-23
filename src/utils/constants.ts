// Skills are ordered the same way as they appear in the game.
export const skills = [
  'attack',
  'strength',
  'defence',
  'ranged',
  'prayer',
  'magic',
  'runecraft',
  'construction',
  'hitpoints',
  'agility',
  'herblore',
  'thieving',
  'crafting',
  'fletching',
  'slayer',
  'hunter',
  'mining',
  'smithing',
  'fishing',
  'cooking',
  'firemaking',
  'woodcutting',
  'farming',
] as const;

// Combat skills contribute to combat level. Slayer is not included here as it
// does not increase combat level despite revolving entirely around combat.
export const combatSkills = [
  'attack',
  'strength',
  'defence',
  'ranged',
  'prayer',
  'magic',
  'hitpoints',
] as const;

// Non-combat skills do not contribute to combat level but sometimes are still
// used in combat activities (e.g. skilling bosses).
export const nonCombatSkills = [
  'runecraft',
  'construction',
  'agility',
  'herblore',
  'thieving',
  'crafting',
  'fletching',
  'slayer',
  'hunter',
  'mining',
  'smithing',
  'fishing',
  'cooking',
  'firemaking',
  'woodcutting',
  'farming',
] as const;

export const skillingFilters = [
  'prayer',
  'magic',
  'runecraft',
  'construction',
  'agility',
  'herblore',
  'thieving',
  'crafting',
  'fletching',
  'slayer',
  'hunter',
  'mining',
  'smithing',
  'fishing',
  'cooking',
  'firemaking',
  'woodcutting',
  'farming',
] as const;

export const activityCategories = [
  'agility',
  'chest',
  'construction',
  'cooking',
  'crafting',
  'diaries',
  'dungeon',
  'farming',
  'firemaking',
  'fishing',
  'fletching',
  'herblore',
  'hunter',
  'location',
  'magic',
  'melee',
  'mining',
  'misc',
  'music',
  'npc',
  'prayer',
  'pvm',
  'pvp',
  'quest',
  'ranged',
  'runecraft',
  'skilling',
  'slayer',
  'smithing',
  'spell',
  'spellbook',
  'thieving',
  'woodcutting',
] as const;

export const iconOrder = [
  // combat
  'Raids',
  'Master_Reanimation',
  'Monster_Examine',
  'Combat_icon',
  'Skull_(status)_icon',
  'Hitpoints_icon',
  'Attack_icon',
  'Strength_icon',
  'Defence_icon',
  'Ranged_icon',
  'Prayer_icon',
  'Magic_icon',
  'Standard_spellbook',
  'Ancient_spellbook',
  'Arceuus_spellbook',
  'Lunar_spellbook',
  // skilling
  'Runecraft_icon',
  'Construction_icon',
  'Agility_icon',
  'Herblore_icon',
  'Thieving_icon',
  'Crafting_icon',
  'Fletching_icon',
  'Slayer_icon',
  'Hunter_icon',
  'Mining_icon',
  'Smithing_icon',
  'Fishing_icon',
  'Cooking_icon',
  'Firemaking_icon',
  'Woodcutting_icon',
  'Farming_icon',
  // other
  'Flax',
  'Crystal_key',
  'Minigame_icon',
  'Quest_point_icon',
  'Achievement_Diaries_icon',
  'Distractions_and_Diversions',
  'Music',
  'Stats_icon',
  'Collection_log',
  'Map_link_icon',
  'Dungeon_map_link_icon',
  'Anvil_icon',
  'Furnace_icon',
  'Cooking_range_icon',
];
