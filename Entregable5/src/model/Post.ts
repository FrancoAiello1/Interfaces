import {Comment} from "./Comment";
import {RecommendedUser} from "./RecommendedUser";
import juan from '../assets/juan.jpeg';
import gato from '../assets/gato.jpg';
import gato2 from '../assets/gato2.png';

export interface Post {
    imgs: string[];
    description: string;
    likes: number;
    dislikes: number;
    comments: Comment[];
    postCreator: RecommendedUser;
    selectedImg: number;
    userHasLiked: boolean;
    userHasDisliked: boolean;
}

export const ExamplePosts: Post[] = [
    {
        imgs: [gato, gato2],
        description: "Aparecio este gatito en casa el otro dia. Es super mimoso, y se lo notaba asustado. Si alguien tiene alguna informacón, puede llamarme a este numero: 2494578095",
        likes: 17,
        dislikes: 0,
        comments: [
            {
                userName: "Miriam Rodriguez",
                text: "Que triste..."
            }
        ],
        postCreator: {
            friends: 0,
            name: "Juan Perez",
            img: juan
        },
        selectedImg: 0,
        userHasLiked: false,
        userHasDisliked: false,
    },
    {
        imgs: [],
        description: "Se busca border collie para cruzar, interesados al md",
        likes: 0,
        dislikes: 0,
        comments: [],
        postCreator: {
            friends: 0,
            name: "Juan Perez",
            img: juan
        },
        selectedImg: 0,
        userHasLiked: false,
        userHasDisliked: false,
    }
]