import { environment } from "../Environments/Environment";
import AuthService from "./AuthService";

class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async addUser(userData: any): Promise<any> {
    try {
      const token = await AuthService.getAccessToken();
      const payload = {
        ...userData,
        application: [environment.gamification.applicationId],
      };
      const response = await fetch(`${environment.baseUrl}/v1/users/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }

  public async getUserScore(userData: any): Promise<any> {
    try {
      const token = await AuthService.getAccessToken();
      const payload = {
        userId: userData.userId,
        appId: environment.gamification.applicationId,
      };
      const response = await fetch(
        `${environment.baseUrl}/leaderBoard/userScore`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }

  public async triggerUserGameAction(userData: any): Promise<any> {
    try {
      const token = await AuthService.getAccessToken();

      const userCurruentScore = await this.getUserScore({
        userId: userData.userId,
      });
      const currentPoints = userCurruentScore?.data?.score || 0;
      console.log("Current Points:", currentPoints);

      const debitPayload = {
        gameActionId: environment.gamification.linkedinAction,
        userId: userData.userId,
        correspondingUserId: "",
        correspondingUserApplicationId: "",
        point: -currentPoints,
      };

      await fetch(
        `${environment.baseUrl}/userCompletedGame/triggerGameAction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(debitPayload),
        }
      );

      const creditPayload = {
        gameActionId: environment.gamification.linkedinAction,
        userId: userData.userId,
        correspondingUserId: "",
        correspondingUserApplicationId: "",
        point: userData.point * 10,
      };

      const response = await fetch(
        `${environment.baseUrl}/userCompletedGame/triggerGameAction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(creditPayload),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error triggering user game action:", error);
      throw error;
    }
  }
}

export default UserService.getInstance();
