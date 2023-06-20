export interface PlainUserCompany {
  name?: string;
}

export interface PlainUser {
  name: string;

  cpf: string;

  email: string;

  password: string;

  company: PlainUserCompany;
}
