# Guia de Configuração e Inicialização da Aplicação

Bem-vindo ao guia de configuração e inicialização do seu backend! Siga estes passos para colocar sua aplicação Node.js e banco de dados PostgreSQL em funcionamento.

---

## Sumário

1.  [Configurando Seu Ambiente](#1-configurando-seu-ambiente)
    1.1. [Configuração das Variáveis de Ambiente](#11-configuração-das-variáveis-de-ambiente)
    1.2. [Instalando as Dependências do Projeto](#12-instalando-as-dependências-do-projeto)
    1.3. [Configurando o Banco de Dados (PostgreSQL com Docker)](#13-configurando-o-banco-de-dados-postgresql-com-docker)
2.  [Iniciando a Aplicação](#2-iniciando-a-aplicação)
    2.1. [Iniciando Todos os Serviços](#21-iniciando-todos-os-serviços)
    2.2. [Iniciando o Servidor Backend Node.js](#22-iniciando-o-servidor-backend-nodejs)
3.  [Construindo a Aplicação (Build)](#3-construindo-a-aplicação-build)
4.  [Gerenciamento de Serviços (Comandos Úteis)](#4-gerenciamento-de-serviços-comandos-úteis)

---

## 1. Configurando Seu Ambiente

Antes de iniciar a aplicação, precisamos preparar o ambiente.

### 1.1. Configuração das Variáveis de Ambiente

Sua aplicação precisa de algumas informações importantes, como as credenciais do banco de dados. Elas são armazenadas em um arquivo `.env`.

**Passos:**

1.  Na raiz do projeto, você encontrará um arquivo chamado `.env.example`. Copie-o e renomeie a cópia para `.env`.
2.  Abra o novo arquivo `.env` e preencha as variáveis. Por exemplo:
    ```env
    POSTGRES_DB=paroquia-sao-pedro
    POSTGRES_USER=admin
    POSTGRES_PASSWORD=password
    # Se houver outras variáveis listadas no .env.example, preencha-as aqui.
    ```
    _Este arquivo `.env` é crucial para que sua aplicação se conecte ao banco de dados e funcione corretamente._

### 1.2. Instalando as Dependências do Projeto

Sua aplicação Node.js utiliza diversas bibliotecas. Precisamos instalá-las.

**Como fazer:**
Abra o terminal na raiz do seu projeto e execute o comando:

```bash
pnpm install
```

_Este comando, usando o gerenciador de pacotes `pnpm`, fará o download e instalará todas as dependências necessárias para o backend._

### 1.3. Configurando o Banco de Dados (PostgreSQL com Docker)

O banco de dados é um componente essencial da sua aplicação. Vamos iniciá-lo usando Docker Compose.

**Passos:**

1.  **Inicie o serviço de banco de dados:**
    ```bash
    docker compose up -d database
    ```
    _Este comando usa o `docker-compose.yml` para iniciar o container do PostgreSQL em segundo plano. Certifique-se de ter o Docker instalado e em execução em sua máquina._
2.  **Aplique as migrações do Prisma:**
    Após o banco de dados estar ativo, precisamos preparar seu esquema.
    ```bash
    pnpm prisma migrate dev
    ```
    _Este comando do Prisma criará as tabelas e a estrutura do banco de dados conforme definido em seu esquema._
3.  **Gere o cliente Prisma:**
    Para que sua aplicação possa interagir com o banco de dados, o Prisma precisa gerar seu cliente.
    ```bash
    pnpm prisma generate
    ```
    _Este passo garante que o código da sua aplicação tenha acesso às funções para manipular os dados._

---

## 2. Iniciando a Aplicação

Com o ambiente configurado e o banco de dados pronto, podemos iniciar sua aplicação.

### 2.1. Iniciando Todos os Serviços

Se você não iniciou o banco de dados separadamente, ou quer garantir que tudo esteja rodando, pode usar este comando:

**Como fazer:**

```bash
docker compose up -d
```

_Este comando iniciará todos os serviços definidos no `docker-compose.yml` em segundo plano._

### 2.2. Iniciando o Servidor Backend Node.js

Agora é a hora de iniciar o coração da sua aplicação!

**Como fazer:**

```bash
pnpm run dev
```

_Este comando iniciará o servidor Node.js. Ele também monitorará automaticamente as alterações nos seus arquivos de código-fonte (`tsx watch`) e reiniciará o servidor para que você possa ver suas modificações em tempo real durante o desenvolvimento._

---

## 3. Construindo a Aplicação (Build)

Se você precisar gerar a versão otimizada da sua aplicação para produção, pode compilá-la.

**Como fazer:**
Abra o terminal na raiz do seu projeto e execute o comando:

```bash
pnpm tsc
```

_Este comando, utilizando o compilador TypeScript (`tsc`), irá transcompilar seu código-fonte TypeScript para JavaScript, gerando os arquivos prontos para serem executados em ambiente de produção._

---

## 4. Gerenciamento de Serviços

Aqui estão alguns comandos adicionais para gerenciar os serviços Docker:

- **Para parar todos os serviços Docker Compose:**

    ```bash
    docker compose down
    ```

    _Este comando irá parar e remover todos os containers, redes e volumes definidos no `docker-compose.yml`. Use-o quando quiser "limpar" completamente os serviços do Docker. **Atenção:** se você quiser manter os dados do banco de dados, não remova os volumes._

- **Para parar apenas os containers (mantendo os volumes de dados):**
    ```bash
    docker compose stop
    docker compose rm -f
    ```
    _Estes comandos param e removem os containers, mas preservam os volumes, o que é útil se você quiser manter seus dados para uma próxima inicialização._

---

Pronto! Sua aplicação deve estar configurada e em execução. Se encontrar algum problema, revise os passos e as mensagens de erro.
