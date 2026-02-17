# Website Paróquia São Pedro Apóstolo - Mauá

![GitHub License](https://img.shields.io/badge/license-ISC-blue.svg)
![Prisma](https://img.shields.io/badge/ORM-Prisma-4B4B4B.svg?style=flat&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-316192.svg?style=flat&logo=postgresql)
![Fastify](https://img.shields.io/badge/Framework-Fastify-000000.svg?style=flat&logo=fastify)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-007ACC.svg?style=flat&logo=typescript)
![pnpm](https://img.shields.io/badge/Package_Manager-pnpm-F69220.svg?style=flat&logo=pnpm)

## 🚀 Propósito do Projeto

Um sistema web robusto e intuitivo para **centralizar processos administrativos e pastorais** da Paróquia São Pedro Apóstolo Mauá. O objetivo principal é otimizar a gestão, reduzindo significativamente controles manuais, aprimorando a organização das informações e facilitando o acesso a serviços essenciais tanto para fiéis quanto para a equipe administrativa. Priorizamos a **simplicidade operacional, baixo atrito de uso e uma arquitetura escalável** para futuras expansões e integrações.

## ✨ Principais Funcionalidades

O sistema é focado nos fluxos mais críticos e de maior impacto para a rotina da igreja.

### 1. 🤝 Doações Online

- **Facilidade:** Permite que fiéis realizem doações de forma segura e conveniente diretamente pelo site.
- **Transparência:** Registro detalhado de todas as transações, com acompanhamento de status.
- **Gestão:** Histórico financeiro básico disponível para a administração da igreja.

### 2. 💍 Agendamento de Casamentos

- **Simplificação:** Casais podem iniciar e gerenciar o processo de solicitação da cerimônia online.
- **Organização:** Envio de dados pessoais e documentos obrigatórios para análise da secretaria.
- **Acompanhamento:** Fluxo claro de validação, aprovação e acompanhamento do status da solicitação.

### 3. 📚 Catequese

- **Organização:** Ferramentas para organizar turmas de catequese, vincular catequizandos e gerenciar informações.
- **Informação:** Consulta de horários, locais e responsáveis.
- **Engajamento:** Disponibilização de informações de acompanhamento para os participantes.

### 4. ⚙️ Painel Administrativo

- **Controle Centralizado:** Área restrita para a equipe administrativa gerenciar todos os aspectos do sistema.
- **Gestão de Usuários:** Controle de acesso e permissões.
- **Monitoramento:** Acompanhamento de solicitações, organização de turmas e visualização de registros importantes.

## 🛠️ Tecnologias Utilizadas

### Backend

Este projeto é construído com as seguintes tecnologias principais no backend:

- **Node.js**: Ambiente de execução JavaScript.
- **Fastify**: Framework web rápido e de baixo overhead.
- **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript.
- **Prisma ORM**: Moderno ORM para Node.js e TypeScript, facilitando a interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional robusto e de código aberto.
- **Docker & Docker Compose**: Para gerenciamento e orquestração de serviços de desenvolvimento.
- **pnpm**: Gerenciador de pacotes rápido e eficiente.

## 🚀 Como Começar

Para configurar e executar o projeto em sua máquina local, siga o guia detalhado em:

[**docs/setup-guide.md**](backend/docs/setup-guide.md)

### Sumário Rápido:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd website/backend
    ```
2.  **Configure as variáveis de ambiente:** Copie `.env.example` para `.env` e preencha as informações necessárias.
3.  **Instale as dependências:**
    ```bash
    pnpm install
    ```
4.  **Inicie o banco de dados com Docker Compose:**
    ```bash
    docker compose up -d database
    ```
5.  **Aplique as migrações do Prisma:**
    ```bash
    pnpm prisma migrate dev
    ```
6.  **Gere o cliente Prisma:**
    ```bash
    pnpm prisma generate
    ```
7.  **Inicie o servidor de desenvolvimento:**
    ```bash
    pnpm run dev
    ```

## 📦 Build para Produção

Para compilar a aplicação para o ambiente de produção:

```bash
pnpm run build
```

O código compilado estará disponível na pasta `dist/`.
