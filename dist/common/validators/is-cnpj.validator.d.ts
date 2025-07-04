import { ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator';
export declare class IsCnpjConstraint implements ValidatorConstraintInterface {
    validate(cnpj: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsCnpj(validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
