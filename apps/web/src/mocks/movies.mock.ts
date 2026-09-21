import type { Movie } from '@/types/movie'

import hpImage from '@/assets/images/movies/hp.jpg'
import lotrImage from '@/assets/images/movies/lotr.jpg'
import scarfaceImage from '@/assets/images/movies/scarface.jpg'

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Harry Potter: Las Reliquias de la Muerte',
    posterUrl: hpImage,
  },
  {
    id: 2,
    title: 'El Señor de los Anillos: El Retorno del Rey',
    posterUrl: lotrImage,
  },
  {
    id: 3,
    title: 'Scarface',
    posterUrl: scarfaceImage,
  },
]