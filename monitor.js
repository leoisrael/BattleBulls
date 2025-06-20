const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { sendAlertEmail } = require('./sendEmail');
const { checkTrigger } = require('./utils/checkTriggers');
require('dotenv').config();

function loadTriggers() {
  const file = fs.readFileSync(path.join(__dirname, 'gatilhos.json'), 'utf-8');
  return JSON.parse(file).gatilhos || [];
}

async function runChecks() {
  const gatilhos = loadTriggers();
  for (const gatilho of gatilhos) {
    try {
      const result = await checkTrigger(gatilho);
      if (result) {
        const { gatilho: g, valorAtual, variacao } = result;
        let subject = `\uD83D\uDD14 Alerta de Gatilho: ${g.id}`;
        let text = `Gatilho ${g.id} ativado para ${g.ativo}.\nValor atual: ${valorAtual}`;
        if (variacao !== undefined) {
          text += `\nVaria\u00e7\u00e3o: ${variacao.toFixed(2)}%`;
        }
        text += `\nA\u00e7\u00e3o sugerida: ${g.acao}`;
        await sendAlertEmail(subject, text);
        console.log(`Email enviado para gatilho ${g.id}`);
      } else {
        console.log(`Gatilho ${gatilho.id} n\u00e3o ativado`);
      }
    } catch (err) {
      console.error('Erro ao verificar gatilho', gatilho.id, err.message);
    }
  }
}

// Cron job daily at 9am
if (require.main === module) {
  cron.schedule('0 9 * * *', runChecks);
  console.log('Monitor iniciado.');
  runChecks();
}

module.exports = { runChecks };
