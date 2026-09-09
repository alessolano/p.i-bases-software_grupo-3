<script setup lang="ts">
import { computed, ref } from 'vue'

import hpImage from '@/assets/images/movies/hp.jpg'
import lotrImage from '@/assets/images/movies/lotr.jpg'
import scarfaceImage from '@/assets/images/movies/scarface.jpg'

interface Movie {
  id: number
  title: string
  image: string
}

const search = ref('')

const movies: Movie[] = [
  {
    id: 1,
    title: 'Harry Potter: Las Reliquias de la Muerte',
    image: hpImage,
  },
  {
    id: 2,
    title: 'El Señor de los Anillos: El Retorno del Rey',
    image: lotrImage,
  },
  {
    id: 3,
    title: 'Scarface',
    image: scarfaceImage,
  },
]

const filteredMovies = computed(() => {
  const normalizedSearch = search.value
    .trim()
    .toLocaleLowerCase()

  if (!normalizedSearch) {
    return movies
  }

  return movies.filter((movie) =>
    movie.title.toLocaleLowerCase().includes(normalizedSearch),
  )
})
</script>

<template>
  <section class="movie-catalog">
    <div class="search-container">
      <label
        for="movie-search"
        class="visually-hidden"
      >
        Buscar película
      </label>

      <input
        id="movie-search"
        v-model="search"
        type="search"
        placeholder="Busca tu película favorita..."
      />

      <i
        class="bi bi-search"
        aria-hidden="true"
      ></i>
    </div>

    <div
      v-if="filteredMovies.length"
      class="movie-grid"
    >
      <article
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="movie-card"
      >
        <img
          :src="movie.image"
          :alt="movie.title"
          class="movie-poster"
        />

        <h3>
          {{ movie.title }}
        </h3>
      </article>
    </div>

    <p
      v-else
      class="empty-message"
    >
      No encontramos películas que coincidan con tu búsqueda.
    </p>
  </section>
</template>

<style scoped>
.movie-catalog {
  margin-top: 32px;
}

.search-container {
  position: relative;

  width: min(100%, 900px);

  margin: 0 auto 28px;
}

.search-container input {
  width: 100%;

  padding: 12px 46px 12px 20px;

  border: 1px solid transparent;
  border-radius: 999px;

  background-color: #e5e5e5;

  outline: none;

  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.search-container input:focus {
  border-color: var(--color-secondary);

  box-shadow: 0 0 0 3px rgba(115, 47, 59, 0.15);
}

.search-container i {
  position: absolute;

  top: 50%;
  right: 18px;

  font-size: 1.2rem;

  transform: translateY(-50%);
}

.movie-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(170px, 1fr));

  gap: 28px 24px;
}

.movie-card {
  overflow: hidden;

  border-radius: var(--radius-medium);

  background-color: var(--color-white);

  transition:
    transform var(--transition-normal),
    box-shadow var(--transition-normal);
}

.movie-card:hover {
  transform: translateY(-4px);

  box-shadow: 0 10px 24px rgba(13, 13, 13, 0.15);
}

.movie-poster {
  display: block;

  width: 100%;
  aspect-ratio: 2 / 3;

  object-fit: cover;
}

.movie-card h3 {
  margin: 12px;

  font-size: 1rem;
  font-weight: 500;

  text-align: center;
}

.empty-message {
  margin: 48px 0;

  color: var(--color-gray);

  text-align: center;
}
</style>