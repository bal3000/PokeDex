import { LinkingResource } from './linking-resource.interface';

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: LinkingResource;
  egg_groups: LinkingResource[];
  evolution_chain: Evolutionchain;
  evolves_from_species: LinkingResource;
  flavor_text_entries: Flavortextentry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: LinkingResource;
  growth_rate: LinkingResource;
  habitat: LinkingResource;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: Palparkencounter[];
  pokedex_numbers: Pokedexnumber[];
  shape: LinkingResource;
  varieties: Variety[];
}

interface Variety {
  is_default: boolean;
  pokemon: LinkingResource;
}

interface Pokedexnumber {
  entry_number: number;
  pokedex: LinkingResource;
}

interface Palparkencounter {
  area: LinkingResource;
  base_score: number;
  rate: number;
}

interface Name {
  language: LinkingResource;
  name: string;
}

interface Genus {
  genus: string;
  language: LinkingResource;
}

interface Flavortextentry {
  flavor_text: string;
  language: LinkingResource;
  version: LinkingResource;
}

interface Evolutionchain {
  url: string;
}
