import { User } from './user';

export interface Place {
    id: number;
    name: string;
    location: string;
    description: string;
    authorComment: string;
    author: User;
    createdAt: string;
    updatedAt: string;
}
