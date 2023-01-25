import { IOracleRepository } from "../../repositories/Oracle/IOracleRepository"
import { IGetSourceClientAdmintDTO } from "./GetSourceClientAdminDTO"

export class GetSourceClientAdminUseCase {
  constructor(private oracleRepository: IOracleRepository) {}

  async execute(data: IGetSourceClientAdmintDTO) {
    const dados = await this.oracleRepository.getSourceClientAdmin(
      data.url,
      data.email,
      data.password,
      data.totp_code
    )

    return dados
  }
}
