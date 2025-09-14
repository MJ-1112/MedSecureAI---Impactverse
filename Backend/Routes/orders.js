import express from "express";
import { createOrder, getOrders } from "../Controllers/OrderController.js";
import auth from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getOrders);

export default router;
