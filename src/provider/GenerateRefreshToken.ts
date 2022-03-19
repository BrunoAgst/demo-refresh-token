import dayjs from "dayjs"
import { client } from "../prisma/client"

class GenerateRefreshToken {
    async execute(userId: string) {
        const expireIn = dayjs().add(15, "second").unix()

        const generateRefreshToken = await client.refreshToken.create({
            data: {
                userId,
                expireIn,
            }
        })

        return generateRefreshToken
    }
}

export { GenerateRefreshToken }