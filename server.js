const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// URL base - usa VERCEL_URL em produção ou localhost em desenvolvimento
const getBaseUrl = (req) => {
  // Se estiver no Vercel, usa o host da requisição
  if (process.env.VERCEL) {
    return `https://${req.get('host')}`;
  }
  // Em desenvolvimento local
  return `http://localhost:${PORT}`;
};

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${PORT}`;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// ============================================
// PERSISTÊNCIA - KV (Vercel) ou Memória (Local)
// ============================================
let kv;
let useKV = false;

// Tentar importar KV apenas se estiver no Vercel
if (process.env.KV_REST_API_URL) {
  try {
    kv = require('@vercel/kv').kv;
    useKV = true;
    console.log('✅ Usando Vercel KV para persistência');
  } catch (error) {
    console.log('⚠️ Vercel KV não disponível, usando memória local');
  }
} else {
  console.log('💾 Usando memória local (desenvolvimento)');
}

// Armazenamento em memória (fallback para desenvolvimento local)
let sorteioMemoria = {
  pessoas: [],
  participantes: [],
  dataCriacao: null
};

// Funções de persistência com abstração KV/Memória
async function getSorteio() {
  if (useKV) {
    const sorteio = await kv.get('sorteio_global');
    return sorteio || { pessoas: [], participantes: [], dataCriacao: null };
  }
  return sorteioMemoria;
}

async function setSorteio(sorteio) {
  if (useKV) {
    await kv.set('sorteio_global', sorteio);
  } else {
    sorteioMemoria = sorteio;
  }
}

async function resetSorteio() {
  const sorteioVazio = { pessoas: [], participantes: [], dataCriacao: null };
  if (useKV) {
    await kv.set('sorteio_global', sorteioVazio);
  } else {
    sorteioMemoria = sorteioVazio;
  }
  return sorteioVazio;
}

// Rota raiz - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Função para embaralhar array
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Função para fazer o sorteio garantindo que ninguém tire a si mesmo
function realizarSorteio(pessoas) {
  let tentativas = 0;
  const maxTentativas = 100;
  
  while (tentativas < maxTentativas) {
    const embaralhado = shuffle(pessoas);
    let valido = true;
    
    for (let i = 0; i < pessoas.length; i++) {
      if (pessoas[i] === embaralhado[i]) {
        valido = false;
        break;
      }
    }
    
    if (valido) {
      return embaralhado;
    }
    
    tentativas++;
  }
  
  throw new Error('Não foi possível realizar o sorteio');
}

// Rota para verificar se existe sorteio
app.get('/api/sorteio', async (req, res) => {
  try {
    const sorteio = await getSorteio();
    res.json({
      existe: sorteio.pessoas.length > 0,
      pessoas: sorteio.pessoas,
      dataCriacao: sorteio.dataCriacao
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar sorteio: ' + erro.message });
  }
});

// Rota para criar/atualizar o sorteio único
app.post('/api/sortear', async (req, res) => {
  const { pessoas } = req.body;
  
  if (!pessoas || pessoas.length < 2) {
    return res.status(400).json({ erro: 'É necessário pelo menos 2 pessoas' });
  }
  
  try {
    const sorteados = realizarSorteio(pessoas);
    
    // Criar tokens únicos para cada pessoa
    const participantes = pessoas.map((pessoa, index) => {
      const token = uuidv4();
      return {
        nome: pessoa,
        tirou: sorteados[index],
        token: token
      };
    });
    
    // Atualizar sorteio global (KV ou memória)
    const novoSorteio = {
      pessoas: pessoas,
      participantes: participantes,
      dataCriacao: new Date().toISOString()
    };
    
    await setSorteio(novoSorteio);
    
    // Retornar os links
    const baseUrl = getBaseUrl(req);
    const links = participantes.map(p => ({
      nome: p.nome,
      link: `${baseUrl}/revelar.html?token=${p.token}`
    }));
    
    res.json({ 
      sucesso: true,
      links: links
    });
    
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Rota para revelar quem a pessoa tirou
app.get('/api/revelar', async (req, res) => {
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).json({ erro: 'Token é obrigatório' });
  }
  
  try {
    const sorteio = await getSorteio();
    
    if (sorteio.participantes.length === 0) {
      return res.status(404).json({ erro: 'Nenhum sorteio foi realizado ainda' });
    }
    
    const participante = sorteio.participantes.find(p => p.token === token);
    
    if (!participante) {
      return res.status(404).json({ erro: 'Token inválido' });
    }
    
    res.json({
      nome: participante.nome,
      tirou: participante.tirou
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar informações: ' + erro.message });
  }
});

// Rota para resetar o sorteio
app.post('/api/reset', async (req, res) => {
  try {
    await resetSorteio();
    res.json({ 
      sucesso: true,
      mensagem: 'Sorteio resetado com sucesso'
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao resetar sorteio: ' + erro.message });
  }
});


// Exportar o app para o Vercel
module.exports = app;

// Iniciar servidor apenas em desenvolvimento local (não no Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🎁 Servidor rodando em http://localhost:${PORT}`);
  });
}

