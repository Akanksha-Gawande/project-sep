const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

let originalData = [];

function fetchDataWithThen() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            originalData = data;
            renderTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        originalData = data;
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderTable(data) {
    const tableBody = document.getElementById('crypto-table-body');
    tableBody.innerHTML = '';

    data.forEach(coin => {
        const row = `
            <tr>
                <td>${coin.name}</td>
                <td>${coin.id}</td>
                <td><img src="${coin.image}" alt="${coin.name}" width="32"></td>
                <td>${coin.symbol.toUpperCase()}</td>
                <td>$${coin.current_price.toLocaleString()}</td>
                <td>${coin.total_volume.toLocaleString()}</td>
                <td>${coin.price_change_percentage_24h.toFixed(2)}%</td> 
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

document.getElementById('search').addEventListener('input', event => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredData = originalData.filter(coin =>
        coin.name.toLowerCase().includes(searchQuery) ||
        coin.symbol.toLowerCase().includes(searchQuery)
    );
    renderTable(filteredData);
});

document.getElementById('sort-market-cap').addEventListener('click', () => {
    const sortedData = [...originalData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
});

document.getElementById('sort-percentage-change').addEventListener('click', () => {
    const sortedData = [...originalData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
});

fetchDataWithThen();
