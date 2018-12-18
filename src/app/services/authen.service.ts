import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthenService {
    private accessKey = 'accessToken';

    setAuthenticated(accessToken: string) {
        localStorage.setItem(this.accessKey, accessToken);
    }
    getAuthenticared(): string {
        return localStorage.getItem(this.accessKey);
    }
    clearAuthenticated(): void {
        localStorage.removeItem(this.accessKey);
    }
}