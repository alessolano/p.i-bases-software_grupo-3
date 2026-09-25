import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserBaseDto } from './create-user-base.dto';

describe('CreateUserBaseDto', () => {
  const validPayload = {
    email: 'cliente@example.com',
    firstName: 'José María',
  };

  const validatePayload = (payload: Record<string, unknown>) =>
    validate(plainToInstance(CreateUserBaseDto, payload));

  it('accepts valid required fields without a second name', async () => {
    await expect(validatePayload(validPayload)).resolves.toEqual([]);
  });

  it.each([undefined, null, '', 'Lucía'])(
    'accepts an optional second name with value %p',
    async (secondName) => {
      await expect(
        validatePayload({ ...validPayload, secondName }),
      ).resolves.toEqual([]);
    },
  );

  it.each([
    ['email', undefined],
    ['email', null],
    ['firstName', undefined],
    ['firstName', null],
  ])('rejects %s when its value is %p', async (field, value) => {
    const errors = await validatePayload({ ...validPayload, [field]: value });

    expect(errors).toEqual([
      expect.objectContaining({
        property: field,
        constraints: expect.objectContaining({ isDefined: expect.any(String) }),
      }),
    ]);
  });

  it.each([
    ['email', 123],
    ['email', ['cliente@example.com']],
    ['firstName', false],
    ['firstName', ['Ana']],
    ['secondName', 123],
    ['secondName', { name: 'Ana' }],
  ])('rejects a non-string %s with value %p', async (field, value) => {
    const errors = await validatePayload({ ...validPayload, [field]: value });

    expect(errors).toEqual([
      expect.objectContaining({
        property: field,
        constraints: expect.objectContaining({ isString: expect.any(String) }),
      }),
    ]);
  });

  it.each(['', 'cliente.example.com', 'cliente@', '@example.com'])(
    'rejects an invalid email %p with a Spanish message',
    async (email) => {
      const errors = await validatePayload({ ...validPayload, email });

      expect(errors).toEqual([
        expect.objectContaining({
          property: 'email',
          constraints: {
            isEmail: 'El correo electrónico debe tener un formato válido.',
          },
        }),
      ]);
    },
  );

  it.each(['', '   ', '\t\n', '\u00a0'])(
    'rejects an empty or whitespace-only first name %p',
    async (firstName) => {
      const errors = await validatePayload({ ...validPayload, firstName });

      expect(errors).toEqual([
        expect.objectContaining({
          property: 'firstName',
          constraints: {
            matches:
              'El primer nombre no puede estar vacío ni contener solo espacios.',
          },
        }),
      ]);
    },
  );
});
