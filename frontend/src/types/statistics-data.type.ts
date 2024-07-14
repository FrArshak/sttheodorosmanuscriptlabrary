export type StatisticsDataType = {
  success: number,
  type: string,
  visitors: {
  x: string[],
  y: number[]
},
  visitorsCount: number,
  pageReloads: {
  x: string[]
    y: number[]
},
  pageReloadsCount: number
}
export type ChartDataLocal = { x: string[], y: {visitors: number[], reloads: number[]}}
