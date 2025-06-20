const yf = require('yahoo-finance2').default;
const { fetchJson } = require('./helpers');

async function fetchEtfPrice(symbol) {
  const quote = await yf.quote(symbol);
  return quote.regularMarketPrice;
}

async function fetchUsdBrl() {
  const url = 'https://api.exchangerate.host/latest?base=USD&symbols=BRL';
  const data = await fetchJson(url);
  return data.rates.BRL;
}

async function fetchSelic() {
  const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados/ultimos/1?formato=json';
  const data = await fetchJson(url);
  return parseFloat(data[0].valor);
}

module.exports = { fetchEtfPrice, fetchUsdBrl, fetchSelic };
