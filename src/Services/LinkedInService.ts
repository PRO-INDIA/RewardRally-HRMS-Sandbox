import { environment } from "../Environments/Environment";

interface LinkedInSearchParams {
  keyword: string;
  pageNumber?: number;
}

class LinkedInService {
  private static instance: LinkedInService;
  private readonly apiHost = "linkedin-jobs-data-api.p.rapidapi.com";

  public static getInstance(): LinkedInService {
    if (!LinkedInService.instance) {
      LinkedInService.instance = new LinkedInService();
    }
    return LinkedInService.instance;
  }

  public async searchPosts(params: LinkedInSearchParams): Promise<any> {
    const { keyword, pageNumber = 1 } = params;

    try {
      const url = `${
        environment.rapidBaseUrl
      }/posts/search?keyword=${encodeURIComponent(
        keyword
      )}&page_number=${pageNumber}&sort_type=date_posted`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": this.apiHost,
          "x-rapidapi-key": environment.rapidApiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("LinkedIn Jobs API response:", result);
      return result;
    } catch (error) {
      console.error("Error fetching LinkedIn jobs data:", error);
      throw error;
    }
  }

  public async searchRRTechXPosts(pageNumber: number = 1): Promise<any> {
    return this.searchPosts({
      keyword: "#RRTechX",
      pageNumber,
    });
  }
}

export default LinkedInService.getInstance();
