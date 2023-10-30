
import Router from 'express';
import { check } from "express-validator";
import validarCampos from "../midleware/validate.camps.js";
import { user_info, register, update, deleteUser } from '../controllers/controllers.users.js';


const router = Router();

router.post("/get-info-user",
  [ check("id_user").not().isEmpty()], user_info
);

router.post("/register", 
    [ check("id_user").not().isEmpty(),
      check("username").not().isEmpty(),
      check("displayName").not().isEmpty(),
      check("email").not().isEmpty(),
      check("fecha_naci").not().isEmpty(),
      check("region").not().isEmpty(),
      check("comuna").not().isEmpty(),
      check("accessToken").not().isEmpty(),
      validarCampos
    ],
    register
);

router.put("/update", 
    [ check("id_user").not().isEmpty(),
      check("username").not().isEmpty(),
      check("displayName").not().isEmpty(),
      check("fecha_naci").not().isEmpty(),
      check("region").not().isEmpty(),
      check("comuna").not().isEmpty(),
      validarCampos
    ], update
);

router.delete("/delete",
    [ check("id_user").not().isEmpty(),
      validarCampos
    ], deleteUser
);


// router.update('/users');
// router.delete('/:id');

export default router;

