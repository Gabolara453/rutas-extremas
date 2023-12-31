
import Router from 'express';
import { check } from "express-validator";
import validarCampos from "../midleware/validate.camps.js";
import { public_user_info, user_info, register, update, deleteUser } from '../controllers/controllers.users.js';


const router = Router();

router.post("/get-public-info-user",
  [ check("id").not().isEmpty()], public_user_info
);


router.post("/get-info-user",
  [ check("id_user").not().isEmpty()], user_info
);

router.post("/register", 
    [ check("id_user").not().isEmpty(),
      check("username").not().isEmpty(),
      check("displayName").not().isEmpty(),
      check("email").not().isEmpty(),
      check("edad").not().isEmpty(),
      check("fecha_naci").not().isEmpty(),
      check("photoURL").not().isEmpty(),
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
      check("edad").not().isEmpty(),
      check("fecha_naci").not().isEmpty(),
      check("PhotoURL").not().isEmpty(),
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

