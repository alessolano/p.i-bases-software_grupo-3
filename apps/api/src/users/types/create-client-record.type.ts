import type { PasswordHashResult } from '../../common/security/password-hasher';
import type { CreateClientDto } from '../dto/create-client.dto';

export type CreateClientRecord = Omit<CreateClientDto, 'role'> &
  PasswordHashResult;
