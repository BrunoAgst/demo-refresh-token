import { Request, Response } from 'express'
import { AuthenticateUserCase } from './AuthenticateUserCase'

class AuthenticateUserController {
    async handler(request: Request, response: Response) {
        const { username, password } = request.body

        const authenticateUserCase = new AuthenticateUserCase()

        const token = await authenticateUserCase.execute({
            username,
            password
        })

        return response.json(token)
    }
}

export { AuthenticateUserController }