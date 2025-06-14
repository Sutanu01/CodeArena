import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

//dashboard ka maal pani
export function CardSkeleton() {
  return (
    <Card className="animate-pulse lg:col-span-2">
      <CardHeader className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </CardHeader>
      <CardContent className="px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center h-full space-y-2"
            >
              <div className="h-10 w-10 bg-gray-200 rounded-full" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function CFCardSkeleton() {
  return (
    <Card className="animate-pulse lg:col-span-1">
        
      <CardHeader className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-200 rounded w-1/5" />
          </div>
          <div className="h-6 w-6 bg-gray-200 rounded" />
        </div>
        {[
          "Rating",
          "Max Rating",
          "Current Rank",
          "Max Rank",
          "Problems Solved",
        ].map((_, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center"
          >
            <div className="h-3 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-200 rounded w-1/6" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function GraphSkeleton() {
  return (
    <Card className="mb-8 animate-pulse">
      <CardHeader className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-1/3" />

        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </CardHeader>

      <CardContent>
        <div className="h-64 w-full bg-gray-200 rounded" />

        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </CardContent>
    </Card>
  );
}

//leaderboard ka maal pani
export const TopThreeLoadingSkeleton = () => (
  <div className="mb-6 sm:mb-8">
    <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto">
      {[2, 1, 3].map((position, index) => (
        <div key={position} className={`flex flex-col items-center ${index === 1 ? 'order-2' : index === 0 ? 'order-1' : 'order-3'}`}>
          <div className={`bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 w-full ${index === 1 ? 'sm:p-5 border-2 border-gray-200 dark:border-gray-600' : ''}`}>
            <div className="text-center animate-pulse">
              <div className={`${index === 1 ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-6 h-6 sm:w-8 sm:h-8'} bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-1 sm:mb-2`}></div>
              <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded mb-1 sm:mb-2 w-12 mx-auto"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto"></div>
            </div>
          </div>
          <div className={`w-16 sm:w-20 ${index === 1 ? 'h-8 sm:h-12' : index === 0 ? 'h-6 sm:h-8' : 'h-4 sm:h-6'} bg-gray-300 dark:bg-gray-600 rounded-t-lg mt-1`}></div>
        </div>
      ))}
    </div>
  </div>
);

export const TableLoadingSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
    <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <h2 className="text-lg sm:text-xl font-bold flex items-center">
        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        Rankings
      </h2>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Player</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Matches</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Wins</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Win Rate</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: 10 }, (_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded-full mr-2 sm:mr-3"></div>
                  <div className="min-w-0">
                    <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 sm:w-32 mb-1"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12 sm:hidden"></div>
                  </div>
                </div>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-8"></div>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-8"></div>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-8 mr-2"></div>
                  <div className="w-8 sm:w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 sm:h-2"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
