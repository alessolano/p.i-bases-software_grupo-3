<script setup lang="ts">
import logo from '@/assets/logos/cinetadel-logo.png'
</script>

<template>
  <header class="site-header">
    <nav class="landing-container navbar-content">
      <RouterLink
        to="/"
        class="brand"
        aria-label="Ir a la página principal de Cinetadel"
      >
        <img
          :src="logo"
          alt="Cinetadel"
          class="brand-logo"
        />
      </RouterLink>

      <div class="navbar-actions">
        <button
          type="button"
          class="btn login-button"
        >
          Iniciar sesión
        </button>

        <button
          type="button"
          class="btn register-button"
        >
          Registrarse
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  width: 100%;
  background-color: var(--color-light_gray);
}

.navbar-content {
  min-height: 72px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
}

.brand-logo {
  width: 54px;
  height: 54px;

  object-fit: contain;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.login-button {
  color: var(--color-white);
  background-color: var(--color-medium_gray);
  border-color: var(--color-dark);
}

.login-button:hover {
  color: var(--color-white);
  background-color: var(--color-dark);
}

.register-button {
  color: var(--color-white);
  background-color: var(--color-primary);
}

.register-button:hover {
  color: var(--color-white);
  background-color: var(--color-secondary);
}

@media (max-width: 576px) {
  .navbar-content {
    min-height: 64px;
  }

  .brand-logo {
    width: 44px;
    height: 44px;
  }

  .navbar-actions {
    gap: 6px;
  }

  .navbar-actions .btn {
    padding: 6px 9px;
    font-size: 0.8rem;
  }
}
</style>