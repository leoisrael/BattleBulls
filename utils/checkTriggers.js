const yf = require('yahoo-finance2').default;
const { fetchEtfPrice, fetchUsdBrl, fetchSelic } = require('./fetchPrices');
const { formatDate } = require('./helpers');

async function getHistoricalPrice(symbol, daysAgo) {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - daysAgo);
  const result = await yf.historical(symbol, {
    period1: formatDate(from),
    period2: formatDate(to),
  });
  if (!result || result.length === 0) return null;
  return result[0].close;
}

async function checkTrigger(trigger) {
  const { ativo, tipo } = trigger;
  let current;
  if (ativo === 'USD/BRL') {
    current = await fetchUsdBrl();
  } else if (ativo === 'SELIC') {
    current = await fetchSelic();
  } else {
    current = await fetchEtfPrice(ativo);
  }

  if (tipo === 'valor_absoluto') {
    if ((trigger.limite > 0 && current >= trigger.limite) ||
        (trigger.limite < 0 && current <= trigger.limite)) {
      return {
        gatilho: trigger,
        valorAtual: current,
      };
    }
  } else if (tipo === 'variacao') {
    const historical = await getHistoricalPrice(ativo, trigger.periodo_dias);
    if (!historical) return null;
    const variation = ((current - historical) / historical) * 100;
    if ((trigger.variacao_percentual > 0 && variation >= trigger.variacao_percentual) ||
        (trigger.variacao_percentual < 0 && variation <= trigger.variacao_percentual)) {
      return {
        gatilho: trigger,
        valorAtual: current,
        variacao: variation,
      };
    }
  }
  return null;
}

module.exports = { checkTrigger };
