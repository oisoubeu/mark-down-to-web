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

## Recursos de Autenticação

O projeto inclui um sistema completo de autenticação com as seguintes funcionalidades:

- Login e cadastro com email e senha
- Recuperação de senha por email
- Gerenciamento de sessão de usuário
- Proteção de rotas para usuários autenticados

## Configuração do Banco de Dados

O projeto utiliza o Supabase como backend e requer algumas tabelas para funcionar corretamente. Para configurar o banco de dados:

1. Acesse o painel do [Supabase](https://app.supabase.com/)
2. Selecione seu projeto
3. Vá até a seção "SQL Editor"
4. Copie e cole o conteúdo do arquivo `supabase_schema.sql` localizado na raiz do projeto
5. Execute o script para criar as tabelas necessárias

O script criará as tabelas para:
- Perfis de usuários (ligados à autenticação do Supabase)
- Categorias de transações
- Transações financeiras (receitas e despesas)
- Metas financeiras

**Observação**: Se encontrar um erro como "constraint already exists", isso indica que algumas tabelas já foram criadas anteriormente. O script foi atualizado para lidar com esses casos e executar com segurança múltiplas vezes.

## Histórico de Alterações

### Correção do script de banco de dados (22/10/2025)
- Correção do script de banco de dados


### Correção do script de banco de dados (22/10/2025)
- Correção do script SQL para evitar conflitos com tabelas existentes
- Adicionado tratamento de erros para execução segura múltiplas vezes
- Atualizada a documentação com observações sobre possíveis erros

### Simplificação da autenticação e criação do script de banco de dados (22/10/2025)
- Simplificação da autenticação e criação do script de banco de dados


### Simplificação da autenticação e criação do script de banco de dados (22/10/2025)
- Remoção dos provedores sociais de autenticação (Google e GitHub)
- Criação do script SQL para configurar as tabelas no Supabase
- Atualização da documentação com instruções de configuração
- Simplificação do componente de autenticação

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