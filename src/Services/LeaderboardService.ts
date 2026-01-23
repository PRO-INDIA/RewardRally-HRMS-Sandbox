import { environment } from "../Environments/Environment";
import AuthService from "./AuthService";

interface LeaderboardPayload {
  userId: string;
  appId: string;
}

interface LeaderboardResponse {
  [key: string]: any;
}

class LeaderboardService {
  private static instance: LeaderboardService;

  private constructor() {}

  public static getInstance(): LeaderboardService {
    if (!LeaderboardService.instance) {
      LeaderboardService.instance = new LeaderboardService();
    }
    return LeaderboardService.instance;
  }

  public async getUserLeaderboard(): Promise<LeaderboardResponse> {
    try {
      // Get access token first
      const token = await AuthService.getAccessToken();

      const payload: LeaderboardPayload = {
        userId: environment.gamification.userId,
        appId: environment.gamification.applicationId,
      };

      const response = await fetch(
        `${environment.baseUrl}/leaderBoard/userLeaderBoard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch leaderboard: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      throw error;
    }
  }
}

export default LeaderboardService.getInstance();
