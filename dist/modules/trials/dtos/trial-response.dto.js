"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrialResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
class TrialResponseDto {
    constructor(partial) {
        this.uuid = partial.uuid;
        this.started_at = partial.started_at;
        this.ended_at = partial.ended_at;
    }
}
exports.TrialResponseDto = TrialResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TrialResponseDto.prototype, "uuid", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'started_at' }),
    __metadata("design:type", Date)
], TrialResponseDto.prototype, "started_at", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'ended_at' }),
    __metadata("design:type", Date)
], TrialResponseDto.prototype, "ended_at", void 0);
//# sourceMappingURL=trial-response.dto.js.map