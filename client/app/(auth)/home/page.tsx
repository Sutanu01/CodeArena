"use client";

import { OneVsOneModal } from "@/components/custom-1v1-modal";
import { CustomRoomModal } from "@/components/custom-room-modal";
import {
  CardSkeleton,
  CFCardSkeleton,
  GraphSkeleton,
} from "@/components/Loading-Skeletons";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeforcesVerificationCard } from "@/components/verification-card";
import {
  useGetUserInfo,
  useUpdateCodeforcesInfo,
} from "@/hooks/api/user-hooks";
import { USER_DATA_CACHE_KEY } from "@/lib/cache-keys";
import { getLocalCache, setLocalCache } from "@/lib/utils";
import { MoreInfoType, User } from "@/redux/reducers/schemas";
import { setCodeforcesVerified, setUserData } from "@/redux/reducers/user";
import type { RootState } from "@/redux/store";
import { useSocket } from "@/socket/socket";
import { useUser } from "@clerk/nextjs";
import {
  Calendar,
  Clock,
  Code2,
  ExternalLink,
  Plus,
  Puzzle,
  RefreshCw,
  Star,
  Swords,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

export default function HomePage() {

const {socket} =useSocket();
//HOOKs
const dispatch = useDispatch();
const { isLoaded, isSignedIn, user } = useUser();
const { UserData, isCodeforcesVerified } = useSelector(
  (state: RootState) => state.user
);
const GetUserInfo = useGetUserInfo();
const updateCfHook = useUpdateCodeforcesInfo();

//STATEs
const [isCustomRoomOpen, setIsCustomRoomOpen] = useState(false);
const [is1v1Mode, set1v1Mode] = useState(false);
const [loading, setLoading] = useState(true);
const [moreInfo, setMoreInfo] = useState<MoreInfoType>({
  winrate: 0,
  losses: 0,
  ratingData: [],
});


const calculateLastChange = (data: { rating: number }[]): string => {
  if (data.length < 1) return "N/A";
  if (data.length === 1) return String(data[0].rating);

  const last = data[data.length - 1].rating;
  const secondLast = data[data.length - 2].rating;
  const diff = last - secondLast;

  return diff > 0 ? `+${diff}` : `${diff}`;
};

const updateMoreInfo = (data: User) => {
  const winrate =
    data.total_matches === 0
      ? 0
      : Math.round((data.total_wins / data.total_matches) * 100);

  const losses = data.total_matches - data.total_wins;

  const ratingChanges =
    data.codeforces_info?.rating_changes?.map((rating, index) => ({
      rating,
      contestNumber: index,
    })) || [];

  setMoreInfo({ winrate, losses, ratingData: ratingChanges });
};

const updateUser = async (setcache:boolean) => {
  const resp = await GetUserInfo.fetchUser(user?.id || "");
  if (resp.success) {
    dispatch(setUserData(resp.data));
    updateMoreInfo(resp.data);
    dispatch(setCodeforcesVerified(!!resp.data.codeforces_info?.username));
    if(setcache) {
      setLocalCache(USER_DATA_CACHE_KEY, resp.data, 10);
    }
  } else {
    console.error("Failed to fetch user info:", resp.message);
    toast.error("Failed to fetch user info");
  }
};

const updateCodeforcesInfo = async () => {
  if (!(UserData?.codeforces_info?.username)) {
    await updateUser(false);
    setLoading(false);
    return;
  }
  const resp = await updateCfHook.update({
    userId: UserData._id as string,
    codeforcesId: UserData.codeforces_info.username,
  });
  if (resp.success) {
    await updateUser(true);
     toast.success("Data Updated Successfully");
  } else {
    console.error("Failed to update Codeforces info:", updateCfHook.result?.message);
    toast.error("Error fetching Codeforces info");
  }
};

const handleRefreshCodeforces = () => {
  if (getLocalCache<User>(USER_DATA_CACHE_KEY)) {
    toast.info("Wait a few minutes before updating again...");
    return;
  }
  updateCodeforcesInfo();
};

useEffect(() => {
  if (!isLoaded || !isSignedIn) return;
  const cached = getLocalCache<User>(USER_DATA_CACHE_KEY);
  if (cached) {
    GetUserInfo.setLoading(false);
    updateCfHook.setLoading(false);
    dispatch(setUserData(cached));
    updateMoreInfo(cached);
    dispatch(setCodeforcesVerified(!!cached.codeforces_info?.username));
  } else {
    updateCodeforcesInfo();
  }
}, [user, isLoaded, isSignedIn, isCodeforcesVerified]);

useEffect(() => {
  const isloading = GetUserInfo.loading || updateCfHook.loading;
  setLoading(isloading);
}, [GetUserInfo.loading, updateCfHook.loading]);

useEffect(() => {
  if (!socket || !UserData) return;
  const setUser = () => {
    socket.emit("setUser", UserData);
  };
  if (socket.connected) {
    setUser();
  } else {
    socket.once("connect", setUser);
  }
}, [socket, UserData]);


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <CardSkeleton />
          ) : (
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex flex-col space-y-2 mb-2">
                  <h1 className="text-3xl font-extrabold text-blue-900">
                    Welcome back,{" "}
                    <span className="text-blue-500 font-semibold text-5xl">
                      {UserData?.username
                        .slice(0, 1)
                        .toUpperCase()
                        .concat(UserData?.username.slice(1))}
                    </span>
                  </h1>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Performance Overview
                </CardTitle>
                <CardDescription>
                  Your competitive programming statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="flex flex-col items-center justify-center text-center h-full">
                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-3">
                      <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                      {UserData?.codeforces_info?.rating || "N/A"}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Current Rating
                    </p>
                    <div className="flex items-center justify-center">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs text-muted-foreground">
                        keep improving!
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center h-full">
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full mb-3">
                      <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {UserData?.total_wins}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Total Wins
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {moreInfo.winrate}% win rate
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center h-full">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-3">
                      <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {UserData?.total_matches}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Total Matches
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {moreInfo.losses} losses
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center h-full">
                    <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-3">
                      <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {UserData?.currentStreak}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Current Streak
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Personal best: {UserData?.maxStreak}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {loading ? (
            <CFCardSkeleton />
          ) : isCodeforcesVerified ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-blue-500" />
                      Codeforces Profile
                    </CardTitle>
                    <CardDescription>
                      External platform statistics
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRefreshCodeforces}
                    className="flex items-center space-x-2 bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-300 dark:hover:bg-blue-400 dark:hover:text-blue-900"
                  >
                    <RefreshCw className="h-5 w-5" />
                    <span className="text-sm font-medium">Refresh</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-blue-600 text-lg">
                      {UserData?.codeforces_info.username}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Codeforces Handle
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={`https://codeforces.com/profile/${UserData?.codeforces_info.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Rating
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-blue-500"></div>
                      <span className="font-medium text-blue-600">
                        {UserData?.codeforces_info.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Max Rating
                    </span>
                    <div className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="font-medium">
                        {UserData?.codeforces_info.maxRating}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Current Rank
                    </span>
                    <span className="font-medium">
                      {UserData?.codeforces_info.rank}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Max Rank
                    </span>
                    <span className="font-medium">
                      {UserData?.codeforces_info.maxRank}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Problems Solved
                    </span>
                    <span className="font-medium">
                      {UserData?.codeforces_info.solved_ques.length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <CodeforcesVerificationCard />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <Swords className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">1v1 Match</CardTitle>
                  <CardDescription>Find an opponent and battle</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors"
                onClick={() => set1v1Mode(true)}
              >
                Start Battle
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Custom Room</CardTitle>
                  <CardDescription>Create a private match</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors"
                onClick={() => setIsCustomRoomOpen(true)}
              >
                Create Room
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Puzzle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Daily Puzzle</CardTitle>
                  <CardDescription>Solve today's challenge</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors"
              >
                Solve Puzzle
              </Button>
            </CardContent>
          </Card>
        </div>
        {isCodeforcesVerified &&
          (loading ? (
            <GraphSkeleton />
          ) : (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Rating Progress
                </CardTitle>
                <CardDescription>
                  Your rating evolution over the last contests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={moreInfo.ratingData}
                      width={600}
                      height={300}
                      margin={{
                        top: 0,
                        right: 15,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="ratingGradient"
                          x1="1"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="opacity-30"
                      />

                      <XAxis
                        dataKey="contestNumber"
                        className="text-xs"
                        tick={{ fontSize: 12 }}
                        label={{
                          value: "Contest",
                          position: "insideBottom",
                          offset: -5,
                        }}
                        interval={4}
                      />

                      <YAxis
                        domain={["0", "dataMax + 200"]}
                        className="text-xs"
                        tick={{ fontSize: 12 }}
                        label={{
                          value: "Rating",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />

                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "14px",
                        }}
                        formatter={(value, name) => [`${value}`, "Rating"]}
                        labelFormatter={(label) => `Contest #${label}`}
                      />

                      <Area
                        type="monotone"
                        dataKey="rating"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#ratingGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t text-sm text-muted-foreground">
                  <div>
                    Peak Rating:{" "}
                    <span className="font-medium text-foreground">
                      {UserData?.codeforces_info.maxRating}
                    </span>
                  </div>
                  <div>
                    Last Rating Change:{" "}
                    <span
                      className={`font-medium ${
                        calculateLastChange(moreInfo.ratingData)[0] == "+"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {calculateLastChange(moreInfo.ratingData)}
                    </span>
                  </div>
                  <div>
                    Total Contests:{" "}
                    <span className="font-medium text-foreground">
                      {moreInfo.ratingData.length - 1}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Activity</CardTitle>
                  <CardDescription>Your coding streak</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                <div className="font-medium text-muted-foreground">S</div>
                <div className="font-medium text-muted-foreground">M</div>
                <div className="font-medium text-muted-foreground">T</div>
                <div className="font-medium text-muted-foreground">W</div>
                <div className="font-medium text-muted-foreground">T</div>
                <div className="font-medium text-muted-foreground">F</div>
                <div className="font-medium text-muted-foreground">S</div>

                {UserData?.login_data.map((activity, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${
                      activity ? "bg-green-500" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Recent Matches</CardTitle>
              <CardDescription>Your latest battles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {UserData?.match_history &&
                UserData.match_history.length > 0 ? (
                  UserData.match_history.map(
                    (
                      match: {
                        result: string;
                        opponent: string;
                        date: Date;
                      },
                      i: number
                    ) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              match.result === "Win"
                                ? "bg-green-500"
                                : match.result === "Draw"
                                ? "bg-yellow-300"
                                : "bg-red-500"
                            }`}
                          />
                          <div>
                            <div className="font-medium">{match.opponent}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(match.date).toLocaleDateString()} -{" "}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            match.result === "Win"
                              ? "bg-green-500"
                              : match.result === "Draw"
                              ? "bg-yellow-300"
                              : "bg-red-500"
                          }`}
                        >
                          {match.result}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="flex justify-center items-center py-12">
                    <span className="text-2xl font-semibold text-muted-foreground text-center">
                      No recent matches
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <OneVsOneModal isOpen={is1v1Mode} onClose={() => set1v1Mode(false)} />
      <CustomRoomModal
        isOpen={isCustomRoomOpen}
        onClose={() => setIsCustomRoomOpen(false)}
      />
    </div>
  );
}
