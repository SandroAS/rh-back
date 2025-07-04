"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionGuard = void 0;
class SessionGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
}
exports.SessionGuard = SessionGuard;
//# sourceMappingURL=session.guard.js.map