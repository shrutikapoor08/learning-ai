import { BaseLanguageModelCallOptions } from "../base_language/index.js";
import { AsyncCaller, AsyncCallerCallOptions } from "./async_caller.js";
import type { GoogleVertexAIBaseLLMInput, GoogleVertexAIBasePrediction, GoogleVertexAIConnectionParams, GoogleVertexAILLMResponse, GoogleVertexAIModelParams, GoogleResponse, GoogleAbstractedClient } from "../types/googlevertexai-types.js";
export declare abstract class GoogleConnection<CallOptions extends AsyncCallerCallOptions, ResponseType extends GoogleResponse> {
    caller: AsyncCaller;
    client: GoogleAbstractedClient;
    constructor(caller: AsyncCaller, client: GoogleAbstractedClient);
    abstract buildUrl(): Promise<string>;
    abstract buildMethod(): string;
    _request(data: unknown | undefined, options: CallOptions): Promise<ResponseType>;
}
export declare abstract class GoogleVertexAIConnection<CallOptions extends AsyncCallerCallOptions, ResponseType extends GoogleResponse, AuthOptions> extends GoogleConnection<CallOptions, ResponseType> implements GoogleVertexAIConnectionParams<AuthOptions> {
    endpoint: string;
    location: string;
    apiVersion: string;
    constructor(fields: GoogleVertexAIConnectionParams<AuthOptions> | undefined, caller: AsyncCaller, client: GoogleAbstractedClient);
    buildMethod(): string;
}
export declare class GoogleVertexAILLMConnection<CallOptions extends BaseLanguageModelCallOptions, InstanceType, PredictionType extends GoogleVertexAIBasePrediction, AuthOptions> extends GoogleVertexAIConnection<CallOptions, PredictionType, AuthOptions> implements GoogleVertexAIBaseLLMInput<AuthOptions> {
    model: string;
    client: GoogleAbstractedClient;
    constructor(fields: GoogleVertexAIBaseLLMInput<AuthOptions> | undefined, caller: AsyncCaller, client: GoogleAbstractedClient);
    buildUrl(): Promise<string>;
    request(instances: InstanceType[], parameters: GoogleVertexAIModelParams, options: CallOptions): Promise<GoogleVertexAILLMResponse<PredictionType>>;
}
