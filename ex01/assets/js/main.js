class PaginadorPessoas {
  constructor() {
    this.pessoas = [];
    this.paginaAtual = 1;
    this.itensPorPagina = 12;
    this.init();
  }

  async init() {
    try {
      const response = await fetch('pessoas.json');
      this.pessoas = await response.json();
      this.setupEventListeners();
      this.renderizarEstatisticas();
      this.renderizar();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      this.mostrarErro();
    }
  }

  setupEventListeners() {
    document.getElementById('prev-btn').addEventListener('click', () => {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
        this.renderizar();
      }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
      if (this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++;
        this.renderizar();
      }
    });
  }

  get totalPaginas() {
    return Math.ceil(this.pessoas.length / this.itensPorPagina);
  }

  get pessoasPaginaAtual() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.pessoas.slice(inicio, fim);
  }

  criarCardPessoa(pessoa) {
    const iniciais = pessoa.nome.split(' ').map(n => n[0]).join('').substring(0, 2);

    return `
      <div class="person-card">
        <div class="person-header">
          <div class="person-avatar">${iniciais}</div>
          <div>
            <div class="person-name">${pessoa.nome}</div>
            <div class="person-email">${pessoa.email}</div>
          </div>
        </div>
        <div class="person-details">
          <div class="detail-item">
            <span class="detail-label">Idade</span>
            <span class="detail-value">${pessoa.idade} anos</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Estado</span>
            <span class="detail-value">${pessoa.estado}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Empresa</span>
            <span class="detail-value">${pessoa.empresa}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Salário</span>
            <span class="detail-value salary">R$ ${pessoa.salario.toLocaleString('pt-BR')}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">CPF</span>
            <span class="detail-value">${pessoa.cpf}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Sexo</span>
            <span class="detail-value">${pessoa.sexo || 'Não informado'}</span>
          </div>
        </div>
      </div>
    `;
  }

  atualizarControles() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');
    const infoText = document.getElementById('info-text');

    prevBtn.disabled = this.paginaAtual === 1;
    nextBtn.disabled = this.paginaAtual === this.totalPaginas;

    pageInfo.textContent = `Página ${this.paginaAtual} de ${this.totalPaginas}`;

    const inicio = (this.paginaAtual - 1) * this.itensPorPagina + 1;
    const fim = Math.min(this.paginaAtual * this.itensPorPagina, this.pessoas.length);
    infoText.textContent = `Mostrando ${inicio}-${fim} de ${this.pessoas.length} pessoas`;
  }

  renderizar() {
    const resultado = document.getElementById('resultado');
    const pessoasAtual = this.pessoasPaginaAtual;

    resultado.innerHTML = pessoasAtual.map(pessoa => this.criarCardPessoa(pessoa)).join('');
    this.atualizarControles();
  }

  calcularEstatisticas() {
    const totalPessoas = this.pessoas.length;

    const estadosCount = {};
    let somaIdades = 0;
    let somaSalarios = 0;

    this.pessoas.forEach(pessoa => {
      estadosCount[pessoa.estado] = (estadosCount[pessoa.estado] || 0) + 1;
      somaIdades += pessoa.idade;
      somaSalarios += pessoa.salario;
    });

    const estadoMaisComum = Object.keys(estadosCount).reduce((a, b) =>
      estadosCount[a] > estadosCount[b] ? a : b
    );

    const idadeMedia = Math.round(somaIdades / totalPessoas);
    const salarioMedio = Math.round(somaSalarios / totalPessoas);

    return {
      total: totalPessoas,
      estadoMaisComum: `${estadoMaisComum} (${estadosCount[estadoMaisComum]})`,
      idadeMedia: `${idadeMedia} anos`,
      salarioMedio: `R$ ${salarioMedio.toLocaleString('pt-BR')}`
    };
  }

  renderizarEstatisticas() {
    const stats = this.calcularEstatisticas();
    const statsGrid = document.getElementById('stats-grid');

    statsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon people">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>Total de Pessoas</h3>
          </div>
        </div>
        <div class="stat-value">${stats.total}</div>
      </div>
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon location">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>Estado Mais Comum</h3>
          </div>
        </div>
        <div class="stat-value">${stats.estadoMaisComum}</div>
      </div>
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon age">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>Idade Média</h3>
          </div>
        </div>
        <div class="stat-value">${stats.idadeMedia}</div>
      </div>
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon salary">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>Salário Médio</h3>
          </div>
        </div>
        <div class="stat-value">${stats.salarioMedio}</div>
      </div>
    `;
  }

  mostrarErro() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '<div class="loading">Erro ao carregar os dados. Tente novamente.</div>';
  }
}

// Inicializar a aplicação
new PaginadorPessoas();
