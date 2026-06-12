# DP Agency Content OS

Aplicacao React + Vite com autenticacao Firebase e endpoint de geracao de conteudo via Gemini em funcoes serverless da Vercel.

## Requisitos

- Node.js 20+
- Conta no Firebase (Auth + Firestore)
- Chave da API Gemini
- Conta na Vercel

## Variaveis de ambiente

1. Copie [.env.example](.env.example) para `.env.local`.
2. Preencha os valores:

- `GEMINI_API_KEY` (server-side)
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` (opcional)
- `VITE_FIREBASE_DATABASE_ID` (geralmente `(default)`)

## Executar localmente

1. Instale dependencias:

```bash
npm install
```

2. Rode a aplicacao:

```bash
npm run dev
```

3. Healthcheck local:

```bash
http://localhost:3000/api/health
```

## Build e validacao

```bash
npm run lint
npm run build
```

## Publicar no GitHub (repositorio dpagency/content-os)

No diretorio do projeto:

```bash
git init
git add .
git commit -m "chore: preparar dp-agency-content-os para GitHub e Vercel"
git branch -M main
git remote add origin https://github.com/dpagency/content-os.git
git push -u origin main
```

## Deploy na Vercel

1. Importe o repositorio `dpagency/content-os` na Vercel.
2. Framework Preset: `Vite`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Configure as mesmas variaveis de ambiente do `.env.local` no projeto da Vercel.
6. Execute o deploy.

## Endpoints em producao

- `GET /api/health`
- `POST /api/generate`

## Observacoes

- O roteamento SPA esta configurado em [vercel.json](vercel.json).
- As funcoes serverless ficam em [api/generate.ts](api/generate.ts) e [api/health.ts](api/health.ts).
