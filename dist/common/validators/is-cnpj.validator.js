"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCnpjConstraint = void 0;
exports.IsCnpj = IsCnpj;
const class_validator_1 = require("class-validator");
let IsCnpjConstraint = class IsCnpjConstraint {
    validate(cnpj, args) {
        if (!cnpj) {
            return true;
        }
        const cleanedCnpj = String(cnpj).replace(/[^\d]/g, '');
        if (cleanedCnpj.length !== 14) {
            return false;
        }
        if (/^(\d)\1{13}$/.test(cleanedCnpj)) {
            return false;
        }
        let sum = 0;
        const cnpjNumbers = cleanedCnpj.split('').map(Number);
        const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < 12; i++) {
            sum += cnpjNumbers[i] * weights1[i];
        }
        let remainder = sum % 11;
        let digit1 = remainder < 2 ? 0 : 11 - remainder;
        if (cnpjNumbers[12] !== digit1) {
            return false;
        }
        sum = 0;
        const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < 13; i++) {
            sum += cnpjNumbers[i] * weights2[i];
        }
        remainder = sum % 11;
        let digit2 = remainder < 2 ? 0 : 11 - remainder;
        if (cnpjNumbers[13] !== digit2) {
            return false;
        }
        return true;
    }
    defaultMessage(args) {
        return 'CNPJ inválido.';
    }
};
exports.IsCnpjConstraint = IsCnpjConstraint;
exports.IsCnpjConstraint = IsCnpjConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsCnpjConstraint);
function IsCnpj(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCnpjConstraint,
        });
    };
}
//# sourceMappingURL=is-cnpj.validator.js.map