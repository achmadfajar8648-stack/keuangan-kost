const table = document.getElementById("viewer-table");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");

const transactions = getTransactions();
const summary = calculateSummary(transactions);

incomeEl.textContent = formatNumber(summary.income);
expenseEl.textContent = formatNumber(summary.expense);
balanceEl.textContent = formatNumber(summary.balance);


transactions.forEach(t => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${t.date}</td>
        <td>${t.description}</td>
        <td>${formatNumber(t.amount)}</td>
        <td>${t.type}</td>
    `;
    table.appendChild(row);
});
