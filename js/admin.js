// =========================
// AUTH CHECK
// =========================
if (localStorage.getItem("isAdminLoggedIn") !== "true") {
    window.location.href = "login.html";
}

const table = document.getElementById("admin-table");
const form = document.getElementById("transaction-form");

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");

const dashboardSection = document.getElementById("dashboard");
const transactionsSection = document.getElementById("transactions");

const amountInput = document.getElementById("amount");

let transactions = getTransactions();

/* =========================
   FORMAT INPUT NOMINAL (OPSIONAL)
========================= */
amountInput.addEventListener("input", function (e) {
    const cursorPosition = this.selectionStart;
    const rawValue = this.value.replace(/\D/g, "");

    if (!rawValue) {
        this.value = "";
        return;
    }

    const formattedValue = formatNumber(rawValue);

    // hitung selisih panjang sebelum & sesudah format
    const diff = formattedValue.length - this.value.length;

    this.value = formattedValue;

    // kembalikan posisi cursor
    this.setSelectionRange(
        cursorPosition + diff,
        cursorPosition + diff
    );
});


/* =========================
   RENDER
========================= */
function render() {
    table.innerHTML = "";

    const summary = calculateSummary(transactions);
    incomeEl.textContent = formatNumber(summary.income);
    expenseEl.textContent = formatNumber(summary.expense);
    balanceEl.textContent = formatNumber(summary.balance);

    transactions.forEach((t, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td>${formatNumber(t.amount)}</td>
            <td>${t.type}</td>
            <td>
                <button onclick="editTx(${i})">✏️</button>
                <button onclick="deleteTx(${i})">❌</button>
            </td>
        `;
        table.appendChild(row);
    });

    saveTransactions(transactions);
}

/* =========================
   FORM SUBMIT
========================= */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const tx = {
        date: document.getElementById("date").value,
        description: document.getElementById("description").value,
        // hapus titik sebelum disimpan
        amount: Number(amountInput.value.replace(/\./g, "")),
        type: document.getElementById("type").value
    };

    transactions.push(tx);
    form.reset();
    render();
});

/* =========================
   CRUD
========================= */
window.deleteTx = function (i) {
    if (!confirm("Hapus data?")) return;
    transactions.splice(i, 1);
    render();
};

window.editTx = function (i) {
    const t = transactions[i];

    document.getElementById("date").value = t.date;
    document.getElementById("description").value = t.description;
    amountInput.value = formatNumber(t.amount);
    document.getElementById("type").value = t.type;

    transactions.splice(i, 1);
    render();
};

/* =========================
   NAVIGATION
========================= */
window.showDashboard = function () {
    dashboardSection.style.display = "block";
    transactionsSection.style.display = "none";
};

window.showTransactions = function () {
    dashboardSection.style.display = "none";
    transactionsSection.style.display = "block";
};

window.logout = function () {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "login.html";
};

/* INIT */
render();
