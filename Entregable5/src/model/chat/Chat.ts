import { Message } from "./Message";
import { RecommendedUser } from "../RecommendedUser";
import ramon from '../../assets/ramon.jpeg';
import diego from '../../assets/diego.jpeg';
import paula from '../../assets/paula.jpeg';
import patitas from '../../assets/patitas.jpeg';
import robert from '../../assets/robert.jpeg';
import enrique from '../../assets/enrique.jpg';
import sabrina from '../../assets/sabrina.jpg';
import drperez from '../../assets/drperez.jpg';
export interface Chat {
    user: RecommendedUser;
    messages: Message[];
}

export const DefaultChats: Chat[] = [
    {
        user: {
            name: "Ramon Rodriguez",
            friends: 0,
            img: ramon
        },
        messages: [
            {
                author: false,
                text: "Gracias a vos! Consultame cualquier cosa",
                time: "13:46"
            },
            {
                author: true,
                text: "Listo, un abrazo!",
                time: "14:00"
            },
            {
                author: false,
                text: ":)",
                time: "14:01"
            },
            {
                author: false,
                text: "Hola, como estas? Te consulto por tu publicacion sobre la cruza con un border collie. Tengo un macho de 9 meses",
                time: "17:46"
            },
            {
                author: true,
                text: "Como andas?? Decime si tiene la libreta de vacuncación completa por favor",
                time: "17:55"
            },
            {
                author: true,
                text: "Es raza pura??",
                time: "17:55"
            },
            {
                author: false,
                text: "Si, tiene el plan de vacunación completo, es raza pura, tengo comprobantes del criadero si es necesario que los veas :)",
                time: "18:06"
            },
            {
                author: true,
                text: "Buenisimo, mejor asi, no es necesario te creo jaja, cuando mi perrita esté en celo coordinamos te parece?",
                time: "18:07"
            },
            {
                author: false,
                text: "Me parece genial, vos avisame, estamos hablando",
                time: "18:07"
            },
            {
                author: false,
                text: "Abrazo Ramon, hasta luego!",
                time: "18:16"
            }
        ]
    },
    {
        user: {
            name: "Diego Lopez",
            friends: 0,
            img: diego
        },
        messages: [
            {
                author: true,
                text: "Hola Diego, necesito que me digas que pipeta usas para tus perros, nunca les vi una",
                time: "20:06"
            }
        ]
    },
    {
        user: {
            name: "Paula Gomez",
            friends: 0,
            img: paula
        },
        messages: [
            {
                author: true,
                text: "Al final vamos a ir a pasear a los perros?",
                time: "19:06"
            },
            {
                author: false,
                text: "Si no hace frio si, ando media resfriada",
                time: "19:46"
            },
            {
                author: true,
                text: "Bueno dale! Igual un poco de abrigo y listo",
                time: "20:05"
            },
            {
                author: false,
                text: "Jajajaja sii",
                time: "20:06"
            }
        ]
    },
    {
        user: {
            name: "Veterinaria Patitas Felices",
            friends: 0,
            img: patitas
        },
        messages: [
            {
                author: false,
                text: "Hola, te recordamos que el turno es a las 18, que el animalito haya hecho sus necesidades antes de venir por favor :)",
                time: "16:55"
            },
            {
                author: false,
                text: "La direccion es Roca 234!",
                time: "16:55"
            },
            {
                author: false,
                text: "Toca timbre, vamos a estar en el consultorio de atras",
                time: "16:56"
            },
            {
                author: true,
                text: "A eso de las 18 paso, gracias!",
                time: "17:06"
            }
        ]
    },
    {
        user: {
            name: "Roberto Moauro",
            friends: 0,
            img: robert
        },
        messages: [
            {
                author: true,
                text: "Roberto tenes idea acerca de si ya puedo castrar a mi perro?",
                time: "13:32"
            },
            {
                author: false,
                text: "No, no sabria decirte, escribile a la veterinaria patitas felices",
                time: "14:00"
            }
        ]
    },
    {
        user: {
            name: "Enrique Nuñez",
            friends: 0,
            img: enrique
        },
        messages: [
            {
                author: true,
                text: "Hola Enrique, podrás compartir mi publicación? El gatito debe encontrar su hogar",
                time: "12:32"
            },
            {
                author: false,
                text: "Si Juan, ahora la comparto, ojala tenga suerte, deben extrañarlo",
                time: "12:35"
            }
        ]
    },
    {
        user: {
            name: "Sabrina Morales",
            friends: 0,
            img: sabrina
        },
        messages: [
            {
                author: false,
                text: "Hola Juan, creo que la gatita es de mi barrio, ahora comparto la publicación",
                time: "11:32"
            },
            {
                author: true,
                text: "Gracias Sabrina, ojalá encuentre a su dueño :(",
                time: "11:44"
            }
        ]
    },
    {
        user: {
            name: "Doctor Perez",
            friends: 0,
            img: drperez
        },
        messages: [
            {
                author: true,
                text: "Buen día doctor Perez, a que hora abre su consultorio?",
                time: "09:32"
            },
            {
                author: false,
                text: "Buen dia, estamos abiertos de lunes a sabados de 8 a 18hs!",
                time: "10:00"
            }
        ]
    }
];