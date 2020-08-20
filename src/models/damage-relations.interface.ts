import { LinkingResource } from './linking-resource.interface';

export interface DamageRelations {
  doubleDamageFrom: LinkingResource[];
  doubleDamageTo: LinkingResource[];
  halfDamageFrom: LinkingResource[];
  halfDamageTo: LinkingResource[];
  noDamageFrom: LinkingResource[];
  noDamageTo: LinkingResource[];
}
