document.getElementById('hamburger').addEventListener('click', function() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
});


// hero section code
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots[i].classList.remove('active');
    });
    
    dots[currentIndex].classList.add('active');
}

function currentSlide(index) {
    showSlide(index - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000); // Change slide every 5 seconds
});




// Your API key from Alpha Vantage
const API_KEY = 'GGZ0WRWSULD8VIOY';

// URLs to fetch Nifty50 and BankNifty data (Replace with the correct API URLs)
const nifty50Url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=BANKNIFTY&interval=1min&apikey=GGZ0WRWSULD8VIOY';

const bankNiftyUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=BANKNIFTY&interval=1min&apikey=${API_KEY}`;

// Function to fetch Nifty50 data
async function fetchNifty50Price() {
  try {
    const response = await fetch(nifty50Url);
    const data = await response.json();
    const latestTime = Object.keys(data['Time Series (1min)'])[0];
    const nifty50Price = data['Time Series (1min)'][latestTime]['1. open'];
    document.querySelector('.nifty50').innerHTML = `Nifty50: ${nifty50Price}`;
  } catch (error) {
    console.error('Error fetching Nifty50 price:', error);
  }
}

// Function to fetch BankNifty data
async function fetchBankNiftyPrice() {
  try {
    const response = await fetch(bankNiftyUrl);
    const data = await response.json();
    const latestTime = Object.keys(data['Time Series (1min)'])[0];
    const bankNiftyPrice = data['Time Series (1min)'][latestTime]['1. open'];
    document.querySelector('.banknifty').innerHTML = `BankNifty: ${bankNiftyPrice}`;
  } catch (error) {
    console.error('Error fetching BankNifty price:', error);
  }
}

// Function to update prices every minute
function updatePrices() {
  fetchNifty50Price();
  fetchBankNiftyPrice();
}

// Fetch prices on page load
updatePrices();

// Set an interval to fetch prices every minute (60,000 ms = 1 minute)
setInterval(updatePrices, 60000);

'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=GGZ0WRWSULD8VIOY';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});