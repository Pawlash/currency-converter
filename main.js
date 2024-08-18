document.getElementById('convertButton').addEventListener('click', async () => {
  await convertCurrency();
});

document.getElementById('swapButton').addEventListener('click', () => {
  const baseAmountInput = document.getElementById('baseAmount');
  const convertedAmountInput = document.getElementById('convertedAmount');
  const baseCurrencySelect = document.getElementById('baseCurrency');
  const convertedCurrencySelect = document.getElementById('convertedCurrency');

  [baseAmountInput.value, convertedAmountInput.value] = [convertedAmountInput.value, baseAmountInput.value];
  
  [baseCurrencySelect.value, convertedCurrencySelect.value] = [convertedCurrencySelect.value, baseCurrencySelect.value];
});

document.getElementById('copyButton').addEventListener('click', () => {
  const convertedAmount = document.getElementById('convertedAmount').value;

  if (convertedAmount) {
    navigator.clipboard.writeText(convertedAmount)
    .then(() => {
      console.log('Copied to clipboard');
    })
  } else {
    console.error('Nothing to copy');
  }
});

async function convertCurrency() {
  const baseAmount = parseFloat(document.getElementById('baseAmount').value);
  const baseCurrency = document.getElementById('baseCurrency').value.toLowerCase();
  const convertedCurrency = document.getElementById('convertedCurrency').value.toLowerCase();
  
  if (isNaN(baseAmount) || !baseCurrency || !convertedCurrency) {
    console.error('Invalid input values');
    return;
  }

  try {
    const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const conversionRate = data[baseCurrency][convertedCurrency];
    

    const result = baseAmount * conversionRate;
    document.getElementById('convertedAmount').value = result.toFixed(2);
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
    document.getElementById('convertedAmount').value = 'Error';
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    convertCurrency();
  }
});
