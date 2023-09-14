import conectarDB from "../../config/mongo.js";
import { response } from 'express';
import { httpError} from './../helpers/handleError.js'
const Collection =  conectarDB.collection("cita");

export const getAll = async (req, res = response) => {  
  try {
    const [ total, citas ] = await Promise.all([
      Collection.countDocuments(),
      Collection.find().toArray(),
    ]);
    res.json({
      total,
      citas
    });
  } catch (err) {
    httpError(res, err);
  };
};

//4. Encontrar la próxima cita para un paciente en específico (por ejemplo, el paciente con user_id 1).
export const getNext = async (req , res = response ) => {
  try {
    const { next } = req.params;
    const regex = new RegExp( next, 'i');
    const [ total, usuarios ] = await Promise.all([
      Collection.countDocuments(),
      Collection.aggregate([
        {
          $lookup: {
            from: "estado_cita", 
            localField: "cit_estado", 
            foreignField: "est_id", 
            as: "cit_estado", 
          },
        },
        {
          $lookup: {
            from: "medico",
            localField: "cit_medico",
            foreignField: "med_matricula",
            as: "cit_medico",
          },
        },
        {
          $lookup: {
            from: "usuario",
            localField: "cit_datoUsuario",
            foreignField: "acu_id",
            as: "cit_datoUsuario",
          },
        },
        {
          $lookup: {
            from: "tipo_documento",
            localField: "usuario.uso_tipodoc",
            foreignField: "tipodoc_id",
            as: "usuario.uso_tipodoc",
          },
        },
        {
          $lookup: {
            from: "genero",
            localField: "usuario.uso_genero",
            foreignField: "gen_id",
            as: "usuario.uso_genero",
          },
        },
        {
          $lookup: {
            from: "acudiente",
            localField: "usuario.uso_acudiente",
            foreignField: "acu_id",
            as: "usuario.uso_acudiente",
          },
        },
        {
          $match: {
            "cit_datoUsuario": regex,
          },
        },
      ]).toArray(),
    ]);
    // if (usuarios.length === 0) {
    //   return res.json({
    //     mensaje: "El paciente no tiene citas futuras.",
    //   });
    // } else{
      res.json({
        total,
        usuarios
      });
  } catch (err) {
    httpError(res, err);
  };
}

// 6. Encontrar todas las citas de un día en específico (por ejemplo, ‘2023-07-12’).
export const getDay = async (req, res = response) => {  
  try {
    const [ total, citas ] = await Promise.all([
      Collection.countDocuments(),
      Collection.find({cit_fecha: new Date("2023-09-15")}).toArray(),
    ]);
    res.json({
      total,
      citas
    });
  } catch (err) {
    httpError(res, err);
  };
};

//7 Obtener todos los médicos con sus consultorios correspondientes.
export const getRoom = async (req, res = response) => {  
  try {
    const [ total, citas ] = await Promise.all([
      Collection.countDocuments(),
      Collection.aggregate([
                  {
                    $lookup: {
                      from: 'consultorio',
                      localField: 'med_consultorio', 
                      foreignField: 'cons_codigo', 
                      as: 'cons_nombre', 
                    },
                  }
              ]).toArray(),
    ]);
    res.json({
      total,
      citas
    });
  } catch (err) {
    httpError(res, err);
  };
};


// 8. Contar el número de citas que un médico tiene en un día específico (por ejemplo, el médico con med_numMatriculaProfesional 1 en ‘2023-07-12’).
export const getCount = async (req, res = response) => {  
  try {
    const [ total, citas ] = await Promise.all([
      Collection.countDocuments(),
      Collection.find({$and: [{cit_medico: 1}, {cit_fecha: new Date("2023-09-15")}]}).toArray(),
    ]);
    res.json({
      total,
      citas
    });
  } catch (err) {
    httpError(res, err);
  };
};
