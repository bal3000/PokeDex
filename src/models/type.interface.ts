import { LinkingResource } from './linking-resource.interface';
import { PokemonType } from './pokemon-type.interface';
import { DamageRelations } from './damage-relations.interface';

export interface Type {
  pokemon: PokemonType[];
  moves: LinkingResource[];
  damageRelations: DamageRelations;
  id: number;
  moveDamageClass: LinkingResource;
  name: string;
}
