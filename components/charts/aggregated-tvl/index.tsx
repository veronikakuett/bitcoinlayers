"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CartesianGrid, XAxis, AreaChart, Area } from "recharts";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";
import { useMemo, useCallback } from "react";

interface ProcessedData {
    date: string;
    [key: string]: string | number;
}

interface ChartProps {
    title: string;
    description: string;
    data: any[] | undefined;
    itemNameKey: string; // 'infra_name' or 'layer_name'
    chartQueryParam?: string;
    rangeQueryParam?: string;
}

export default function AggregatedTVLChart({
    title,
    description,
    data,
    itemNameKey,
    chartQueryParam = "chart",
    rangeQueryParam = "range",
}: ChartProps) {
    const [chartType, setChartType] = useQueryState(chartQueryParam, {
        defaultValue: "separate",
    });
    const [dateRange, setDateRange] = useQueryState(rangeQueryParam, {
        defaultValue: "3mo",
    });

    const items =
        chartType === "combined"
            ? ["BTC"]
            : [...new Set(data?.map((item) => item[itemNameKey]) || [])];

    const processedData = useMemo(() => {
        if (!data) return [];
        return data.reduce((acc: ProcessedData[], item) => {
            const itemDateUTC = item.date;
            const existingEntry = acc.find(
                (entry) => entry.date === itemDateUTC,
            );
            const key = chartType === "combined" ? "BTC" : item[itemNameKey];
            if (existingEntry) {
                existingEntry[key] =
                    ((existingEntry[key] as number) || 0) + item.amount;
            } else {
                acc.push({ date: itemDateUTC, [key]: item.amount });
            }
            return acc;
        }, []);
    }, [data, chartType, itemNameKey]);

    const filterDataByDateRange = useCallback(
        (data: ProcessedData[]) => {
            const now = new Date();
            const startDate = new Date(
                now.setMonth(
                    now.getMonth() -
                        (dateRange === "1y" ? 12 : dateRange === "1mo" ? 1 : 3),
                ),
            );
            return data
                .filter((item) => new Date(item.date) >= startDate)
                .sort(
                    (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime(),
                );
        },
        [dateRange],
    );

    const chartConfig = useMemo(() => {
        return chartType === "combined"
            ? { BTC: { label: "BTC", color: "hsl(var(--chart-btc))" } }
            : Object.fromEntries(
                  items.map((item) => [
                      item,
                      {
                          label: item,
                          color: `hsl(var(--chart-${item.toLowerCase().replace(/\s+/g, "-")}))`,
                      },
                  ]),
              );
    }, [chartType, items]);

    return (
        <Card className="bg-background mx-6">
            <CardHeader className="flex flex-col lg:flex-row flex-wrap lg:items-center justify-between border-b mb-4">
                <div>
                    <CardTitle className="flex font-normal items-center gap-2">
                        {title}
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs flex flex-wrap">
                        {description}
                    </CardDescription>
                </div>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center lg:space-x-2 space-y-2 lg:space-y-0 pt-2 lg:pt-0">
                    <ToggleGroup
                        className="space-x-1"
                        type="single"
                        value={chartType}
                        onValueChange={(value) => {
                            if (value && value !== chartType) {
                                setChartType(value);
                            }
                        }}
                    >
                        <ToggleGroupItem
                            value="combined"
                            className="border font-normal rounded-full px-3 lg:px-4 text-xs lg:text-sm"
                            size="sm"
                        >
                            Combined
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="separate"
                            className="border rounded-full px-3 lg:px-4 text-xs lg:text-sm font-normal"
                            size="sm"
                        >
                            Separate
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <div className="block">
                        <Select value={dateRange} onValueChange={setDateRange}>
                            <SelectTrigger className="w-[140px] lg:w-[160px] rounded-full px-3 lg:px-4 text-xs lg:text-sm">
                                <SelectValue placeholder="Select date range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1mo">Last month</SelectItem>
                                <SelectItem value="3mo">
                                    Last 3 months
                                </SelectItem>
                                <SelectItem value="1y">Last year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-96 w-full">
                    <AreaChart
                        data={filterDataByDateRange(processedData)}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 20,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    timeZone: "UTC",
                                })
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                                timeZone: "UTC",
                                            },
                                        )
                                    }
                                    className="w-60"
                                    sort="desc"
                                />
                            }
                        />
                        {items.sort().map((item: string) => (
                            <Area
                                key={item}
                                name={item}
                                dataKey={item}
                                type="linear"
                                stroke={chartConfig[item]?.color}
                                fill={chartConfig[item]?.color}
                                strokeWidth={1}
                                dot={false}
                                fillOpacity={0.5}
                                stackId="1"
                            />
                        ))}
                        <ChartLegend
                            content={
                                <ChartLegendContent className="flex flex-wrap" />
                            }
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}