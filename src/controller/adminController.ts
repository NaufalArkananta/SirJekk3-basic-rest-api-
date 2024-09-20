import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({errorFormat: "minimal"});

const addAdmin = async (req: Request, res: Response) => {
    try {
        const admin_name: string = req.body.admin_name
        const email: string = req.body.email
        const password: string = req.body.password

        const newAdmin = await prisma.admin.create({
            data: {
                admin_name,
                email,
                password,
            },
        })
        return res.status(200).json({
            message: `New admin has been created`,
            data: newAdmin
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const readAdmin = async(req: Request, res: Response) => {
    try {
        const allAdmin = await prisma.admin.findMany()
        return res.status(200).json({
            message: "All admins",
            data: allAdmin
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const findAdmin = async(req: Request, res: Response) =>{
    try {
        const search = req.query.search
        const admin = await prisma.admin.findMany({ where: {
            OR: [{
                admin_name: { contains: search?.toString()  ||  " " }
                }]
            } 
        })
        res.status(200).json({
            message: "admin has been retrived",
            data: admin
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateAdmin = async(req: Request, res: Response) => {
    try {
        const id = req.params.id

        const findAdmin = await prisma.admin.findFirst({where: {id: Number(id)}})

        if(!findAdmin) {
            return res.status(404).json({
                message: "Admin not found"
            })
        }

        const {admin_name, email, password} = req.body

        const updatedAdmin = await prisma.admin.update({
            where: { id: Number(id) },
            data: {
                admin_name: admin_name ?? findAdmin.admin_name,
                email: email?? findAdmin.email,
                password: password?? findAdmin.password,
            },
        })
        if(!updatedAdmin) {
            return res.status(404).json({
                message: "Admin not found"
            })
        }
        return res.status(200).json({
            message: "Admin updated",
            data: updatedAdmin
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteAdmin = async(req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const admin = await prisma.admin.findUnique({where: {id}})
        if(!admin) {
            return res.status(404).json({
                message: "Admin not found"
            })
        }
        await prisma.admin.delete({where: {id}})
        return res.status(200).json({
            message: "Admin deleted"
        })
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

export {addAdmin, findAdmin, readAdmin, deleteAdmin, updateAdmin}