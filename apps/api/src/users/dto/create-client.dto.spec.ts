import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateClientDto } from './create-client.dto';

describe('CreateClientDto', () => {
  const validPayload = {
    role: 'CLIENT',
    email: 'cliente@example.com',
    firstName: 'José',
  };

  const validatePayload = (payload: Record<string, unknown>) =>
    validate(plainToInstance(CreateClientDto, payload));

  it('accepts a client with only the required fields', async () => {
    await expect(validatePayload(validPayload)).resolves.toEqual([]);
  });

  it('accepts a client with all profile fields provided', async () => {
    await expect(
      validatePayload({
        ...validPayload,
        secondName: 'Carlos',
        firstSurname: 'Núñez',
        secondSurname: 'Solano',
        birthday: '2000-02-29',
        phoneNumber: '+506 8888-8888',
        addressId: 1,
      }),
    ).resolves.toEqual([]);
  });

  it.each([
    'secondName',
    'firstSurname',
    'secondSurname',
    'birthday',
    'phoneNumber',
    'addressId',
  ])('allows an undefined or null %s', async (field) => {
    for (const value of [undefined, null]) {
      await expect(
        validatePayload({ ...validPayload, [field]: value }),
      ).resolves.toEqual([]);
    }
  });

  it.each(['ADMIN', 'EMPLOYEE', 'SUPERADMIN', 'client', 1, undefined, null])(
    'rejects an unsupported or missing role %p',
    async (role) => {
      const errors = await validatePayload({ ...validPayload, role });

      expect(errors).toEqual([
        expect.objectContaining({
          property: 'role',
          constraints: expect.objectContaining({
            isIn: 'El rol debe ser cliente.',
          }),
        }),
      ]);
    },
  );

  it.each(['firstSurname', 'secondSurname', 'phoneNumber'])(
    'rejects non-string values for %s',
    async (field) => {
      for (const value of [123, false, [], {}]) {
        const errors = await validatePayload({
          ...validPayload,
          [field]: value,
        });

        expect(errors.map((error) => error.property)).toEqual([field]);
      }
    },
  );

  it.each(['firstSurname', 'secondSurname', 'phoneNumber'])(
    'allows an empty string for the optional %s',
    async (field) => {
      await expect(
        validatePayload({ ...validPayload, [field]: '' }),
      ).resolves.toEqual([]);
    },
  );

  it.each([
    '',
    '2023-02-29',
    '1900-02-29',
    '2024-04-31',
    '2024-13-01',
    '29/02/2000',
    '2000-2-29',
    '2000-02-29T00:00:00Z',
    '2000-02-29\n',
    20000229,
    new Date('2000-02-29T00:00:00Z'),
  ])('rejects an invalid birthday %p', async (birthday) => {
    const errors = await validatePayload({ ...validPayload, birthday });

    expect(errors.map((error) => error.property)).toEqual(['birthday']);
  });

  it.each([
    1.5,
    '1',
    false,
    NaN,
    Infinity,
    Number.MIN_SAFE_INTEGER - 1,
    Number.MAX_SAFE_INTEGER + 1,
  ])(
    'rejects a non-integer, non-numeric or unsafe address ID %p',
    async (addressId) => {
      const errors = await validatePayload({ ...validPayload, addressId });

      expect(errors.map((error) => error.property)).toEqual(['addressId']);
    },
  );

  it.each([Number.MIN_SAFE_INTEGER, 0, Number.MAX_SAFE_INTEGER])(
    'accepts the safe integer address ID %p',
    async (addressId) => {
      await expect(
        validatePayload({ ...validPayload, addressId }),
      ).resolves.toEqual([]);
    },
  );

  it.each([
    ['email', 'invalid-email'],
    ['email', null],
    ['firstName', '   '],
    ['firstName', undefined],
    ['secondName', 123],
  ])('preserves the inherited validation for %s = %p', async (field, value) => {
    const errors = await validatePayload({ ...validPayload, [field]: value });

    expect(errors.map((error) => error.property)).toEqual([field]);
  });
});
