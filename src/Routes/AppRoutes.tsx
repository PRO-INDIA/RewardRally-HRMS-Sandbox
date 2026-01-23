import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import PersonalInfo from "../Components/PersonalInfo/PersonalInfo";
import Compentency from "../Components/Compentency/Compentency";
import WorkHistroy from "../Components/WorkHistroy/WorkHistroy";
import TimeSheet from "../Components/TimeSheet/TimeSheet";
import LeavesComponent from "../Components/Leave/Leave";
import FullPageLeaderboard from "../Components/FullPageLeaderboard/FullPageLeaderboard";
import RewardChallenge from "../Components/RewardChallenge/RewardChallenge";
import QuizAdmin from "../Components/QuizAdmin/QuizAdmin";

interface AppRoutesProps {}

const AppRoutes: FC<AppRoutesProps> = () => (
  <Routes>
    <Route path="/" element={<PersonalInfo />} />
    <Route path="/information/personal-info" element={<PersonalInfo />} />
    <Route path="/information/competency" element={<Compentency />} />
    <Route path="/information/work-history" element={<WorkHistroy />} />
    <Route path="/time-sheet" element={<TimeSheet />} />
    <Route path="/leaves" element={<LeavesComponent />} />
    <Route path="/leaderboard" element={<FullPageLeaderboard />} />
    <Route path="/reward-challenge" element={<RewardChallenge />} />
    <Route path="/quiz-admin" element={<QuizAdmin />} />
  </Routes>
);

export default AppRoutes;
