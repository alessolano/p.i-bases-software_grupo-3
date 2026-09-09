<script setup lang="ts">
import { computed, ref } from 'vue'

import hpImage from '@/assets/images/movies/hp.jpg'
import lotrImage from '@/assets/images/movies/lotr.jpg'
import scarfaceImage from '@/assets/images/movies/scarface.jpg'

interface CarouselSlide {
  image: string
  alt: string
  title: string
  description: string
}

const slides: CarouselSlide[] = [
  {
    image: hpImage,
    alt: 'Harry Potter: Las Reliquias de la Muerte',
    title: 'Harry Potter: Las Reliquias de la Muerte',
    description: 'Disponible próximamente en Cinetadel',
  },
  {
    image: lotrImage,
    alt: 'El Señor de los Anillos: El Retorno del Rey',
    title: 'El Señor de los Anillos: El Retorno del Rey',
    description: 'Ya disponible en cartelera',
  },
  {
    image: scarfaceImage,
    alt: 'Scarface',
    title: 'Scarface',
    description: 'Una experiencia que debes vivir en pantalla grande',
  },
]

const currentIndex = ref(0)

const currentSlide = computed(() => slides[currentIndex.value])

function nextSlide(): void {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

function previousSlide(): void {
  currentIndex.value =
    (currentIndex.value - 1 + slides.length) % slides.length
}

function selectSlide(index: number): void {
  currentIndex.value = index
}
</script>

<template>
  <section
    class="hero-carousel"
    aria-label="Películas destacadas"
  >
    <img
      :src="currentSlide.image"
      :alt="currentSlide.alt"
      class="hero-image"
    />

    <div class="hero-overlay"></div>

    <div class="hero-content">
      <h1>
        {{ currentSlide.title }}
      </h1>

      <p>
        {{ currentSlide.description }}
      </p>

      <button
        type="button"
        class="purchase-button"
      >
        Comprar boletos
      </button>
    </div>

    <button
      type="button"
      class="carousel-control carousel-control-left"
      aria-label="Película anterior"
      @click="previousSlide"
    >
      <i
        class="bi bi-chevron-left"
        aria-hidden="true"
      ></i>
    </button>

    <button
      type="button"
      class="carousel-control carousel-control-right"
      aria-label="Siguiente película"
      @click="nextSlide"
    >
      <i
        class="bi bi-chevron-right"
        aria-hidden="true"
      ></i>
    </button>

    <div class="carousel-indicators">
      <button
        v-for="(_, index) in slides"
        :key="index"
        type="button"
        class="indicator"
        :class="{ active: index === currentIndex }"
        :aria-label="`Mostrar película ${index + 1}`"
        @click="selectSlide(index)"
      ></button>
    </div>
  </section>
</template>

<style scoped>
.hero-carousel {
  position: relative;

  width: 100%;
  overflow: hidden;

  border-radius: var(--radius-large);

  background-color: var(--color-dark);
}

.hero-image {
  display: block;

  width: 100%;
  height: clamp(300px, 45vw, 540px);

  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(
    90deg,
    rgba(13, 13, 13, 0.85) 0%,
    rgba(13, 13, 13, 0.3) 60%,
    transparent 100%
  );
}

.hero-content {
  position: absolute;

  left: clamp(24px, 6vw, 72px);
  bottom: clamp(38px, 7vw, 72px);

  max-width: 620px;

  color: var(--color-white);
}

.hero-content h1 {
  margin-bottom: 12px;

  font-size: clamp(1.6rem, 4vw, 3rem);
  font-weight: 700;
}

.hero-content p {
  margin-bottom: 20px;

  font-size: clamp(0.95rem, 2vw, 1.15rem);
}

.purchase-button {
  padding: 10px 20px;

  color: var(--color-white);

  border: 0;
  border-radius: var(--radius-small);

  background-color: var(--color-primary);

  transition: background-color var(--transition-fast);
}

.purchase-button:hover {
  background-color: var(--color-secondary);
}

.carousel-control {
  position: absolute;
  top: 50%;

  display: grid;
  place-items: center;

  width: 44px;
  height: 44px;

  border: 0;
  border-radius: 50%;

  color: var(--color-white);

  background-color: rgba(13, 13, 13, 0.65);

  transform: translateY(-50%);
}

.carousel-control-left {
  left: 16px;
}

.carousel-control-right {
  right: 16px;
}

.carousel-indicators {
  position: absolute;

  left: 50%;
  bottom: 16px;

  display: flex;
  gap: 8px;

  transform: translateX(-50%);
}

.indicator {
  width: 10px;
  height: 10px;

  padding: 0;

  border: 1px solid var(--color-white);
  border-radius: 50%;

  background: transparent;
}

.indicator.active {
  background-color: var(--color-primary);
}
</style>