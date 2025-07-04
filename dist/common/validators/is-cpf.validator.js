"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCpfConstraint = void 0;
exports.IsCpf = IsCpf;
const class_validator_1 = require("class-validator");
let IsCpfConstraint = class IsCpfConstraint {
    validate(cpf, args) {
        if (!cpf) {
            return true;
        }
        const cleanedCpf = String(cpf).replace(/[^\d]/g, '');
        if (cleanedCpf.length !== 11) {
            return false;
        }
        if (cleanedCpf === '00000000000' ||
            cleanedCpf === '11111111111' ||
            cleanedCpf === '22222222222' ||
            cleanedCpf === '33333333333' ||
            cleanedCpf === '44444444444' ||
            cleanedCpf === '55555555555' ||
            cleanedCpf === '66666666666' ||
            cleanedCpf === '77777777777' ||
            cleanedCpf === '88888880000' ||
            cleanedCpf === '99999999999') {
            return false;
        }
        let sum = 0;
        let remainder;
        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(cleanedCpf.substring(9, 10))) {
            return false;
        }
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(cleanedCpf.substring(10, 11))) {
            return false;
        }
        return true;
    }
    defaultMessage(args) {
        return 'CPF inválido.';
    }
};
exports.IsCpfConstraint = IsCpfConstraint;
exports.IsCpfConstraint = IsCpfConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsCpfConstraint);
function IsCpf(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCpfConstraint,
        });
    };
}
//# sourceMappingURL=is-cpf.validator.js.map