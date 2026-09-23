import { Injectable } from '@nestjs/common';
import oracle from 'oracledb';

@Injectable()
export class HealthRepository {
    async checkDatabaseConnection(): Promise<boolean> {
        return true; // Placeholder
    }
}
