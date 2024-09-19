import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

// create objek of prisma
const prisma = new PrismaClient({errorFormat: "minimal"})

type DrugType = 
    "Syrup"| "Powder"| "Tablet"

const createMedicine = async (req: Request, res: Response) => {
    try {
        const name: string = req.body.name
        const stock: number = Number(req.body.stock)
        const exp_date: Date = new Date(req.body.exp_date)
        const price: number = Number(req.body.price)
        const type: DrugType = req.body.type
        const photo: string = req.file?.filename || ``
    
    /** save a new medicine to DB  */
        const newMedicine = await prisma.medicine.create({
            data: {
                name,
                stock,
                exp_date,
                price,
                type,
                photo
            }
        })
        return res.status(200)
            .json({
                message: `New Medicine has been created`,
                data: newMedicine
        })
} catch (error) {
    return res.status(500)
        .json(error);
    }
}

const readMedicine = async (req: Request, res: Response) => {
    try {
        // get all medicine 
        const search = req.query.search
        const allmedicine = await prisma.medicine.findMany({ where: {
            OR: [{
                name: { contains: search?.toString()  ||  " " }
                }]
            } 
        })
        res.status(200).json({
            message: "medicine has been retrived",
            data: allmedicine
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateMedicine = async (req: Request, res: Response) => {
    try {
        // read "id" of medicine that sent at params(parameter url)
        const id = req.params.id
        
        // check existing medicine based on id
        const findMedicine = await prisma.medicine.findFirst({where: {id: Number(id)}})
        
        if(!findMedicine){
            return res.status(404).json({
                message: "Medicine not found"
            })
        }

        // read property of medicine from req.body
        const {name, stock, price, type, exp_date} = req.body

        // update medicine
        const saveMedicine = await prisma.medicine.update({
            where: {id: Number(id)},
            data: {
                    name: name ?? findMedicine.name,
                    stock: stock ?? findMedicine.stock,
                    price: price ?? findMedicine.price, 
                    type: type ?? findMedicine.type, 
                    exp_date: exp_date ?? findMedicine.exp_date
                }
        })

        return res.status(200).json({
            message: "Medicine has been updated",
            data: saveMedicine
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteMedicine = async(req: Request, res: Response) => {
    try {
        const id = req.params.id

        // check obat
        const findMedicine = await prisma.medicine.findFirst({where: {id: Number(id)}})
        if(!findMedicine) {
            return res.status(404).json({
                message: "Medicine not found"
            })
        }
        
        // delete medicine
        const saveMedicine = await prisma.medicine.delete({where: {id: Number(id)}})

        return res.status(200).json({
            message: "medicine has ben removed",
            data: saveMedicine
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export { createMedicine, readMedicine, updateMedicine, deleteMedicine }