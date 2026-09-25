import { Test, type TestingModule } from '@nestjs/testing';
import crypto from 'node:crypto';
import { Argon2PasswordHasher } from './argon2-password-hasher.service';
import { PasswordHasher } from './password-hasher';

describe('Argon2PasswordHasher', () => {
  let module: TestingModule;
  let hasher: PasswordHasher;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [{ provide: PasswordHasher, useClass: Argon2PasswordHasher }],
    }).compile();

    hasher = module.get(PasswordHasher);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    await module.close();
  });

  it('produces the expected Argon2id hash for a fixed password and salt', async () => {
    jest
      .spyOn(crypto, 'randomBytes')
      .mockImplementation(() =>
        Buffer.from('000102030405060708090a0b0c0d0e0f', 'hex'),
      );

    await expect(hasher.hash('Cinema test password')).resolves.toEqual({
      passwordHash:
        '$argon2id$v=19$m=19456,t=2,p=1$AAECAwQFBgcICQoLDA0ODw$jcC029sCs78ZIUTOoSZP6yTYhGTlvGuhTSfDDgUOuaM',
      salt: 'AAECAwQFBgcICQoLDA0ODw',
    });
  });

  it('generates different salts and hashes for the same password', async () => {
    const first = await hasher.hash('Cinema test password');
    const second = await hasher.hash('Cinema test password');

    expect(first.salt).not.toBe(second.salt);
    expect(first.passwordHash).not.toBe(second.passwordHash);
  });

  it('returns a self-contained hash and salt that fit the credential columns', async () => {
    const { passwordHash, salt } = await hasher.hash('Cinema test password');
    const parts = passwordHash.split('$');

    expect(parts).toHaveLength(6);
    expect(parts.slice(0, 4)).toEqual([
      '',
      'argon2id',
      'v=19',
      'm=19456,t=2,p=1',
    ]);
    expect(parts[4]).toBe(salt);
    expect(Buffer.from(salt, 'base64')).toHaveLength(16);
    expect(Buffer.from(parts[5], 'base64')).toHaveLength(32);
    expect(salt).toMatch(/^[A-Za-z0-9+/]{22}$/);
    expect(parts[5]).toMatch(/^[A-Za-z0-9+/]{43}$/);
    expect(Buffer.byteLength(passwordHash, 'utf8')).toBeLessThanOrEqual(255);
    expect(Buffer.byteLength(salt, 'utf8')).toBeLessThanOrEqual(100);
  });

  it('rejects the operation if salt generation fails', async () => {
    const failure = new Error('Random number generation failed');
    jest.spyOn(crypto, 'randomBytes').mockImplementation(() => {
      throw failure;
    });

    await expect(hasher.hash('Cinema test password')).rejects.toBe(failure);
  });

  it('rejects the operation if Argon2 reports an asynchronous error', async () => {
    const failure = new Error('Key derivation failed');
    jest
      .spyOn(crypto, 'argon2')
      .mockImplementation((algorithm, options, done) => {
        queueMicrotask(() => done(failure, Buffer.alloc(0)));
      });

    await expect(hasher.hash('Cinema test password')).rejects.toBe(failure);
  });

  it('rejects the operation if Argon2 throws synchronously', async () => {
    const failure = new Error('Key derivation unavailable');
    jest.spyOn(crypto, 'argon2').mockImplementation(() => {
      throw failure;
    });

    await expect(hasher.hash('Cinema test password')).rejects.toBe(failure);
  });
});
