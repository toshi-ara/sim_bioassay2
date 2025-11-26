import {
    Chart as ChartJS,
    ScatterController,
    PointElement,
    LineController,
    LineElement,
    LinearScale,
} from "chart.js"
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
    ScatterController,
    PointElement,
    LineController,
    LineElement,
    LinearScale,
    annotationPlugin
);

interface Point {
  x: number;
  y: number;
}


export function plotCurve(
    context: CanvasRenderingContext2D,
    dataPointX: number[],
    dataPointY: number[],
    dataCurve: {x: number, y: number}[],
    logD50: number): ChartJS {

    const n = dataPointX.length;
    const xmin = Math.min(...dataPointX);
    const xmax = Math.max(...dataPointX);
    const diff = xmax - xmin;

    // setting data (points)
    const dataPoints: Point[] = [];
    for (let i = 0; i < n; i++) {
        dataPoints.push({ x: dataPointX[i], y: dataPointY[i] });
    }

    // setting data (fitted curve)
    const data = {
        datasets: [
            {
                label: "points",
                showLine: false,
                pointStyle: "circle" as const,
                radius: 4,
                clip: 10,
                backgroundColor: "darkblue" as const,
                data: dataPoints,
            },
            {
                label: "fitted curve",
                showLine: true,
                borderColor: "darkblue" as const,
                pointRadius: 0,
                data: dataCurve
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: "linear" as const,
                min: xmin,
                max: xmax,
                title: {
                    display: true,
                    text: "Dose (mg/kg)",
                    color: "black",
                    font: {
                        size: 21
                    },
                },
                ticks: {
                    min: xmin,
                    max: xmax,
                    stepSize: diff / (n - 1),
                    color: "black",
                    font: {
                        size: 16
                    },
                    callback: function(value: any) {
                        return Math.exp(value).toFixed(1);
                    },
                },
                grid: {
                    drawTicks: false
                },
            },
            y: {
                type: "linear" as const,
                min: 0,
                max: 1,
                title: {
                    display: true,
                    text: "Response rate (%)",
                    color: "black",
                    font: {
                        size: 21,
                    },
                },
                ticks: {
                    color: "black",
                    font: {
                        size: 16,
                    },
                    callback: function(value: any) {
                        return value * 100;
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            annotation: {
                annotations: [
                    {
                        id: "hline",
                        type: "line" as const,
                        xMin: xmin,
                        xMax: logD50,
                        yMin: 0.5,
                        yMax: 0.5,
                        xScaleID: "x",
                        yScaleID: "y",
                        borderColor: "gray",
                        borderWidth: 2
                    },
                    {
                        id: "vline",
                        type: "line" as const,
                        xMin: logD50,
                        xMax: logD50,
                        yMin: 0.5,
                        yMax: 0,
                        xScaleID: "x",
                        yScaleID: "y",
                        borderColor: "gray",
                        borderWidth: 2,
                        label: {
                            display: true,
                            borderColor: "gray",
                            borderWidth: 2,
                            borderRadius: 0,
                            backgroundColor: "white",
                            color: "black",
                            content: Math.exp(logD50).toFixed(1),
                            font: {
                                size: 18,
                                weight: "bold"
                            }
                        }
                    }
                ]
            }
        },
        animation: false as const,
    };

    context.canvas.width = 500;
    context.canvas.height = 350;
    const chart = new ChartJS(context, {
            type: "scatter",
            data: data,
            options: options as any
        });
    return chart;
}
