# ⚙️ Configuração de Variáveis de Ambiente no Vercel

## 🎉 Boa Notícia!

**Este projeto NÃO precisa de variáveis de ambiente customizadas!**

O Vercel fornece automaticamente todas as variáveis necessárias:
- ✅ `VERCEL=1` - Indica que está no Vercel
- ✅ `VERCEL_URL` - URL do seu deployment
- ✅ `VERCEL_ENV` - Ambiente (production/preview/development)
- ✅ `PORT` - Porta do servidor

## 🚀 Como Fazer Deploy (Passo a Passo)

### 1️⃣ Acesse o Vercel
- Vá para [vercel.com](https://vercel.com)
- Faça login com GitHub

### 2️⃣ Importe o Repositório
- Clique em **"Add New..."** → **"Project"**
- Selecione **ocellim/amigo-oculto**

### 3️⃣ Configure o Projeto

```
Project Name: amigo-oculto (ou o nome que preferir)
Framework Preset: Other
Root Directory: ./
Build Command: (deixe vazio)
Output Directory: public
Install Command: npm install
```

### 4️⃣ Environment Variables
**❌ NÃO PRECISA ADICIONAR NADA AQUI!**

Pode deixar em branco e clicar em **"Deploy"**

### 5️⃣ Deploy! 🎊
- Clique em **"Deploy"**
- Aguarde ~30 segundos
- Pronto! Seu site estará no ar!

## 🔧 Se Você Quiser Adicionar Variáveis no Futuro

Caso precise adicionar variáveis de ambiente customizadas (para banco de dados, APIs, etc):

### Via Interface Web:
1. Acesse seu projeto no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione suas variáveis:
   - **Name**: Nome da variável (ex: `DATABASE_URL`)
   - **Value**: Valor da variável
   - **Environment**: Selecione onde usar (Production, Preview, Development)
4. Clique em **Save**
5. Faça um novo deploy para aplicar

### Via Vercel CLI:
```bash
# Adicionar variável
vercel env add DATABASE_URL

# Listar variáveis
vercel env ls

# Remover variável
vercel env rm DATABASE_URL
```

## 📋 Exemplo de Variáveis Comuns

```bash
# Banco de dados
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/db

# Autenticação
JWT_SECRET=seu_segredo_aqui

# APIs externas
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxx

# Configurações customizadas
NODE_ENV=production
MAX_PARTICIPANTS=50
```

## 🔒 Boas Práticas

### ✅ FAÇA:
- Use variáveis de ambiente para dados sensíveis
- Nunca commite arquivos `.env` com segredos
- Use nomes descritivos em MAIÚSCULAS
- Documente suas variáveis no `.env.example`

### ❌ NÃO FAÇA:
- Não coloque senhas diretamente no código
- Não commite arquivos `.env` no Git
- Não compartilhe variáveis de produção publicamente
- Não use as mesmas chaves em dev e produção

## 🎯 Comandos Úteis

```bash
# Ver logs do deployment
vercel logs

# Ver variáveis de ambiente
vercel env ls

# Fazer novo deployment
vercel --prod

# Ver informações do projeto
vercel inspect
```

## 📚 Documentação Oficial

- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Vercel System Environment Variables](https://vercel.com/docs/environment-variables#system-environment-variables)
- [Vercel CLI](https://vercel.com/docs/cli)

## 💡 Dica Extra

Se você quiser testar localmente com as mesmas variáveis do Vercel:

```bash
# Baixar variáveis de produção
vercel env pull

# Isso cria um arquivo .env.local
# Execute seu projeto normalmente
npm start
```

---

**Pronto! Agora é só fazer o deploy e usar! 🚀**

