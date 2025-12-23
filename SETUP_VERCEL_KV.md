# 🔥 Setup Vercel KV - Persistência Permanente

Este projeto usa **Vercel KV** para persistência permanente no ambiente de produção.

## 🎯 Por que KV?

Antes os dados eram salvos na **memória** e se perdiam quando a função serverless ficava inativa.  
Com **Vercel KV**, os dados ficam salvos **permanentemente** em um banco Redis.

## ⚙️ Como Configurar (1 vez só):

### **1. Criar o Vercel KV Store**

1. Acesse seu projeto no [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Storage** (menu lateral)
3. Clique em **Create Database**
4. Escolha **KV**
5. Dê um nome (ex: `amigo-oculto-kv`)
6. Clique em **Create**

### **2. Conectar ao Projeto**

1. Após criar o KV, clique em **Connect Project**
2. Selecione o projeto **amigo-oculto**
3. Marque os ambientes: **Production**, **Preview**, **Development**
4. Clique em **Connect**

**Pronto! O Vercel automaticamente adiciona as variáveis de ambiente necessárias! ✅**

### **3. Fazer Novo Deploy**

```bash
git push origin main
```

Ou no Vercel Dashboard:
- Vá em **Deployments**
- Clique em **Redeploy**

---

## 🧪 Testando

Após o deploy:

1. **Faça um sorteio** no site
2. **Aguarde algumas horas** (ou force um cold start)
3. **Abra os links** novamente
4. **Os dados ainda estarão lá!** 🎉

---

## 💾 Como Funciona

### **Em Produção (Vercel):**
- Detecta a variável `KV_REST_API_URL`
- Usa **Vercel KV** (Redis)
- Dados persistem permanentemente
- Sobrevive a cold starts

### **Em Desenvolvimento (Local):**
- Sem KV configurado
- Usa **memória RAM** (fallback)
- Dados se perdem ao reiniciar o servidor
- Ideal para testes

---

## 🔍 Variáveis de Ambiente (Automáticas)

O Vercel adiciona automaticamente quando você conecta o KV:

```bash
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...
```

**Você NÃO precisa adicionar nada manualmente!** ✅

---

## 📊 Limites do Plano Free

- **30 GB** de bandwidth
- **256 MB** de storage
- **3.000** requests/dia
- **100 KB** por chave

Para amigo oculto, é **mais que suficiente**! 🚀

---

## 🔧 Comandos Úteis

### Ver dados no KV (via CLI):

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Ver dados
vercel kv get sorteio_global --project amigo-oculto

# Deletar dados
vercel kv del sorteio_global --project amigo-oculto
```

---

## ⚠️ Troubleshooting

### "Erro ao buscar sorteio"
- Verifique se o KV está conectado ao projeto
- Veja os logs no Vercel Dashboard
- Confirme que as variáveis de ambiente estão configuradas

### "Usando memória local" nos logs
- Normal em desenvolvimento local
- Em produção, deve mostrar "Usando Vercel KV"

### Dados ainda somem
- Confirme que fez novo deploy após conectar o KV
- Veja se o deployment está usando as variáveis corretas

---

## 📚 Documentação Oficial

- [Vercel KV Docs](https://vercel.com/docs/storage/vercel-kv)
- [Vercel Storage](https://vercel.com/docs/storage)

---

**Pronto! Agora seus sorteios nunca mais vão sumir! 🎊**

