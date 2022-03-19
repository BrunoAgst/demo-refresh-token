import { client } from "../../prisma/client"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"
import dayjs from "dayjs"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"

class RefreshTokenUseCase  {
    async execute(refresh_token: string) {
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_token
            }
        })

        if(!refreshToken) {
            throw new Error("Refresh Token Invalid")
        }

        const generateTokenProvider = new GenerateTokenProvider()
        const token = await generateTokenProvider.execute(refreshToken.userId)

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expireIn))

        if(refreshTokenExpired) {

            await client.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            })
            const generateRefreshTokenProvider = new GenerateRefreshToken()
            const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId)

            return { token, refreshToken: newRefreshToken }
        }

        return { token }
    }
}

export {RefreshTokenUseCase }