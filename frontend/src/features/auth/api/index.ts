import { authLogin } from "../../../services/generated/awat";
import type { AuthLoginRequest, AuthLoginResponse } from "../../../services/generated/models";
export function login(
    credientials: AuthLoginRequest
):Promise<AuthLoginResponse>{
    return authLogin(credientials );
}
