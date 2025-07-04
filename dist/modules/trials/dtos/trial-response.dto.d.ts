import { Trial } from '@/entities/trial.entity';
export declare class TrialResponseDto {
    uuid: string;
    started_at: Date;
    ended_at: Date;
    constructor(partial: Partial<Trial>);
}
