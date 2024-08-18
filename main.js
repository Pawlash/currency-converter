async function convertCurrency() {
  const baseAmount = parseFloat(document.getElementById('baseAmount').value);
  const baseCurrency = document.getElementById('baseCurrency').value.toLowerCase();
  const convertedCurrency = document.getElementById('convertedCurrency').value.toLowerCase();

  try {
    const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`);
    

    const data = await response.json();
    const conversionRate = data[baseCurrency][convertedCurrency];
    

    const result = baseAmount * conversionRate;
    document.getElementById('convertedAmount').value = result.toFixed(2);
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
    document.getElementById('convertedAmount').text = 'Error';
  }
}
document.getElementById('swapButton').addEventListener('click', () => {
  const baseAmountInput = document.getElementById('baseAmount');
  const convertedAmountInput = document.getElementById('convertedAmount');

  [baseAmountInput.value, convertedAmountInput.value] = [convertedAmountInput.value, baseAmountInput.value];
});

document.getElementById('copyButton').addEventListener('click', () => {
  const convertedAmount = document.getElementById('convertedAmount').value;

  if (convertedAmount) {
    navigator.clipboard.writeText(convertedAmount);
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    convertCurrency();
  }
})
document.getElementById('convertButton').addEventListener('click', convertCurrency);
