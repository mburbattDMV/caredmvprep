"use client";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

interface DataPoint { name: string; value: number }

interface Props {
  data: DataPoint[];
  color?: string;
  height?: number;
  prefix?: string;
  suffix?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label, prefix, suffix }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-gray-700">{label}</p>
      <p className="text-gray-500 mt-0.5">{prefix ?? ""}{(payload[0].value as number).toLocaleString()}{suffix ?? ""}</p>
    </div>
  );
}

export default function AdminLineChart({ data, color = "#1a7f3c", height = 200, prefix, suffix }: Props) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center text-xs text-gray-400" style={{ height }}>
        No data yet
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip prefix={prefix} suffix={suffix} />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ r: 3, fill: color, strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
