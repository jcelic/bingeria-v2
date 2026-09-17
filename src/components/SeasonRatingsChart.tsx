'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export type SeasonRatingsChartProps = {
  data: {
    season: number;
    rating: number;
  }[];
};

const SeasonRatingsChart = ({ data }: SeasonRatingsChartProps) => {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="season" />
          <YAxis domain={[0, 10]} />
          <Tooltip
            formatter={(value) => [Number(value).toFixed(1), 'Rating']}
          />
          <Line dataKey="rating" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeasonRatingsChart;
