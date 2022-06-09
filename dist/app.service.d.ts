import { JwtService } from '@nestjs/jwt';
export declare class AppService {
    private jwt;
    constructor(jwt: JwtService);
    getHello(): Promise<string>;
}
