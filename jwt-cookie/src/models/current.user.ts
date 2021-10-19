export class CurrentUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  discodeid?: string;
  intra_id?: string;
  twoFactorAuthenticationSecret?: string;
  isSecondFactorAuthenticated: boolean;
}
