import { useEffect, useMemo, useState } from 'react';
import { defaultCrops, defaultEdges, defaultFields, defaultLocations } from '@/data/defaultData';
import type { Crop, FarmEdge, Field } from '@/types';

function useStored<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] { const [value, setValue] = useState<T>(() => { const saved = localStorage.getItem(key); if (!saved) return initial; try { return JSON.parse(saved) as T; } catch { return initial; } }); useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]); return [value, setValue]; }

export function useFarmData() { const [crops, setCrops] = useStored<Crop[]>('sf-crops', defaultCrops); const [locations, setLocations] = useStored<string[]>('sf-locations', defaultLocations); const [edges, setEdges] = useStored<FarmEdge[]>('sf-edges', defaultEdges); const [fields, setFields] = useStored<Field[]>('sf-fields', defaultFields); const reset = () => { setCrops(defaultCrops); setLocations(defaultLocations); setEdges(defaultEdges); setFields(defaultFields); }; return useMemo(() => ({ crops, setCrops, locations, setLocations, edges, setEdges, fields, setFields, reset }), [crops, locations, edges, fields]); }
