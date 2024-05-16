import { Router } from "express";
import participantRouter from "./participants";
import competitionRouter from "./competitions";
const router = Router();

router.use("/participants", participantRouter);
router.use("/competitions", competitionRouter);

export default router;
