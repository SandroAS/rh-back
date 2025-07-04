export declare abstract class BaseEntity {
    id: number;
    uuid: string;
    generateUuid(): void;
    created_at: Date;
    updated_at: Date;
}
