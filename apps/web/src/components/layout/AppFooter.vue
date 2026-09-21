<template>
  <footer class="site-footer">
    <div class="landing-container footer-grid">
      <section>
        <h2>CONTÁCTANOS</h2>

        <p>
          <i class="bi bi-telephone"></i>
          +506 0000 0000
        </p>

        <p>
          <i class="bi bi-envelope"></i>
          contact@cinetadel.com
        </p>

        <p>
          <i class="bi bi-geo-alt"></i>
          San José, San Pedro, Costa Rica
        </p>
      </section>

      <section>
        <h2>CARTELERA</h2>

        <a href="#">Ver cartelera</a>
        <a href="#">Preventas</a>
        <a href="#">Estrenos</a>
      </section>

      <section>
        <h2>SOBRE CINETADEL</h2>

        <a href="#">Términos y condiciones</a>
        <a href="#">Políticas de reembolso</a>
        <a href="#">Aviso de privacidad</a>
      </section>

      <section>
        <h2>EVENTOS</h2>

        <a href="#">Eventos privados</a>
        <a href="#">Eventos corporativos</a>
      </section>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 72px;

  padding: 48px 0;

  color: var(--color-white);

  background-color: var(--color-dark);
}

.footer-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(200px, 1fr));

  gap: 40px;
}

.footer-grid section {
  display: flex;
  flex-direction: column;

  gap: 8px;
}

.footer-grid h2 {
  margin-bottom: 10px;

  font-size: 1rem;
  font-weight: 700;
}

.footer-grid p,
.footer-grid a {
  margin: 0;

  color: #d5d5d5;

  font-size: 0.9rem;
}

.footer-grid a:hover {
  color: var(--color-white);
}

.footer-grid i {
  margin-right: 7px;

  color: var(--color-secondary);
}
</style>