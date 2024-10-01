import Express from 'express'
import MedicineRoute from "./router/medicineRouter"
import AdminRoute from "./router/adminRouter"
import TransactionRoute from "./router/transactionRouter"

const app = Express()

// allow to read a body request with json format
app.use(Express.json())

// prefix for medicine route
app.use(`/medicine`, MedicineRoute)
app.use(`/admin`, AdminRoute)
app.use(`/transaction`, TransactionRoute)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server DrugStore is running on port ${PORT}`)
})
