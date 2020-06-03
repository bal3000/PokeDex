import { LinkingResource } from './linking-resource.interface';

export interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: LinkingResource[];
}
