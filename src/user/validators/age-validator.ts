import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class MinMaxAge implements ValidatorConstraintInterface {
  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  validate(date: string) {
    const age = this.getAge(date);
    if (age > 14 && age < 120) {
      return true;
    } else return false;
  }

  defaultMessage(): string {
    return 'Ages is not allowed';
  }
}
