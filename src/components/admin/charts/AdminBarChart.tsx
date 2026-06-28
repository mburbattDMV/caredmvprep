"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface DataPoint { name: string; value: number; color?: string }

interface Props {
  data: DataPoint[];
  color?: string;
  height?: number;
  prefix?: string;
  suffix?: string;
  formatValue?: (v: number) => string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label, prefix, suffix, formatValue }: any) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value as number;
  const display = formatValue ? formatValue(val) : `${prefix ?? ""}${val.toLocaleString()}${suffix ?? ""}`;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-gray-700">{label}</p>
      <p className="text-gray-500 mt-0.5">{display}</p>
    </div>
  );
}

export default function AdminBarChart({ data, color = "#1a7f3c", height = 200, prefix, suffix, formatValue }: Props) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center text-xs text-gray-400" style={{ height }}>
        No data yet
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={<CustomTooltip prefix={prefix} suffix={suffix} formatValue={formatValue} />}
          cursor={{ fill: "rgba(0,0,0,0.04)" }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color ?? color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
