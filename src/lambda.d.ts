

interface AwsLambdaClientContextClientInfo {
    installation_id: string;
    app_title: string;
    app_version_name: string;
    app_version_code: string;
    app_package_name: string;
}
interface AwsLambdaClientContextEnvInfo {
    platform_version: string;
    platform: string;
    make: string;
    model: string;
    locale: string;
}
interface AwsLambdaClientContext {
    client: AwsLambdaClientContextClientInfo;
    Custom: any | null;
    env: AwsLambdaClientContextEnvInfo;
}
interface AwsLambdaContext {
    callbackWaitsForEmptyEventLoop: boolean;
    functionName: string;
    functionVersion: string;
    invokedFunctionArn: string;
    memoryLimitInMB: number;
    awsRequestId: string;
    logGroupName: string;
    logStreamName: string;
    identity: string | null;
    clientContext: AwsLambdaClientContext | null;
}
type AwsLambda = (event: any, context: AwsLambdaContext, callback: (error: any | null, result: any | null) => void) => void;

