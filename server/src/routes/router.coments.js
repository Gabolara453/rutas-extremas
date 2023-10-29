import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../midleware/validate.camps.js";
import { newComment, updateComment, deleteComment } from "../controllers/controllers.coments.js";

const router = Router();

router.post("/new-Coment",
  [ check("id_user").not().isEmpty(),
    check("titulo_p").not().isEmpty(),
    check("titulo_c").not().isEmpty(),
    check("descp").not().isEmpty(),
    validarCampos
  ], newComment
);


router.put("/update-Coment",
  [ check("id_user").not().isEmpty(),
    check("titulo_a").not().isEmpty(),
    check("titulo_c").not().isEmpty(),
    check("descp").not().isEmpty(),
    validarCampos
  ], updateComment
);

router.delete("/delete-Coment",
  [ check("id_user").not().isEmpty(),
    check("titulo_c").not().isEmpty(),
    validarCampos
  ], deleteComment
);




export default router;
