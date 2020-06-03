import { LinkingResource } from './linking-resource.interface';

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: LinkingResource[];
  game_indices: any[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  species: LinkingResource;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Type {
  slot: number;
  type: LinkingResource;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: LinkingResource;
}

export interface Sprites {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
}

export interface Move {
  move: LinkingResource;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: LinkingResource;
  version_group: LinkingResource;
}

export interface HeldItem {
  item: LinkingResource;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: LinkingResource;
}

export interface Ability {
  ability: LinkingResource;
  is_hidden: boolean;
  slot: number;
}
