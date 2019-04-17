import { User } from './user';
import { Place } from './place';

export interface Comment {
    id: number;
    message: string;
    user: User;
    place: Place;
    createdAt: string;
}
