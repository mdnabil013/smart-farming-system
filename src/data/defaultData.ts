import type { Crop, FarmEdge, Field } from '@/types';

export const defaultCrops: Crop[] = [
  { name: 'Potato', season: 'Winter', soil: 'Loamy', waterLevel: 'Medium', land: 3, cost: 25000, profit: 50000, risk: 'Low', waterNeed: 1200, days: 100 },
  { name: 'Tomato', season: 'Winter', soil: 'Loamy', waterLevel: 'Medium', land: 2, cost: 18000, profit: 40000, risk: 'Medium', waterNeed: 900, days: 90 },
  { name: 'Onion', season: 'Winter', soil: 'Loamy', waterLevel: 'Medium', land: 4, cost: 22000, profit: 48000, risk: 'Low', waterNeed: 800, days: 100 },
  { name: 'Wheat', season: 'Winter', soil: 'Loamy', waterLevel: 'Low', land: 3, cost: 28000, profit: 45000, risk: 'Low', waterNeed: 700, days: 120 },
  { name: 'Mustard', season: 'Winter', soil: 'Loamy', waterLevel: 'Low', land: 2, cost: 12000, profit: 28000, risk: 'Low', waterNeed: 600, days: 90 },
  { name: 'Maize', season: 'Winter/Summer', soil: 'Loamy', waterLevel: 'Medium', land: 4, cost: 30000, profit: 62000, risk: 'Medium', waterNeed: 1800, days: 140 },
  { name: 'BoroRice', season: 'Winter/Spring', soil: 'Clay', waterLevel: 'High', land: 4, cost: 30000, profit: 62000, risk: 'Medium', waterNeed: 3500, days: 140 },
  { name: 'AmanRice', season: 'Monsoon', soil: 'Clay', waterLevel: 'High', land: 4, cost: 28000, profit: 55000, risk: 'Medium', waterNeed: 3000, days: 130 },
  { name: 'AusRice', season: 'Summer', soil: 'Clay', waterLevel: 'High', land: 4, cost: 26000, profit: 48000, risk: 'Medium', waterNeed: 2800, days: 120 },
  { name: 'Chili', season: 'Winter/Summer', soil: 'Loamy', waterLevel: 'Medium', land: 2, cost: 26000, profit: 45000, risk: 'Medium', waterNeed: 1000, days: 120 },
  { name: 'Cabbage', season: 'Winter', soil: 'Loamy', waterLevel: 'Medium', land: 2, cost: 16000, profit: 35000, risk: 'Low', waterNeed: 800, days: 90 },
  { name: 'Cauliflower', season: 'Winter', soil: 'Loamy', waterLevel: 'Medium', land: 2, cost: 17000, profit: 37000, risk: 'Low', waterNeed: 850, days: 95 },
  { name: 'Lentil', season: 'Winter', soil: 'Loamy', waterLevel: 'Low', land: 2, cost: 13000, profit: 30000, risk: 'Low', waterNeed: 650, days: 100 },
  { name: 'Eggplant', season: 'Year-round', soil: 'Loamy', waterLevel: 'Medium', land: 2, cost: 19000, profit: 39000, risk: 'Medium', waterNeed: 1000, days: 120 },
];

export const defaultLocations = ['WaterTank', 'Field-A', 'Field-B', 'Field-C'];

export const defaultEdges: FarmEdge[] = [
  { from: 0, to: 1, distance: 10 },
  { from: 0, to: 2, distance: 15 },
  { from: 1, to: 3, distance: 8 },
  { from: 2, to: 3, distance: 12 },
];

export const defaultFields: Field[] = [
  { name: 'North Field', crop: 'Potato', area: 4, moisture: 18, growthStage: 'Vegetative', condition: 7 },
  { name: 'East Field', crop: 'Tomato', area: 3, moisture: 32, growthStage: 'Flowering', condition: 8 },
  { name: 'South Field', crop: 'Wheat', area: 5, moisture: 54, growthStage: 'Maturation', condition: 9 },
  { name: 'West Field', crop: 'Mustard', area: 2, moisture: 68, growthStage: 'Seedling', condition: 8 },
];

export const seasons = ['Winter', 'Summer', 'Monsoon', 'Spring', 'Year-round'];
export const soils = ['Loamy', 'Clay', 'Sandy'];
export const waterLevels = ['Low', 'Medium', 'High'];
export const risks = ['Low', 'Medium', 'High'];

export const formatCurrency = (value: number): string => `৳${value.toLocaleString('en-IN')}`;
