import conectarDB from "../../config/mongo.js";
import { response } from 'express';
import { httpError} from './../helpers/handleError.js'
const Collection =  conectarDB.collection("usuario");

export const getAll = async (req, res = response) => {  
  try {
    const [ total, usuarios ] = await Promise.all([
      Collection.countDocuments(),
      Collection.aggregate([
        {
          $lookup: {
            from: "tipo_documento", // Nombre de la colección de consultorios
            localField: "uso_tipodoc", // Campo en la colección de médicos
            foreignField: "tipodoc_id", // Campo en la colección de consultorios
            as: "uso_tipodoc", // Nombre del nuevo campo con la información del consultorio
          },
        },
        {
          $lookup: {
            from: "genero",
            localField: "uso_genero",
            foreignField: "gen_id",
            as: "uso_genero",
          },
        },
        {
          $lookup: {
            from: "acudiente",
            localField: "uso_acudiente",
            foreignField: "acu_id",
            as: "uso_acudiente",
          },
        },
      ]).toArray(),
    ]);
    res.json({
      total,
      usuarios
    });
  } catch (err) {
    httpError(res, err);
  };
};

// 1. Obtener todos los pacientes de manera alfabética.

export const getAlphabetic = async (req , res = response ) => {
  try {
    const [ total, usuarios ] = await Promise.all([
      Collection.countDocuments(),
      Collection.aggregate([
        {
          $lookup: {
            from: "tipo_documento", 
            localField: "uso_tipodoc", 
            foreignField: "tipodoc_id", 
            as: "uso_tipodoc", 
          },
        },
        {
          $lookup: {
            from: "genero",
            localField: "uso_genero",
            foreignField: "gen_id",
            as: "uso_genero",
          },
        },
        {
          $lookup: {
            from: "acudiente",
            localField: "uso_acudiente",
            foreignField: "acu_id",
            as: "uso_acudiente",
          },
        },
      ]).sort({ usu_nombres: 1 }).toArray(),
    ]);
    res.json({
      total,
      usuarios
    });
  } catch (err) {
    httpError(res, err);
  };
}

