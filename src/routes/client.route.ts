import { Router } from "express";
import clientService from "../services/client.service";

const router = Router();

router.get("/admin", clientService.adminLoadClients);
router.get("/admin/:clientId",  clientService.adminLoadClientInfo);
router.post("/admin",  clientService.adminAddClient);
router.put("/admin",  clientService.adminUpdateClient);
router.delete("/admin/:clientId", clientService.adminDeleteClient);

export default router;
