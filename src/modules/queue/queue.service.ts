import { UpdateQueueDto } from "../../dto/queue.dto";
import { response } from "../../helper/response";
import { Res } from "../../types/fastify";
import { PolyClinicService } from "../polyclinic/polyclinic.service";
import { QueueRepository } from "./queue.repository";

export class QueueService {
  private queueRepo: QueueRepository;
  private poliClinicService: PolyClinicService;
  constructor(
    queueRepo: QueueRepository,
    poliClinicService: PolyClinicService,
  ) {
    this.queueRepo = queueRepo;
    this.poliClinicService = poliClinicService;
  }

  async getOne(res: Res, id: number) {
    const data = await this.queueRepo.fetchOne({ where: { id } });
    if (!data) response(res, "not found");
    return data;
  }

  async update(res: Res, dto: UpdateQueueDto, queueId: number) {
    const fetch = await this.queueRepo.getOne(queueId);
    if (!fetch) response(res, "not found");
    const data = await this.queueRepo.update(queueId, dto);
    await this.poliClinicService.getDetail(res, fetch.polyClinicId);
    return data;
  }
}
