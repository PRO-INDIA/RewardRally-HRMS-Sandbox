import React, { FC, useEffect, useRef, useState } from "react";
import "./FullPageLeaderboard.scss";
import LeaderboardService from "../../Services/LeaderboardService";
import LinkedInService from "../../Services/LinkedInService";
import SasTokenService from "../../Services/SasTokenService";
import { environment } from "../../Environments/Environment";
import UserService from "../../Services/UserService";

interface LeaderboardUser {
  _id: string;
  rank: number;
  userId: string;
  userName: string;
  score: number;
  profileImageUrl?: string;
  userReward?: {
    previousReward?: {
      value: string;
      sourceImgUrl: string;
    };
  };
}

interface LeaderboardData {
  Items: LeaderboardUser[];
  TotalCount: number;
}

interface FullPageLeaderboardProps {}

const FullPageLeaderboard: FC<FullPageLeaderboardProps> = () => {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sasToken, setSasToken] = useState<string>("");
  const [linkedinPosts, setLinkedinPosts] = useState<any[]>([]);
  const hasInitialized = useRef<boolean>(false);

  useEffect(() => {
    const initializeData = async () => {
      if (hasInitialized.current) {
        return;
      }
      hasInitialized.current = true;

      try {
        setLoading(true);
        const token = await SasTokenService.getSasToken();
        setSasToken(token);
        await fetchLinkedInData();
        await fetchLeaderboardData();
      } catch (err: any) {
        setError(err.message || "Failed to initialize data");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const fetchLinkedInData = async () => {
    try {
      const response = await LinkedInService.searchPosts({
        keyword: environment.searchHashtag,
        pageNumber: 1,
      });
      const users = response.data.posts.map((post: any) => {
        const author = post.author;
        return {
          userId: author.profile_id.toString(),
          userName: author.name,
          profileImageUrl: author.image_url,
          point: post.stats?.total_reactions || 0,
        };
      });
      setLinkedinPosts(users);
      for (const user of users) {
        await userFlowCheck(user);
      }
    } catch (err: any) {
      if (err?.response?.status === 429) {
        alert("⚠️ LinkedIn API rate limit reached. Please try again later.");
      } else {
        alert(
          "⚠️ Failed to fetch LinkedIn data. Please check your API or network connection."
        );
      }
    }
  };

  const userFlowCheck = async (userData: any) => {
    try {
      const userPayload = {
        userId: userData.userId.toString(),
        userName: userData.userName,
        customAttributes: { TechXconf: ["2025"] },
        profileImageUrl: userData.profileImageUrl || "",
      };
      await UserService.addUser(userPayload);
    } catch (error) {
      console.error("Error adding user:", error);
    }
    await triggerGameAction(userData.userId, userData.point);
  };

  const triggerGameAction = async (userId: string, point: number) => {
    try {
      const gameActionData = {
        userId: userId.toString(),
        point: point,
      };
      await UserService.triggerUserGameAction(gameActionData);
    } catch (error) {
      console.error("Error triggering game action:", error);
    }
  };

  const fetchLeaderboardData = async () => {
    try {
      const result = await LeaderboardService.getUserLeaderboard();
      setData(result.data as LeaderboardData);
    } catch (err: any) {
      console.error("Error fetching leaderboard data:", err);
      setError(err.message || "Failed to fetch leaderboard data");
    }
  };

  const getRankBadgeClass = (rank: number): string => {
    if (rank === 1) return "rank-1";
    if (rank === 2) return "rank-2";
    if (rank === 3) return "rank-3";
    if (rank === 4) return "rank-4";
    if (rank === 5) return "rank-5";
    return "rank-default";
  };

  return (
    <div className="FullPageLeaderboard" data-testid="FullPageLeaderboard">
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="171"
              height="51"
              fill="none"
            >
              <path
                fill="#FCB61A"
                d="M3.08 39.545 0 46.087h11.024l3.117-6.542zm11.06-.083h11.025l3.04-6.543H17.41l3.079-6.583H9.465l-3.117 6.583h10.834zM40.599 6.584H29.916l-3.04 6.584h10.377l-3.08 6.584H23.759l3.117-6.584H15.813l-3.079 6.584h10.834l-3.079 6.584h10.834l-3.117 6.583H38.62l-3.649 7.876-15.015 5.25 13.304-.041.038-.125q.153-.042.19-.167L54.36.708V.625L54.663 0H43.639zm.342 0h9.922l-3.08 6.584H37.9zm-9.427 19.752 3.079-6.584h10.15l-3.08 6.584zm40.636 5.458.038-.041 10.263-7.876L54.815 33.92l-5.702 12.167 4.561.042L71.96 31.96v-.042zm-2.281-.291-2.47-.459 4.979-2.333 1.672.333zm-3.08 1.875-8.096 4.834-4.6-.917 9.39-4.417z"
              />
              <path
                fill="#639"
                d="m72.187 34.086-11.214 8.668.342 3.333h8.211a47 47 0 0 1 3.953 0h.19zm10.34-32.92a12 12 0 0 0-2.662-1L78.725 0h-22.01L35.01 46.087h12.354l7.108-15.293 28.282-7.209a21 21 0 0 0 2.547-2.792 13.8 13.8 0 0 0 1.825-3.25q.645-1.583.874-3.375v-3.875a18 18 0 0 0-.38-2.209q-.646-2.875-2.319-4.792-1.14-1.25-2.775-2.125m-13.952 8.877h8.82l-7.337 5.333 1.368 9.834-6.576-6.292-7.907 6.042 4.676-10.125-4.676-4.792h6.843l3.155-6.46z"
              />
              <path
                fill="#fff"
                d="M77.395 10.043h-8.819l-1.634-6.459-3.155 6.459h-6.843l4.676 4.792-4.676 10.126 7.907-6.042 6.576 6.292-1.368-9.834z"
              />
              <path
                fill="#ffffff"
                d="M108.62 6.98q0 .96-.44 1.82a5.1 5.1 0 0 1-1.18 1.52q-.76.66-1.78 1.12t-2.22.62q.3.9.72 1.86.44.94.94 1.82t1.04 1.62 1.06 1.22a1.6 1.6 0 0 1-.3.4q-.18.2-.44.36-.24.18-.52.28-.26.12-.5.12-.44 0-.84-.42t-.82-1.32q-.4-.92-.86-2.36-.44-1.46-.98-3.5h-.44q-.22 0-.34-.04a1.1 1.1 0 0 1-.3-.28q-.54 1.16-.96 2.18t-.76 1.98q-.32.94-.58 1.84-.24.88-.42 1.8a2.8 2.8 0 0 1-1.18-.58q-.5-.42-.94-1.18.08-.18.16-.34.1-.18.24-.48.14-.32.34-.8.22-.48.56-1.28.36-.8.84-1.96a399 399 0 0 0 1.2-2.82q.32-.74.54-1.3.24-.56.42-1.06a18 18 0 0 0 .32-1.02q.16-.52.32-1.18-.92.32-1.72.72-.78.38-1.3.82a2 2 0 0 1-.38-.36 5 5 0 0 1-.34-.52q-.16-.3-.28-.6t-.14-.54q.6-.4 1.46-.74a15 15 0 0 1 1.86-.58q.98-.26 2-.4t1.9-.14q2.4 0 3.72 1 1.32.98 1.32 2.7m-4.88-1.68q-.14.18-.44.72t-.7 1.3q-.38.74-.82 1.62-.42.88-.82 1.74 1.5 0 2.76-.28t2.18-.78q.92-.52 1.42-1.2.52-.7.52-1.54 0-1-.72-1.52-.72-.54-2.22-.54-.34 0-.68.04-.34.02-.72.06zm11.348 4.42q-.08 1.24-.44 2.14a4.7 4.7 0 0 1-1.04 1.56q-.66.66-1.62 1.2t-2.24 1.04q0 .12-.02.26v.26q0 .26.04.54t.14.52.28.4q.18.14.46.14.54 0 1.06-.24t.98-.58q.48-.36.88-.76.42-.42.74-.76.2.18.34.34-.9 1.2-1.98 2-1.06.78-2.02 1-1.38-.16-2.16-1-.76-.86-.76-2.06 0-.82.22-1.66.24-.86.64-1.64.42-.8.96-1.5a8.6 8.6 0 0 1 1.18-1.22 6 6 0 0 1 1.3-.82q.68-.3 1.34-.3.92.12 1.72 1.14m-1.38.66q-.54.08-1.12.44a4.9 4.9 0 0 0-1.1.96q-.5.6-.92 1.4t-.66 1.72q1.6-.8 2.66-1.96 1.06-1.18 1.14-2.56m2.486 6.8q0-.4.08-1.12.1-.72.24-1.56.16-.84.34-1.72.2-.88.4-1.58.26-.94.8-1.44.561-.52 1.38-.52.44 0 .86.14.44.14.52.36-.58.48-.94 1.2a8.6 8.6 0 0 0-.56 1.52 16 16 0 0 0-.32 1.66q-.1.84-.22 1.58.66-.88 1.24-1.58.6-.72 1.06-1.14.621-.58.84-.96a5.5 5.5 0 0 0 .38-.86l.28-.84q.18-.48.58-.88a2 2 0 0 1 .34-.02q.201 0 .42.02.24.02.44.08t.34.14.16.2q-.32.42-.6 1.32a20 20 0 0 0-.5 1.94 61 61 0 0 0-.4 2.12q-.18 1.04-.32 1.76.081-.04.36-.32.28-.28.62-.7.36-.42.74-.92.4-.5.7-.98a9 9 0 0 0 .62-1.08 7 7 0 0 0 .44-1.1q.201-.58.36-1.28.16-.72.34-1.7.12-.16.52-.26.42-.12.76-.12.3 0 .44.1a9.3 9.3 0 0 1-.38 2 8.7 8.7 0 0 1-.72 1.72q-.459.82-1.14 1.66a39 39 0 0 1-1.6 1.8q-.38.4-.84.88-.44.48-.88.9-.42.4-.8.68-.36.28-.56.28a.95.95 0 0 1-.76-.36q-.3-.36-.3-.92 0-.58.04-1 .06-.44.18-.92.12-.44.18-.74.081-.3.12-.52.06-.22.08-.38l.04-.32q-.159.08-.42.34-.26.24-.54.58-.28.32-.56.66t-.46.58q-.38.52-.66.92-.279.4-.54.76-.24.36-.48.74-.24.36-.56.78-.64-.2-.92-.6-.26-.4-.26-.98m19.416-7.26q.2 0 .46.08.28.06.5.18.219.1.36.22.16.12.16.22-.4.84-.74 1.7-.34.84-.58 1.62t-.38 1.46a7 7 0 0 0-.12 1.18q0 .56.12.94.12.36.4.52a2 2 0 0 1-.62.26q-.38.1-.68.1-1.08 0-1.08-1.48 0-1.14.76-3.12a13 13 0 0 1-.92 1.74 13 13 0 0 1-1.06 1.42q-.54.62-1.1 1.02-.54.38-1 .46-.741-.04-1.2-.7-.46-.68-.46-1.72 0-1.12.48-2.36t1.22-2.3a8.7 8.7 0 0 1 1.64-1.76q.88-.72 1.7-.76.2.06.44.24.26.18.48.42.24.24.4.5.159.24.18.42-.8.12-1.66.78-.84.66-1.54 1.6a9.3 9.3 0 0 0-1.12 1.98q-.44 1.06-.44 1.98 0 .38.28.48.58-.12 1.34-.98.76-.88 1.84-2.7.2-.36.44-.8a30 30 0 0 0 1.02-1.88q.26-.5.48-.96m2.014 7.68q.1-.58.34-1.52.26-.96.6-2.02.34-1.08.72-2.16t.74-1.94q.26-.62.46-.96.2-.36.44-.6.28.04.58.14t.58.24.5.3q.22.14.34.28-.54.64-.96 1.46-.4.82-.82 2.1 1.08-.96 1.9-1.84a14.4 14.4 0 0 0 1.56-1.96q.12-.1.42-.1.28 0 .54.1.26.08.36.24-.36.96-.36 1.9 0 .88.26 1.32-.02.12-.28.46a5 5 0 0 1-.54.64 3.27 3.27 0 0 1-1.58-1.84q-.94.66-1.6 1.3-.66.62-1.14 1.4a9 9 0 0 0-.8 1.76 26 26 0 0 0-.62 2.38 1.5 1.5 0 0 1-.44-.14 3.6 3.6 0 0 1-.5-.26 4 4 0 0 1-.44-.34.9.9 0 0 1-.26-.34m12.906-8.94q.4 0 .92.24t.92.62a15 15 0 0 0-.26-1.5 8.4 8.4 0 0 0-.44-1.48 13 13 0 0 0-.76-1.66q-.48-.9-1.2-2.06.06-.18.26-.42.22-.24.48-.44.28-.22.56-.38.3-.16.56-.2.56.62 1.06 1.56.5.92.88 2 .38 1.06.58 2.2.22 1.14.22 2.18t-.24 2.14q-.22 1.1-.64 2.16-.4 1.04-.94 1.98t-1.18 1.68a6.4 6.4 0 0 1-1.3 1.2q-.68.48-1.36.6-1.38-.16-2.12-.9-.72-.72-.72-2 0-.68.2-1.48.22-.8.56-1.58.36-.8.82-1.54.48-.76 1-1.36.54-.6 1.08-1.02t1.06-.54m-2.04 9.62q.7-.24 1.4-1.06a9.7 9.7 0 0 0 1.26-1.92q.561-1.12.9-2.38.36-1.28.36-2.46v-.42a.6.6 0 0 0-.02-.16q-.48.2-1.02.68t-1.08 1.12q-.54.62-1.02 1.36t-.86 1.48a10 10 0 0 0-.6 1.42q-.22.68-.22 1.2 0 1 .9 1.14m-39.87 13.7q0 .96-.44 1.82a5.1 5.1 0 0 1-1.18 1.52q-.76.66-1.78 1.12t-2.22.62q.3.9.72 1.86.44.94.94 1.82t1.04 1.62 1.06 1.22a1.6 1.6 0 0 1-.3.4q-.18.2-.44.36-.24.18-.52.28-.26.12-.5.12-.44 0-.84-.42t-.82-1.32q-.4-.92-.86-2.36-.44-1.46-.98-3.5h-.44q-.22 0-.34-.04a1.1 1.1 0 0 1-.3-.28q-.54 1.16-.96 2.18t-.76 1.98q-.32.94-.58 1.84-.24.88-.42 1.8a2.8 2.8 0 0 1-1.18-.58q-.5-.42-.94-1.18.08-.18.16-.34.1-.18.24-.48.14-.32.34-.8.22-.48.56-1.28.36-.8.84-1.96a399 399 0 0 0 1.2-2.82q.32-.74.54-1.3.24-.56.42-1.06.18-.52.32-1.02.16-.52.32-1.18-.92.32-1.72.72-.78.38-1.3.82a2 2 0 0 1-.38-.36 5 5 0 0 1-.34-.52q-.16-.3-.28-.6t-.14-.54q.6-.4 1.46-.74.88-.34 1.86-.58.98-.26 2-.4t1.9-.14q2.4 0 3.72 1 1.32.98 1.32 2.7m-4.88-1.68q-.14.18-.44.72t-.7 1.3q-.38.74-.82 1.62-.42.88-.82 1.74 1.5 0 2.76-.28t2.18-.78q.92-.52 1.42-1.2.52-.7.52-1.54 0-1-.72-1.52-.72-.54-2.22-.54-.34 0-.68.04-.34.02-.72.06zm11.205 4.62q.2 0 .46.08.28.06.5.18.22.1.36.22.16.12.16.22a28 28 0 0 0-.74 1.7q-.34.84-.58 1.62a16 16 0 0 0-.38 1.46 7 7 0 0 0-.12 1.18q0 .56.12.94.12.36.4.52-.24.16-.62.26a2.7 2.7 0 0 1-.68.1q-1.08 0-1.08-1.48 0-1.14.76-3.12a12.6 12.6 0 0 1-.92 1.74q-.52.8-1.06 1.42a6.4 6.4 0 0 1-1.1 1.02q-.54.38-1 .46-.74-.04-1.2-.7-.46-.68-.46-1.72 0-1.12.48-2.36t1.22-2.3a8.7 8.7 0 0 1 1.64-1.76q.88-.72 1.7-.76.2.06.44.24.261.18.48.42.24.24.4.5.16.24.18.42-.8.12-1.66.78-.84.66-1.54 1.6a9.4 9.4 0 0 0-1.12 1.98q-.44 1.06-.44 1.98 0 .38.28.48.58-.12 1.34-.98.76-.88 1.84-2.7.2-.36.44-.8.26-.44.52-.92t.5-.96q.261-.5.48-.96m2.475 6.8q0-.88.42-2.46.42-1.6 1.18-3.72 1.24-3.38 2.32-5.62 1.1-2.26 2.14-3.52.24.04.58.2.36.16.7.36.34.18.6.38.28.2.36.32a24.7 24.7 0 0 0-2.74 3.96q-1.18 2.12-2.16 4.86-.84 2.36-1.28 4.26-.44 1.88-.44 3.14v.42q0 .08.02.16a1.6 1.6 0 0 1-.48-.14q-.2-.1-.26-.24a1.2 1.2 0 0 0-.22-.3 3 3 0 0 0-.32-.28q-.18-.12-.3-.62a5.2 5.2 0 0 1-.12-1.16m4.727 0q0-.88.42-2.46.42-1.6 1.18-3.72 1.24-3.38 2.32-5.62 1.1-2.26 2.14-3.52.24.04.58.2.36.16.7.36.339.18.6.38.279.2.36.32a24.6 24.6 0 0 0-2.74 3.96q-1.18 2.12-2.16 4.86-.84 2.36-1.28 4.26-.44 1.88-.44 3.14v.42q0 .08.02.16a1.6 1.6 0 0 1-.48-.14q-.2-.1-.26-.24a1.2 1.2 0 0 0-.22-.3 3 3 0 0 0-.32-.28q-.18-.12-.3-.62a5.2 5.2 0 0 1-.12-1.16m12.266-1.82q-.46 1.46-.92 2.66t-.98 2.2q-.52 1.02-1.12 1.86-.6.86-1.32 1.62-.92.96-1.9 1.46-.98.52-1.96.52-.5 0-1-.12a4 4 0 0 1-.9-.3 3 3 0 0 1-.76-.44q-.34-.24-.48-.52 0-.24.28-.42.24.22.4.34t.32.2q.14.08.32.1.16.02.38.02 1.14 0 2.22-.68 1.1-.66 2.06-1.9.98-1.22 1.78-2.98.8-1.74 1.36-3.9-.26.4-.64.98t-.84 1.16q-.46.56-.96 1.02-.48.46-.94.62a2.7 2.7 0 0 1-.68-.14 2.7 2.7 0 0 1-.66-.3 2.6 2.6 0 0 1-.54-.48 1.45 1.45 0 0 1-.32-.64 8 8 0 0 1 .04-.92q.04-.36.14-.78.18-.76.52-1.72.36-.96.82-1.88.48-.94 1.04-1.74.58-.82 1.2-1.28.16 0 .4.04.24.02.5.1t.5.2q.24.1.42.28-.22.2-.96 1.34t-1.64 3.28q-.1.22-.24.64a35 35 0 0 0-.28.88q-.12.46-.22.9t-.1.7q0 .16.04.24.06.08.1.12.36-.06.96-.58.6-.54 1.36-1.66.48-.72.88-1.42.4-.72.78-1.44l.82-1.48q.42-.76.9-1.56.26 0 .56.06t.58.16q.28.08.48.2.22.1.32.22-.62 1.32-1.16 2.58t-.96 2.58"
              />
            </svg>
          </div>
          <div className="header-badges">
            <span className="badge-icon">🏅</span>
            <h1 className="leaderboard-title">LEADERBOARD</h1>
            <span className="badge-icon">🏅</span>
          </div>

          <div></div>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading leaderboard...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-message">⚠️ {error}</p>
          </div>
        )}

        {data?.Items && (
          <div className="leaderboard-table-wrapper">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>RANK</th>
                  <th>NAME</th>
                  <th>SCORES</th>
                  <th>BADGES</th>
                </tr>
              </thead>
              <tbody>
                {data.Items.map((user) => (
                  <tr key={user._id} className={getRankBadgeClass(user.rank)}>
                    <td className="rank-cell">
                      <div className="rank-badge">
                        <span className="rank-number">#{user.rank}</span>
                      </div>
                    </td>
                    <td className="name-cell">
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.profileImageUrl ? (
                            <img
                              src={
                                user.profileImageUrl.includes("media")
                                  ? user.profileImageUrl
                                  : `${user.profileImageUrl}${sasToken}`
                              }
                              alt={user.userName}
                            />
                          ) : (
                            <div className="avatar-placeholder">
                              {user.userName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span className="user-name">{user.userName}</span>
                      </div>
                    </td>
                    <td className="score-cell">
                      {user.score.toLocaleString()}
                    </td>
                    <td className="id-cell">
                      {user?.userReward?.previousReward?.value || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullPageLeaderboard;
