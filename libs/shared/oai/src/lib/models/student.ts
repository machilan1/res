/* tslint:disable */
/* eslint-disable */
import { Favorite } from '../models/favorite';
export interface Student {
  favorites: Array<Favorite>;
  name: string;
  phone: string;
  studentId: number;
  studentNumber: string;
}
