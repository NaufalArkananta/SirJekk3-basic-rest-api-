import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient({errorFormat: `minimal`})

type TransactionDetail = {
    medicine_id: number,
    quantity: number,
}

const createTransaction = async (req: Request, res: Response) => {
    try {
        // read a requestt data
        const chasier_name: string = req.body.chasier_name
        const order_date: Date = new Date (req.body.order_date)
        const transaction_detail: TransactionDetail[] = req.body.transaction_detail

        // checking medicine (memastikan id obat tersedia)
        const arrayMedicineId = transaction_detail.map(item => item.medicine_id)
        // check medicine id at medicine table
        const findMedicine = await prisma.medicine.findMany({
            where: {id: {in: arrayMedicineId}}
        })
        // check id obat yang tidak tersedia
        const notFoundMedicine = arrayMedicineId.filter(
            item => !findMedicine.map(
                obat => obat.id
            ).includes(
                item
            )
        )

        if(notFoundMedicine.length > 0) {
            return res.status(404).json({
                message: `There are medicine that doesn's exists`
            })
        }

        // save transaction data
        const newTransaction = await prisma.transaction.create({
            data: {
                chasier_name,
                order_date
            }
        })
        // prepare data for transaction_detail
        let newDetail = [] 
        for (let index = 0; index < transaction_detail.length; index++) {
            const { medicine_id, quantity } = transaction_detail[index]
            // find price at each medicine
            const medicineItem = findMedicine.find(item => item.id == medicine_id)
            
            newDetail.push({
                transaction_id: newTransaction.id,
                medicine_id,
                quantity,
                order_price: medicineItem?.price || 0
            })
        }

        // save transaction detail
        await prisma.transaction_detail.createMany({
            data: newDetail
        })

        return res.status(200).json({
            message: `New Transaction has been created`,
        })

    } catch (error) {
        return res.status(500).json(error)
    }
}

export { createTransaction }