const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express(); //
// إضافة
app.post('/add', (req, res) => {
    const { amount, type, date, note } = req.body;
    db.prepare(
        `INSERT INTO expenses (amount, type, date, note) VALUES (?, ?, ?, ?)`
    ).run(amount, type, date, note);
    res.send("OK");
});

// جلب
app.get('/all', (req, res) => {
    const rows = db.prepare(`SELECT * FROM expenses ORDER BY id DESC`).all();
    res.json(rows);
});

// حذف
app.delete('/delete/:id', (req, res) => {
    db.prepare(`DELETE FROM expenses WHERE id=?`).run(req.params.id);
    res.send("Deleted");
});

// تعديل
app.put('/edit/:id', (req, res) => {
    const { amount, type, date, note } = req.body;
    db.prepare(`
        UPDATE expenses SET amount=?, type=?, date=?, note=? WHERE id=?
    `).run(amount, type, date, note, req.params.id);
    res.send("OK");
});