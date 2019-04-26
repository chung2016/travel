import { Profile } from './profile';

export interface Place {
    id: number;
    name: string;
    photo: string;
    location: string;
    type: string;
    description: string;
    authorComment: string;
    author: Profile;
    createdAt: string;
    updatedAt: string;
}
