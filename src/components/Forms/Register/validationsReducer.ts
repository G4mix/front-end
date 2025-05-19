export interface PasswordValidationState {
  hasSixChar: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  hasUppercaseChar: boolean;
  hasPassword: boolean;
}

type PasswordValidationAction = {
  type: "VALIDATE";
  payload: string;
};

export function validationsReducer(
  state: PasswordValidationState,
  action: PasswordValidationAction
): PasswordValidationState {
  switch (action.type) {
    case "VALIDATE":
      const password = action.payload;

      return {
        hasPassword: password.length > 0,
        hasSixChar: password.length >= 6,
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/']/g.test(password),
        hasUppercaseChar: /[A-Z]/.test(password),
      };
    default:
      return state;
  }
}
