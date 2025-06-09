export interface OkPacket {
    affectedRows: number;
    insertId?: number;
    changedRows?: number;
    warningStatus?: number;
    fieldCount?: number;
    serverStatus?: number;
    warningCount?: number;
    message?: string;
    protocol41?: boolean;
}

export interface userAgentDetails {
    id_login: number;
    browser_name: string | undefined;
    browser_version: string | undefined;
    browser_major: string | undefined;
    engine_name: string | undefined;
    engine_version: string | undefined;
    device_type: string | undefined;
    device_vendor: string | undefined;
    device_model: string | undefined;
    os_name: string | undefined;
    os_version: string | undefined;
    user_agent_text: string | undefined;
}