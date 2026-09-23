import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  findAll() {
    return `This action returns all health`;
  }
}
