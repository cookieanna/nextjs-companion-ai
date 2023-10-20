import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
    const [debounceValue, setDebounceValue] = useState<T>(value);
    useEffect(() => {
        const timmer = setTimeout(() => setDebounceValue(value), delay || 500)
        return () => {
            clearTimeout(timmer)
        }
    }, [value, delay])
  return debounceValue
}