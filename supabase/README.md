# Supabase Setup

## 1. Env vars

Cria um ficheiro `.env` na raiz com:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 2. Schema

No SQL Editor do Supabase, corre o ficheiro:

- `supabase/schema.sql`

Isto cria:

- `authorized_users`
- `profiles`
- `groups`
- `group_members`
- `feedback_entries`
- `access_recovery_requests`

Também faz seed dos e-mails autorizados do camp.

## 3. Auth settings

Para o fluxo atual ficar simples:

- desativa confirmação obrigatória por e-mail no projeto Supabase
- ou, se a mantiveres ativa, a app cria a conta mas o utilizador só entra depois de confirmar o e-mail

## 4. App

Depois corre:

```bash
npm run dev
```

Com as env vars preenchidas, a app entra em modo Supabase automaticamente.
