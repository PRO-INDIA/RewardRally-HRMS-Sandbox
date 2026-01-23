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
import Login from "../Components/Login/Login";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";

interface AppRoutesProps {}

const AppRoutes: FC<AppRoutesProps> = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedRoute><PersonalInfo /></ProtectedRoute>} />
    <Route path="/information/personal-info" element={<ProtectedRoute><PersonalInfo /></ProtectedRoute>} />
    <Route path="/information/competency" element={<ProtectedRoute><Compentency /></ProtectedRoute>} />
    <Route path="/information/work-history" element={<ProtectedRoute><WorkHistroy /></ProtectedRoute>} />
    <Route path="/time-sheet" element={<ProtectedRoute><TimeSheet /></ProtectedRoute>} />
    <Route path="/leaves" element={<ProtectedRoute><LeavesComponent /></ProtectedRoute>} />
    <Route path="/leaderboard" element={<ProtectedRoute><FullPageLeaderboard /></ProtectedRoute>} />
    <Route path="/reward-challenge" element={<ProtectedRoute><RewardChallenge /></ProtectedRoute>} />
    <Route path="/quiz-admin" element={<ProtectedRoute><QuizAdmin /></ProtectedRoute>} />
  </Routes>
);

export default AppRoutes;
