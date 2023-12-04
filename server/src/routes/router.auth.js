import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../midleware/validate.camps.js";
import { getCheckPublicUserExist, getCheckUserExist, login, logout, regiones, comunas, getCoordRegion, categorias, subCategorias, dificultades } from "../controllers/controllers.auth.js";

const router = Router();


router.put("/login", 
  [ check("id_user").exists(),
    check("accessToken").exists(),
    validarCampos
  ], login
);


router.put("/logout", [
    check("id_user").not().isEmpty(),
    validarCampos
  ], logout
);

router.post("/check-public-User", [
    check("id").not().isEmpty(),
    validarCampos
  ], getCheckPublicUserExist
);

router.post("/check-User", [
    check("id_usr").not().isEmpty(),
    validarCampos
  ], getCheckUserExist
);

router.get("/get-Regiones", regiones);

router.post("/get-crd-rg",[
    check("id_rg").not().isEmpty(),
    validarCampos
  ],getCoordRegion
);

router.post("/get-Comunas",[
    check("id_rg").not().isEmpty(),
    validarCampos
  ],comunas
);

router.get("/get-ctg", categorias);


router.post("/get-sbctg",[
    check("id_ct").not().isEmpty(),
    validarCampos
  ], subCategorias
);

router.post("/get-dfct",[
    check("id_ct").not().isEmpty(),
    validarCampos
  ], dificultades
);

export default router;

