/**
 * Simulates a stock price path using the Geometric Brownian Motion model.
 * @param {number} startPrice The initial stock price.
 * @param {number} days The number of trading days to simulate.
 * @param {number} annualDrift The annual drift (average daily return).
 * @param {number} annualVol The annual volatility (standard deviation of daily returns).
 * @returns {Array<number>} An array of simulated daily prices.
 */
function* simulateStockPrice(startPrice, days, annualDrift, annualVol) {
    // Time step (1 trading day out of ~252 per year)
    const dt = 1.0 / 252.0;
    let prices = [startPrice];
    let currentPrice = startPrice;

    for (let t = 1; t <= days; t++) {
        // Generate a random shock from a standard normal distribution (Box-Muller transform is one way)
        // This is a simplification using Math.random for demonstration, 
        // a true normal distribution generator is more complex.
        // Let's use a simple approximation for a bell curve-like distribution:
        let normalShock = 0;
        for (let i = 0; i < 12; i++) {
            normalShock += Math.random();
        }
        normalShock = (normalShock - 6) / 4; // Approximates a standard normal distribution N(0, 1)

        // Calculate the daily return factor based on GBM formula
        const dailyReturnFactor = Math.exp(
            (annualDrift - 0.5 * annualVol * annualVol) * dt +
            annualVol * Math.sqrt(dt) * normalShock
        );

        currentPrice *= dailyReturnFactor;
        prices.push(currentPrice);
    }

    yield prices;
}

// --- Parameters for simulation ---
const initialPrice = 100.0;
const simulationDays = 10000000; // One trading year
const drift = 0.05;         // Annual drift (5%)
const volatility = 0.2;     // Annual volatility (20%)

// --- Run the simulation ---
const simulatedPrices = simulateStockPrice(initialPrice, simulationDays, drift, volatility);

// --- Output the results to the console ---
console.log("--- Simulated Stock Prices (Daily) ---");

while (simulatedPrices.next())
    simulatedPrices.forEach((price, index) => {
        // Format the price to two decimal places
        console.log(`Day ${index}: $${price.toFixed(2)}`);
    });

// To view this data visually, you would need to incorporate a charting library 
// like Chart.js into an HTML environment.
