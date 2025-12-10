import { environment } from "../Environments/Environment";

interface SasTokenResponse {
  data: string;
  message: string;
}

class SasTokenService {
  private static instance: SasTokenService;
  private sasToken: string | null = null;
  private tokenExpiry: Date | null = null;

  private constructor() {}

  public static getInstance(): SasTokenService {
    if (!SasTokenService.instance) {
      SasTokenService.instance = new SasTokenService();
    }
    return SasTokenService.instance;
  }

  public async getSasToken(): Promise<string> {
    // If token exists and hasn't expired, return it
    if (this.sasToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.sasToken;
    }

    try {
      const response = await fetch(`${environment.baseUrl}/sasToken`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get SAS token: ${response.status}`);
      }

      const result: SasTokenResponse = await response.json();
      this.sasToken = result.data;
      
      // Set expiry time (extract from token or set a default)
      // SAS tokens typically last for hours, so we'll cache it
      this.tokenExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes cache

      console.log("SAS token obtained successfully");
      return this.sasToken;
    } catch (error) {
      console.error("Error getting SAS token:", error);
      throw error;
    }
  }

  public async getImageUrlWithSasToken(imageUrl: string): Promise<string> {
    if (!imageUrl) return imageUrl;

    try {
      const sasToken = await this.getSasToken();
      // If URL already has query parameters, append with &, otherwise with ?
      const separator = imageUrl.includes("?") ? "&" : "";
      return `${imageUrl}${separator}${sasToken}`;
    } catch (error) {
      console.error("Error appending SAS token to image URL:", error);
      return imageUrl; // Return original URL if token fetch fails
    }
  }

  public clearToken(): void {
    this.sasToken = null;
    this.tokenExpiry = null;
  }
}

export default SasTokenService.getInstance();
