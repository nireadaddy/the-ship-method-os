/** Mock data for the Analytics Dashboard live demo (app/demo/dashboard). */

export type Range = "7d" | "30d" | "90d";

export const ranges: Range[] = ["7d", "30d", "90d"];

export type RangeData = {
  metrics: { label: string; value: string; delta: number }[];
  /** Bars for the trend chart — label + value. */
  series: { label: string; value: number }[];
  topPages: { path: string; views: number; conv: string }[];
};

export const dataByRange: Record<Range, RangeData> = {
  "7d": {
    metrics: [
      { label: "Visitors", value: "8,240", delta: 12 },
      { label: "Signups", value: "412", delta: 8 },
      { label: "Revenue", value: "$14.2k", delta: -3 },
    ],
    series: [
      { label: "Mon", value: 980 }, { label: "Tue", value: 1240 }, { label: "Wed", value: 1100 },
      { label: "Thu", value: 1480 }, { label: "Fri", value: 1320 }, { label: "Sat", value: 760 },
      { label: "Sun", value: 1360 },
    ],
    topPages: [
      { path: "/", views: 3120, conv: "4.8%" },
      { path: "/pricing", views: 1840, conv: "9.1%" },
      { path: "/blog/launch", views: 1290, conv: "2.2%" },
    ],
  },
  "30d": {
    metrics: [
      { label: "Visitors", value: "34,910", delta: 18 },
      { label: "Signups", value: "1,806", delta: 14 },
      { label: "Revenue", value: "$61.7k", delta: 9 },
    ],
    series: [
      { label: "W1", value: 7200 }, { label: "W2", value: 8400 },
      { label: "W3", value: 9100 }, { label: "W4", value: 10210 },
    ],
    topPages: [
      { path: "/", views: 12840, conv: "5.1%" },
      { path: "/pricing", views: 7320, conv: "8.7%" },
      { path: "/features", views: 4980, conv: "3.4%" },
    ],
  },
  "90d": {
    metrics: [
      { label: "Visitors", value: "112,300", delta: 22 },
      { label: "Signups", value: "5,940", delta: 19 },
      { label: "Revenue", value: "$203k", delta: 15 },
    ],
    series: [
      { label: "Apr", value: 31200 }, { label: "May", value: 38400 }, { label: "Jun", value: 42700 },
    ],
    topPages: [
      { path: "/", views: 41200, conv: "5.4%" },
      { path: "/pricing", views: 22800, conv: "8.2%" },
      { path: "/docs", views: 15600, conv: "1.9%" },
    ],
  },
};
