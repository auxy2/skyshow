
import { Router } from "express";
import userRouter from "./auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({
    message:
      "Hello from Simple Platform. Check the API specification for further guidance and next steps.",
    success: 1,
  });
});

router.use("/auth", userRouter);

export default router;
