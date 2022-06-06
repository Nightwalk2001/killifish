import {client}                  from "@/libs"
import type {Hits, SearchParams} from "meilisearch"
import {useEffect, useState}     from "react"

type Distribution = Record<string, Record<string, number>>

export const useSearch = (query?: string, options?: SearchParams, deps?: any[]) => {

    const [data, setData]                 = useState<Hits<Tank>>(),
          [count, setCount]               = useState<number>(0),
          [distribution, setDistribution] = useState<Distribution>()

    const search = async () => {
        const {
                  hits,
                  nbHits,
                  facetsDistribution,
                  processingTimeMs
              } = await client.search<Tank>(query, options)

        setData(hits)
        setCount(nbHits)
        setDistribution(facetsDistribution)
    }

    useEffect(() => {
        search().then()
    }, deps)

    return {data, count, distribution, mutate: search}
}

export const useFaceted = (facets: string[], query?: string, options?: SearchParams, deps?: any[]) =>
    useSearch(query, {facetsDistribution: facets, ...options}, deps)
