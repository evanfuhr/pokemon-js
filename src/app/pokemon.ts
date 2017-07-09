import {Type} from './type';
import {Ability} from './ability';

export class Pokemon {
  abilities?: Ability[];
  flavorText?: string;
  height?: string;
  id: any;
  name?: string;
  types?: Type[];
  weight?: string;
}
