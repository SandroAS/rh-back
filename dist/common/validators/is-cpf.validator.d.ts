import { ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator';
export declare class IsCpfConstraint implements ValidatorConstraintInterface {
    validate(cpf: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsCpf(validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
