import { mockMovies } from '@/mocks/movies.mock'
import type { Movie } from '@/types/movie'

export async function getMovies(): Promise<Movie[]> {
  return [...mockMovies]
}