import { IOracleRepository } from "../../repositories/Oracle/IOracleRepository"
import { IGetSourceClientDTO } from "./GetSourceClientDTO"

export class GetSourceClientUseCase {
  constructor(private oracleRepository: IOracleRepository) {}

  async execute(data: IGetSourceClientDTO) {
    const dados = await this.oracleRepository.getSourceClient(
      data.url,
      data.appKey
    )

    return dados
  }
}
