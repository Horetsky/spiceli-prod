import { useState, useCallback } from "react"
import debounce from "lodash.debounce"

export type searchFunc<T> = (searchTerm: string) => Promise<T[]>;
export type loadingStatus = "idle" | "loading" | {
    type: "value" | "fetching",
    message: string
} 



export default function useDebounceSearch<T> (searchFunc: searchFunc<T>) {
    const [loadingStatus, setLoadingStatus] = useState<loadingStatus>("idle")
    const [searchResult, setSearchResult] = useState<T[]>([])

    const debounceRequest = debounce(async (searchTerm: string) => {
        setLoadingStatus("idle")
        if (searchTerm === "") return setSearchResult([])
        setLoadingStatus("loading")
        try {
            const result = await searchFunc(searchTerm)
            setSearchResult(result)
            if (result.length === 0) setLoadingStatus({
                type: "value",
                message: "За вашим запитом нічого не знайдено"
            })
            else setLoadingStatus("idle")
        } catch (e) {
            console.log(e);
            setSearchResult([])
            setLoadingStatus({
                type: "fetching",
                message: "Помилка мережі"
            })
        }
    }, 700)

    const handleSearch = useCallback((searchTerm: string) => debounceRequest(searchTerm), [])

    return {
        handleSearch,
        searchResult,
        loadingStatus,
        setSearchResult
    }
}