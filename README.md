📡 GatilhoWatch – Monitor Inteligente de Gatilhos de Investimento com Alerta por E-mail
🧠 Objetivo
O GatilhoWatch é uma aplicação que monitora ativos estratégicos para cenários de crise geopolítica, inflação e instabilidade econômica, com o objetivo de alertar o investidor sempre que um gatilho de ação pré-definido for ativado.

A aplicação analisa dados de:

ETFs da B3 (GOLD11, IVVB11, BOVA11)

Câmbio USD/BRL

Índice S&P 500

Taxa Selic

(Opcional) Notícias geopolíticas

🎯 Funcionalidades
✅ Monitora cotações e indicadores 1x ao dia

✅ Detecta eventos definidos como gatilhos (valores ou variações)

✅ Gera alertas por e-mail com recomendação de ação

✅ Suporte a novos gatilhos via JSON configurável

✅ Uso de APIs gratuitas e confiáveis

🔧 Tecnologias Utilizadas
Componente	Descrição
Node.js	Linguagem base
yahoo-finance2	Consulta ETFs da B3: GOLD11.SA, IVVB11.SA, BOVA11.SA
ExchangeRate.host	Dólar comercial (sem chave de API)
Banco Central do Brasil (SGS)	Taxa Selic atual
Nodemailer	Envio de e-mails via SMTP
node-cron	Agendamento da execução diária

📁 Estrutura do Projeto
bash
Copiar
Editar
gatilho-watch/
├── gatilhos.json            # Gatilhos configuráveis
├── monitor.js               # Script principal de verificação
├── sendEmail.js             # Módulo de envio de e-mails
├── utils/
│   ├── fetchPrices.js       # Consulta ativos e histórico
│   ├── checkTriggers.js     # Verifica se algum gatilho foi ativado
│   └── helpers.js           # Funções auxiliares
├── .env                     # Variáveis de ambiente (SMTP, API keys)
├── cronjob.sh               # Agendador local (opcional)
└── README.md
🧠 Exemplo de gatilhos.json
json
Copiar
Editar
{
  "gatilhos": [
    {
      "id": "gold_subiu_20",
      "ativo": "GOLD11.SA",
      "tipo": "variacao",
      "periodo_dias": 30,
      "variacao_percentual": 20,
      "acao": "Considerar venda parcial de GOLD11 e rebalancear"
    },
    {
      "id": "dolar_maior_6",
      "ativo": "USD/BRL",
      "tipo": "valor_absoluto",
      "limite": 6.00,
      "acao": "Comprar mais IVVB11 (proteção cambial)"
    },
    {
      "id": "sp500_cai_10",
      "ativo": "IVVB11.SA",
      "tipo": "variacao",
      "periodo_dias": 30,
      "variacao_percentual": -10,
      "acao": "Aproveitar para comprar mais IVVB11"
    }
  ]
}
📨 Exemplo de E-mail Enviado
Assunto:
🔔 Alerta de Gatilho Ativado: GOLD11 subiu 21% em 30 dias

Corpo:

less
Copiar
Editar
Olá, Leo.

Detectamos que o ativo GOLD11 subiu +21% nos últimos 30 dias.  
Esse comportamento está acima do seu gatilho de 20% de valorização.

📌 Ação sugerida:
Você pode considerar vender parte de GOLD11 e realocar para IVVB11 ou BOVA11, conforme sua estratégia de rebalanceamento.

💡 Contexto:
Esse tipo de valorização em ouro costuma ocorrer em momentos de estresse global. Aproveitar o lucro agora pode melhorar a rentabilidade total da carteira.

—
Sistema GatilhoWatch
🌐 Fontes de Dados (APIs Gratuitas)
Fonte	Uso	URL / Lib
Yahoo Finance	GOLD11, IVVB11, BOVA11	yahoo-finance2
ExchangeRate.host	Câmbio USD/BRL	https://api.exchangerate.host/latest?base=USD&symbols=BRL
Banco Central (SGS)	Selic	https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados/ultimos/1?formato=json
Alpha Vantage (opcional)	S&P 500	https://www.alphavantage.co/query (com chave gratuita)

📦 Variáveis do .env (exemplo)
dotenv
Copiar
Editar
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seuemail@gmail.com
SMTP_PASS=suasenhaouappkey
EMAIL_DESTINO=leouser@exemplo.com
🛠️ Tarefas para Implementação (via IA)
 Configurar .env para SMTP e e-mail

 Criar parser de gatilhos.json

 Criar função de consulta via Yahoo Finance

 Integrar API do ExchangeRate.host para USD/BRL

 Integrar API do BCB para taxa Selic

 Implementar verificação de gatilho (variação percentual e valor absoluto)

 Implementar envio de e-mail personalizado

 Agendar execução automática diária (via node-cron ou cronjob.sh)

 Logar resultados para diagnóstico

✅ Requisitos Funcionais
Rodar diariamente automaticamente

Checar dados de ativos e câmbio

Verificar gatilhos com base em histórico

Enviar e-mails claros com recomendações táticas

Ser configurável e extensível com novos ativos

## Como usar

1. Renomeie `.env.example` para `.env` e preencha com suas credenciais de SMTP.
2. Instale as dependências com `npm install`.
3. Execute `node monitor.js` para iniciar o monitoramento. O script agenda uma verificação diária às 9h da manhã e também roda imediatamente ao iniciar.
4. Opcionalmente, adicione `cronjob.sh` ao crontab para execução em servidores sem Node cron.

Os gatilhos podem ser personalizados editando `gatilhos.json`.
