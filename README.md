# Agendify - Gerenciamento para Freelancers de Eventos

Agendify é uma plataforma responsiva (PWA) projetada para fotógrafos, DJs, cerimonialistas e outros profissionais de eventos organizarem seus eventos, checklists e financeiro de forma centralizada e profissional.

## 🚀 Tecnologias

- **Next.js 14+** (App Router)
- **React 18+** (Funcionalidades de Dashboard e Listagens)
- **Tailwind CSS** (Responsividade Prioritária)
- **Lucide Icons** (Ícones Minimalistas)
- **Recharts** (Visualização Financeira)
- **Gemini API** (Assistente de Inteligência Artificial para Checklists)
- **Supabase** (Autenticação e Banco de Dados Real-time)

## 🛠️ Configuração

### 1. Supabase
- Crie um projeto no [Supabase](https://supabase.com).
- No Editor de SQL, cole o conteúdo do arquivo `supabase_schema.sql` para criar as tabelas e políticas de segurança (RLS).
- Obtenha as chaves de API no painel de configurações do Supabase.

### 2. Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz com:
```env
NEXT_PUBLIC_SUPABASE_URL=seu_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
API_KEY=sua_chave_gemini_api
```

### 3. Instalação
```bash
npm install
npm run dev
```

## 📱 Responsividade (PWA)
O sistema foi desenvolvido seguindo o princípio **Mobile-First**:
- **Mobile (< 1024px):** Navegação inferior fixa (Bottom Nav) para fácil acesso com o polegar. Cards em coluna única.
- **Desktop (>= 1024px):** Sidebar lateral fixa. Layouts em grid de 2 a 3 colunas para maior aproveitamento de tela.

## 📦 Deploy
Recomendado usar a **Vercel** para deploy automático via GitHub. O projeto está configurado para funcionar como um PWA, permitindo que os usuários instalem o app em seus celulares via Chrome/Safari.
