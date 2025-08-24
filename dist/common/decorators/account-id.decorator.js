"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountId = void 0;
const common_1 = require("@nestjs/common");
exports.AccountId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.account_id;
});
//# sourceMappingURL=account-id.decorator.js.map