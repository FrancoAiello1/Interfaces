import { RecommendedUser } from "./RecommendedUser";
import manuel1 from '../assets/manuel1.webp';
import manuel2 from '../assets/manuel2.jpeg';
import manuel3 from '../assets/manuel3.jpeg';

export interface SearchResult {
    user: RecommendedUser;
    city: string;
}

export const SearchResultExample: SearchResult[] = [
    {
        user: {
            name: "Manuel Turizo",
            friends: 840,
            img: manuel1
        },
        city: "Tandil"
    },
    {
        user: {
            name: "Manuel Mendez",
            friends: 1930,
            img: manuel2
        },
        city: "Bahia Blanca"
    },
    {
        user: {
            name: "Manuel Gonzalez",
            friends: 113,
            img: manuel3
        },
        city: "Mar del plata"
    }
]