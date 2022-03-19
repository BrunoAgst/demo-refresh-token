import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./createUser/CreateUserController";
import { RefreshTokenController } from "./refreshTokenUser/RefreshTokenUseController";

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

router.post("/users", createUserController.handle)
router.post("/login", authenticateUserController.handler)
router.post("/refresh-token", refreshTokenController.handler)

router.get("/courses", ensureAuthenticated, (request, response) => {
    return response.json([
        { id: 1, name: "NodeJS"},
        { id: 2, name: "ReactJs"},
        { id: 3, name: "React Native"},
        { id: 4, name: "Flutter"},
        { id: 5, name: "Elixir"},
    ])
})

export { router }