const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 4000

let data = []

app.get('/api/items', (req, res) => {
    res.json(data)
})

app.post('/api/items', (req, res) => {
    const { name, position } = req.body
    if (name && position) {
        const newItem = { name, position, completed: false }
        data.push(newItem)
        res.status(201).json(newItem)
    }
    else {
        res.status(400).json({ message: 'Ошибка при отправке данных' })
    }
})

app.delete('/api/items/:index', (req, res) => {
    const index = req.params.index
    if (data[index]) {
        const deletedItem = data.splice(index, 1)
        res.json(deletedItem)
    }
    else {
        res.status(404).json({ message: 'Не удалось удалить' })
    }
})

app.put("/api/items/:index", (req, res) => {
    const index = req.params.index
    if (data[index]) {
        data[index].completed = true
        res.json(data[index])
    }
    else {
        res.status(404).json({ message: 'Не удалось изменить' })
    }
})

app.listen(port, () => {
    console.log(`Сервер стартовал http://localhost:${port}`)
})
