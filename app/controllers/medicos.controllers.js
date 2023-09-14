import conectarDB from "../../config/mongo.js";
import { response } from 'express';
import { httpError} from './../helpers/handleError.js'
const Collection =  conectarDB.collection("medico");

export const getAll = async (req, res = response) => {  
  try {
    const [ total, medicos ] = await Promise.all([
      Collection.countDocuments(),
      Collection.aggregate([
        {
          $lookup: {
            from: "consultorio", // Nombre de la colección de consultorios
            localField: "med_consultorio", // Campo en la colección de médicos
            foreignField: "cons_codigo", // Campo en la colección de consultorios
            as: "med_consultorio", // Nombre del nuevo campo con la información del consultorio
          },
        },
        {
          $lookup: {
            from: "especialidad",
            localField: "med_especialidad",
            foreignField: "_id",
            as: "med_especialidad",
          },
        },
      ]).toArray(),
    ]);
    res.json({
      total,
      medicos
    });
  } catch (err) {
    httpError(res, err);
  };
};

//3. Obtener todos los médicos de una especialidad en específico (por ejemplo, ‘Cardiología’).
export const getMedicEspecific = async (req, res = response) => {  
  try {
    const { specific } = req.params;
    const regex = new RegExp( specific, 'i');
    const [ total, medicos ] = await Promise.all([
      Collection.countDocuments(),
      Collection.aggregate([
        {
          $lookup: {
            from: "consultorio", 
            localField: "med_consultorio", 
            foreignField: "cons_codigo", 
            as: "med_consultorio",
          },
        },
        {
          $lookup: {
            from: "especialidad", 
            localField: "med_especialidad",
            foreignField: "_id",
            as: "med_especialidad",
          },
        },
        {
          $match: {
            "med_especialidad.esp_nombre": regex,
          },
        },
      ]).toArray(),
    ]);
    res.json({
      total,
      medicos
    });
  } catch (err) {
    httpError(res, err);
  };
};
