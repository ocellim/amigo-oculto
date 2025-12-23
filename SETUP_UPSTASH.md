# 🚀 Setup Upstash Redis - Persistência Permanente (GRÁTIS)

Este projeto usa **Upstash Redis** para persistência permanente em produção.

## 🎯 Por que Upstash?

- ✅ **100% Grátis** para sempre (10.000 comandos/dia)
- ✅ **Serverless** - perfeito para Vercel
- ✅ **Setup em 2 minutos**
- ✅ **Sem cartão de crédito**
- ✅ **Dados persistem para sempre**

---

## ⚙️ Como Configurar:

### **1. Criar conta no Upstash (GRÁTIS)**

1. Acesse: [console.upstash.com](https://console.upstash.com)
2. Clique em **"Sign Up"**
3. Use sua conta do **GitHub** ou **Google**
4. **Não precisa cartão de crédito!** ✅

### **2. Criar Redis Database**

1. No dashboard, clique em **"Create Database"**
2. Configure:
   - **Name**: `amigo-oculto`
   - **Type**: Regional
   - **Region**: Escolha o mais próximo (ex: `us-east-1` ou `sa-east-1` para Brasil)
   - **TLS**: Enabled ✅
3. Clique em **"Create"**

### **3. Copiar Credenciais**

Depois de criar, você vai ver:

```
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxZQ
```

**Copie esses dois valores!** 📋

### **4. Adicionar no Vercel**

1. Acesse seu projeto no [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Environment Variables**
3. Adicione as duas variáveis:

   **Nome:** `UPSTASH_REDIS_REST_URL`  
   **Valor:** Cole a URL que você copiou  
   **Environments:** ✅ Production ✅ Preview ✅ Development

   **Nome:** `UPSTASH_REDIS_REST_TOKEN`  
   **Valor:** Cole o TOKEN que você copiou  
   **Environments:** ✅ Production ✅ Preview ✅ Development

4. Clique em **"Save"**

### **5. Fazer Redeploy**

1. Vá em **Deployments**
2. Clique nos **3 pontinhos** do último deployment
3. Clique em **"Redeploy"**
4. **Pronto!** 🎉

---

## 🧪 Testando

Após o deploy:

1. **Faça um sorteio** no site
2. **Copie um link**
3. **Aguarde 1 hora** (ou dias!)
4. **Abra o link**
5. **Os dados ainda estarão lá!** 🎊

---

## 📊 Plano Free - Limites

- **10.000 comandos/dia** (mais que suficiente!)
- **256 MB** de storage
- **Sem expiração** dos dados
- **Sem cartão de crédito necessário**

Para amigo oculto, é **perfeito e grátis para sempre**! 🚀

---

## 💾 Como Funciona

### **Em Produção (Vercel com Upstash):**
```
✅ Usando Upstash Redis para persistência
```
- Dados salvos no Redis
- Persistem indefinidamente
- Sobrevive a cold starts

### **Em Desenvolvimento (Local):**
```
💾 Usando memória local (desenvolvimento)
```
- Usa RAM
- Dados somem ao reiniciar
- Ideal para testes

---

## 🔍 Ver dados no Redis

No dashboard do Upstash:

1. Clique no seu database
2. Vá em **"Data Browser"**
3. Procure por `sorteio_global`
4. Você verá todos os dados salvos!

Pode também deletar manualmente se quiser resetar.

---

## ⚠️ Troubleshooting

### "Usando memória local" nos logs do Vercel

**Problema:** Variáveis de ambiente não foram adicionadas corretamente

**Solução:**
1. Verifique se as variáveis estão no Vercel (Settings → Environment Variables)
2. Confirme que marcou **Production, Preview e Development**
3. Faça um **Redeploy**

### "Erro ao buscar sorteio"

**Problema:** Credenciais incorretas

**Solução:**
1. Copie novamente as credenciais do Upstash
2. Cole exatamente como está (sem espaços extras)
3. Salve e faça redeploy

### Dados somem mesmo com Upstash

**Problema:** Não fez redeploy após adicionar variáveis

**Solução:**
1. Vá em Deployments
2. Redeploy do último deployment
3. Confirme que os logs mostram "Usando Upstash Redis"

---

## 🎓 Resumo Rápido

1. ✅ Criar conta no Upstash (grátis, sem cartão)
2. ✅ Criar database Redis
3. ✅ Copiar URL e TOKEN
4. ✅ Colar no Vercel (Environment Variables)
5. ✅ Fazer Redeploy
6. ✅ **Nunca mais perder dados!**

---

## 📚 Links Úteis

- [Upstash Console](https://console.upstash.com)
- [Upstash Docs](https://upstash.com/docs/redis)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

---

**Pronto! Seus sorteios agora são permanentes! 🔥**

Total de tempo: ~5 minutos ⏱️

