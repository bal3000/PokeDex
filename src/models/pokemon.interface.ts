import { PokemonType } from './pokemon-type.interface';
import { Sprites } from './sprites.interface';
import { Species } from './species.interface';
import { Stat } from './stat.interface';
import { Move } from './move.interface';
import { Ability } from './ability.interface';

export interface Pokemon {
  id: number;
  name: string;
  isDefault: boolean;
  order: number;
  weight: number;
  height: number;
  baseExperience: number;
  types: PokemonType[];
  sprites: Sprites;
  species: Species;
  stats: Stat[];
  abilities: Ability[];
  moves: Move[];
}
