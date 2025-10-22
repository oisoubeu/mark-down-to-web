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
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_SUPABASE_URL=seu_supabase_url
VITE_SUPABASE_ANON_KEY=sua_supabase_anon_key
```

Para obter essas credenciais:
   - Acesse o painel do [Supabase](https://app.supabase.com/)
   - Selecione seu projeto
   - Vá em "Project Settings" > "API"
   - Copie a "Project URL" como `VITE_SUPABASE_URL`
   - Copie a "anon (Public) key" como `VITE_SUPABASE_ANON_KEY`

5. Configure provedores de autenticação (opcional):
   - No painel do Supabase, vá em "Authentication" > "Settings"
   - Habilite os provedores desejados (Google, GitHub, etc.)
   - Configure os provedores com suas credenciais

6. Inicie o servidor de desenvolvimento:
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

## Recursos de Autenticação

O projeto inclui um sistema completo de autenticação com as seguintes funcionalidades:

- Login e cadastro com email e senha
- Recuperação de senha por email
- Login com provedores sociais (Google e GitHub)
- Gerenciamento de sessão de usuário
- Proteção de rotas para usuários autenticados

## Histórico de Alterações

### Implementação do sistema de autenticação com Supabase (22/10/2025)
- Implementação do sistema de autenticação com Supabase


### Implementação do sistema de autenticação com Supabase (22/10/2025)
- Configuração do cliente Supabase para autenticação
- Criação de serviço de autenticação centralizado
- Implementação de login com email, Google e GitHub
- Adição de funcionalidades de recuperação de senha
- Atualização da página de autenticação com novos recursos
- Criação de componente de botão social reutilizável

### Configuração do sistema de rastreamento de alterações no README (22/10/2025)
- Configuração do sistema de rastreamento de alterações no README


### Primeira documentação do projeto (22/10/2025)
- Criada documentação inicial para o dashboard financeiro SetDívidas
- Descrito a funcionalidade real do projeto, apesar do nome do diretório ser enganoso
- Documentadas as tecnologias utilizadas e estrutura de rotas
- Adicionada explicação sobre o propósito da aplicação