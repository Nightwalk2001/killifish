import {client}                  from "@/libs"
import type {Hits, SearchParams} from "meilisearch"
import {useEffect, useState}     from "react"

type Distribution = Record<string, Record<string, number>>

export const useSearch = (query?: string, options?: SearchParams, deps?: any[], immediate = true) => {

    const [data, setData]                 = useState<Hits<Tank>>(),
          [count, setCount]               = useState<number>(0),
          [distribution, setDistribution] = useState<Distribution>(),
          [time, setTime]                 = useState<number>()

    const search = async () => {
        const result = await client.search<Tank>(query, options)

        setData(result.hits)
        setCount(result.nbHits)
        setDistribution(result.facetsDistribution)
        setTime(result.processingTimeMs)
    }

    useEffect(() => {
        if (immediate) search().then()
    }, deps)

    return {data, count, distribution, time, mutate: search}
}

export const useFaceted = (facets: string[], query?: string, options?: SearchParams) =>
    useSearch(query, {facetsDistribution: facets, ...options})