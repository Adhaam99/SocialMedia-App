import {
  RxReactiveFormsModule,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';

export const validator = {
  name: [
    RxwebValidators.required(),
    RxwebValidators.minLength({ value: 3 }),
    RxwebValidators.maxLength({ value: 20 }),
  ],
  email: [RxwebValidators.required(), RxwebValidators.email()],
  password: [
    RxwebValidators.required(),
    RxwebValidators.password({
      validation: { minLength: 5, digit: true, specialCharacter: true },
    }),
  ],
  rePassword: [RxwebValidators.compare({ fieldName: 'password' })],
  confirmPassword: [RxwebValidators.compare({ fieldName: 'newPassword' })],
  dateOfBirth: [RxwebValidators.required()],
  gender: [
    RxwebValidators.required(),
    RxwebValidators.oneOf({ matchValues: ['male', 'female'] }),
  ],
};
