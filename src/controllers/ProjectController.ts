import type { Request, Response } from "express"
import Project from "../models/Project";

export class ProjectController {

    static createProject = async (req: Request, res: Response)=>{
        
        // const project = new Project(req.body)
        
        try {
            // await project.save();
            await Project.create(req.body);
            res.status(201).send('proyecto creado correctamente');
        } catch (error) {
            return res.status(500).json({errors:{msg:'error al crear proyecto'}});
        }
    }

    static getAllProject = async (req: Request, res: Response)=>{

        try {
            const projects = await Project.find({});
            res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json({errors:{msg:'error al obtener proyectos'}});
        }
    }

    static getProjectById = async (req: Request, res: Response)=>{

        try {
            const project = await Project.findById(req.params.id).populate('tasks');
            if( !project){
                return res.status(404).json({errors:{msg:'proyecto no encontrado'}});
            }
           
            res.status(200).json(project)

        } catch (error) {
            return res.status(500).json({errors:{msg:'error al obtener proyecto'}});
        }
    }

    static updateProject = async (req: Request, res: Response)=>{

        try {
            
            const project = await Project.findByIdAndUpdate(req.params.id, req.body);
        
            if(!project){
                return res.status(404).json({errors: {msg:'proyecto no encontrado'}});
            }

            await project.save()

            res.status(200).send('proyecto actualizado');

        } catch (error) {
            return res.status(500).json({errors:{msg:'error al actualizar proyecto'}});
        }
    }

    static deleteProject = async (req: Request, res: Response)=>{

        try {
            
            const project = await Project.findById(req.params.id);

            if(!project){
                res.status(404).json({errors: {msg:'proyecto no encontrado'}});
            }

            //validar cosas antes de eliminar
            await project.deleteOne()

            res.status(200).send('eliminado correctamente');

        } catch (error) {
            return res.status(500).json({errors:{msg:'error al eliminar proyecto'}});
        }
    }

}