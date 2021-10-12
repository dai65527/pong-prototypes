import { IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  readonly email!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  readonly name!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  readonly password!: string;
}

export class SignInDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  readonly email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  readonly password!: string;
}

export class UserResponse {
  constructor(
    readonly email: string,
    readonly name: string,
    readonly intraId?: string,
  ) {}
}

// export class CreateFtUserDto {
//   @IsString()
//   @MinLength(1)
//   @MaxLength(1024)
//   readonly email!: string;

//   @IsString()
//   @MinLength(1)
//   @MaxLength(1024)
//   readonly username!: string;

//   @IsString()
//   @MinLength(1)
//   @MaxLength(128)
//   readonly password!: string;
// }
