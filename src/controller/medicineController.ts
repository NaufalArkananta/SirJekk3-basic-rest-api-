import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

// create objek of prisma
const prisma = new PrismaClient({errorFormat: "minimal"})

type DrugType = 
    "Syrup"| "Powder"| "Tablet"

const createMedicine = async (req: Request, res: Response) => {
    try {
        const name: string = req.body.name
        const stock: number = req.body.stock
        const exp_date: Date = new Date(req.body.exp_date)
        const price: number = req.body.price
        const type: DrugType = req.body.type

        // save a new medicine to DB
        const newMedicine = await prisma.medicine.create({
            data: {
                name,
                stock,
                exp_date,
                price,
                type
            }
        })
        return res.status(200).json({
            message: "New medicine has been created",
            data:newMedicine
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const readMedicine = async (req: Request, res: Response) => {
    try {
        //  get all medicine
        // const id: number = parseInt(req.params.id)
        // const medicine = await prisma.medicine.findUnique({
        //     where: { id }
        // })
        // if (!medicine) {
        //     return res.status(404).json({
        //         message: "Medicine not found"
        //     })
        // }
        // return res.status(200).json(medicine)
        const allmedicine = await prisma.medicine.findMany()
        res.status(200).json({
            message: "medicine has been retrived",
            data: allmedicine
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export { createMedicine, readMedicine }