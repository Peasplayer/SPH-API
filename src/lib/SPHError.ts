export enum ErrorCode {
	CredentialsNotComplete,
	SPHRejected,
	FailedHandshake,
	NotANumber,
	SessionHasEnded,
	MinLengthForQuery
}

export default class SPHError extends Error {
	code: ErrorCode;
	constructor(code: ErrorCode, message?: string) {
		super(message ?? code.toString());
		this.name = 'SPHError';
		this.code = code;
	}
}