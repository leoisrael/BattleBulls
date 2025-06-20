const axios = require('axios');
const { format } = require('date-fns');

// Helper to format dates for APIs
function formatDate(date) {
  return format(date, 'yyyy-MM-dd');
}

// Fetch JSON helper
async function fetchJson(url) {
  const res = await axios.get(url);
  return res.data;
}

module.exports = { formatDate, fetchJson };
