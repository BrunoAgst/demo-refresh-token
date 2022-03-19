import { Request, Response } from "express"
import { RefreshTokenUseCase } from "./RefreshTokenUseCase"

class RefreshTokenController  {
    async handler(request: Request, response: Response) {
        const { refresh_token } = request.body

        const refreshTokenUseCase = new RefreshTokenUseCase()

        const token = await refreshTokenUseCase.execute(refresh_token)

        return response.json(token)
    }
}

export {RefreshTokenController }