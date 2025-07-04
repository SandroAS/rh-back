"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchPassword = MatchPassword;
const class_validator_1 = require("class-validator");
function MatchPassword(property, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'MatchPassword',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    if ((value === undefined || value === null || value === '') &&
                        (relatedValue === undefined || relatedValue === null || relatedValue === '')) {
                        return true;
                    }
                    return value === relatedValue;
                },
                defaultMessage(args) {
                    const [relatedPropertyName] = args.constraints;
                    return `A confirmação de senha (${args.property}) não corresponde à senha (${relatedPropertyName}).`;
                },
            },
        });
    };
}
//# sourceMappingURL=match-password.validator.js.map