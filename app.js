const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// In-memory storage
let incomes = [];
let expenses = [];
let budget = 0;

// ID counters
let incomeId = 1;
let expenseId = 1;

// Home page
app.get("/", (req, res) => {
    res.render("home");
});

// ADD INCOME
app.get("/income", (req, res) => {
    res.render("addIncome");
});

app.post("/income", (req, res) => {
    incomes.push({
        id: incomeId++,
        amount: Number(req.body.amount)
    });

    res.redirect("/balance");
});

// ADD EXPENSE
app.get("/expense", (req, res) => {
    res.render("addExpense");
});

app.post("/expense", (req, res) => {
    expenses.push({
        id: expenseId++,
        amount: Number(req.body.amount)
    });

    res.redirect("/balance");
});

// DELETE INCOME
app.get("/income/delete/:id", (req, res) => {
    incomes = incomes.filter(i => i.id != req.params.id);
    res.redirect("/balance");
});

// DELETE EXPENSE
app.get("/expense/delete/:id", (req, res) => {
    expenses = expenses.filter(e => e.id != req.params.id);
    res.redirect("/balance");
});

// SET BUDGET
app.get("/budget", (req, res) => {
    res.render("budget");
});

app.post("/budget", (req, res) => {
    budget = Number(req.body.budget);
    res.redirect("/balance");
});

// VIEW BALANCE
app.get("/balance", (req, res) => {
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

    const remaining = budget - totalExpense;

    res.render("balance", {
        totalIncome,
        totalExpense,
        budget,
        remaining,
        incomes,
        expenses
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});