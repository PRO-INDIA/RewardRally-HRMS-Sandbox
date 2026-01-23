import { environment } from "../Environments/Environment";

class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }

    try {
      const response = await fetch(
        `${environment.baseUrl}/v1/tokens/accessToken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientId: environment.clientId,
            clientSecret: environment.clientSecret,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.status}`);
      }

      const data = await response.json();
      this.accessToken = data?.data?.access_token;
      if (!this.accessToken) {
        throw new Error("Access token not found in response");
      }

      console.log("Access token obtained successfully");
      return this.accessToken;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  }

  public clearToken(): void {
    this.accessToken = null;
  }
}

export default AuthService.getInstance();
