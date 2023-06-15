import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CompaniesService } from '../companies.service';

@Injectable()
@ValidatorConstraint({ name: 'isCompanyCnpjAlreadyInUse', async: true })
export class IsCompanyCnpjAlreadyInUse implements ValidatorConstraintInterface {
  constructor(private readonly companiesService: CompaniesService) {}

  async validate(cnpj: string) {
    const exists = await this.companiesService.findByCnpj(cnpj);
    return !exists;
  }

  defaultMessage() {
    return 'Company already exists with cnpj: $value';
  }
}
