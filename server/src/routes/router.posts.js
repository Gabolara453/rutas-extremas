import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../midleware/validate.camps.js";
import { 
  getPosts,
  get_ID_newPost,
  newPosted,
  updatePosted,
  newStructPost,
  deletePosted
} from "../controllers/controllers.posts.js";

const router = Router();

router.get("/Posts", getPosts);

router.get("/getID-post", get_ID_newPost )

router.post("/new-Post",
  [ check("id_user").not().isEmpty(),
    check("id_ct").not().isEmpty(),
    check("id_sb_ct").not().isEmpty(),
    check("titulo").not().isEmpty(),
    check("descp1").not().isEmpty(),
    check("descp2").not().isEmpty(),
    check("descp3").not().isEmpty(),
    check("descp4").not().isEmpty(),
    check("descp5").not().isEmpty(),
    check("id_dificult").not().isEmpty(),
    check("id_region").not().isEmpty(),
    check("id_comuna").not().isEmpty(),
    check("img1").not().isEmpty(),
    check("img2").not().isEmpty(),
    check("img3").not().isEmpty(),
    check("img4").not().isEmpty(),
    check("img5").not().isEmpty(),
    check("coord_x").not().isEmpty(),
    check("coord_y").not().isEmpty(),
    validarCampos
  ], newPosted
);


router.put("/update-Post",
  [ check("tittle_a").not().isEmpty(),
    check("id_user").not().isEmpty(),
    check("id_ct").not().isEmpty(),
    check("id_sb_ct").not().isEmpty(),
    check("tittle_n").not().isEmpty(),
    check("descp1").not().isEmpty(),
    check("descp2").not().isEmpty(),
    check("descp3").not().isEmpty(),
    check("descp4").not().isEmpty(),
    check("descp5").not().isEmpty(),
    check("id_dificult").not().isEmpty(),
    check("id_region").not().isEmpty(),
    check("id_comuna").not().isEmpty(),
    check("img1").not().isEmpty(),
    check("img2").not().isEmpty(),
    check("img3").not().isEmpty(),
    check("img4").not().isEmpty(),
    check("img5").not().isEmpty(),
    check("coord_x").not().isEmpty(),
    check("coord_y").not().isEmpty(),
    validarCampos
  ], updatePosted
);


router.put("/struct-Post",
  [ check("tittle").not().isEmpty(),
    check("struct_post").not().isEmpty(),
    validarCampos
  ], newStructPost
);

router.delete("/delete-Post",
  [ check("id_post").not().isEmpty(),
    check("id_user").not().isEmpty(),
    validarCampos
  ], deletePosted
);


export default router;
