export class HttpError extends Error {
    public readonly status: number;
    public readonly message: string;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }

    toJSON() {
        return {
            error: this.status,
            message: this.message
        }
    }
}