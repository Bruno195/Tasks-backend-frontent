# Setup do Projeto Fullstack: React + NestJS

Este guia detalha o processo de configuração e inicialização de dois projetos, um para o front-end utilizando React e outro para o back-end utilizando NestJS. 

## 🚨 Ponto Importante: Conflito com o PostgreSQL no Docker

É importante garantir que o serviço PostgreSQL do Linux não esteja em execução para evitar conflitos de porta (5432). 

Antes de iniciar os contêineres Docker, execute o comando abaixo para parar o serviço PostgreSQL local:

```bash
sudo systemctl stop postgresql
```


## Pré-requisitos

Antes de começar, você precisa ter o seguinte instalado em sua máquina:

- **Node.js** (versão 20 ou superior)
- **npm** (gerenciador de pacotes)
- **Git** (para controle de versão)
- **Docker** (para imagem e contêiner)

1. **Navegue até o diretório do front-end:**

    ```bash
    cd project-management
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```
3. **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run start
    ```

## Inicializando o Projeto Back-end (NestJS)

1. **Navegue até o diretório do back-end:**

    ```bash
    cd back-end
    ```

2. **Inicialize o projeto NestJS:**

    Use o comando abaixo:

    ```bash
    docker compose up --build
    ```
