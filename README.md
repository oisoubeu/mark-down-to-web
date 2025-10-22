# SetDívidas - Dashboard Financeiro Pessoal

## Descrição do Projeto
SetDívidas é um dashboard financeiro pessoal moderno e intuitivo desenvolvido para ajudar os usuários a controlar suas finanças com inteligência. A aplicação permite organizar receitas, despesas e acompanhar metas financeiras de forma eficiente.

**IMPORTANTE**: O nome do diretório do projeto ("mark-down-to-web") não reflete a funcionalidade real da aplicação, que é um dashboard financeiro pessoal chamado "SetDívidas".

## Funcionalidades
- Dashboard completo para visualizar saldo, receitas e despesas
- Sistema de metas financeiras com acompanhamento de progresso
- Relatórios visuais com gráficos e análise de dados financeiros
- Autenticação de usuários
- Gerenciamento de transações financeiras
- Configurações personalizadas

## Tecnologias Utilizadas
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (backend)
- React Query (gerenciamento de estado)
- React Router DOM (navegação)
- Lucide React (ícones)
- Recharts (gráficos)

## Estrutura de Rotas
- `/` - Página inicial com apresentação do serviço
- `/auth` - Página de autenticação
- `/dashboard` - Dashboard principal (rota protegida)
- `/transactions` - Gerenciamento de transações (rota protegida)
- `/settings` - Configurações do usuário (rota protegida)

## Como Executar o Projeto

1. Clone o repositório:
```sh
git clone <SEU_URL_DO_REPOSITORIO>
```

2. Navegue até o diretório do projeto:
```sh
cd mark-down-to-web
```

3. Instale as dependências:
```sh
npm install
```

4. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias para conexão com o Supabase e outros serviços.

5. Inicie o servidor de desenvolvimento:
```sh
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Scripts Disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria uma build de produção
- `npm run build:dev` - Cria uma build de desenvolvimento
- `npm run lint` - Executa o ESLint
- `npm run preview` - Pré-visualiza a build localmente

## Histórico de Alterações

### Configuração do sistema de rastreamento de alterações no README (22/10/2025)
- Configuração do sistema de rastreamento de alterações no README


### Primeira documentação do projeto (22/10/2025)
- Criada documentação inicial para o dashboard financeiro SetDívidas
- Descrito a funcionalidade real do projeto, apesar do nome do diretório ser enganoso
- Documentadas as tecnologias utilizadas e estrutura de rotas
- Adicionada explicação sobre o propósito da aplicação