import {client}                  from "@/libs"
import type {Hits, SearchParams} from "meilisearch"
import {useEffect, useState}     from "react"

type Distribution = Record<string, Record<string, number>>

export const useFindOne = (id: string = "", deps?: any[]) => {
    const [data, setData] = useState<Tank>()

    const search = async () => {
        const tank = await client.getDocument(id)

        setData(tank)
    }

    useEffect(() => {
        search().then()
    }, deps)

    return {data}
}

export const useSearch = (query?: string, options?: SearchParams, deps?: any[]) => {
    const [data, setData]                 = useState<Hits<Tank>>(),
          [count, setCount]               = useState<number>(0),
          [distribution, setDistribution] = useState<Distribution>()

    const search = async () => {
        const {
                  hits,
                  nbHits,
                  facetsDistribution
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

export const updateTank = (tank: Tank) => client.updateDocuments([tank])

export const updateTanks = (tanks: Tank[]) => client.updateDocuments(tanks)

export const releaseTank = (tank: Tank) => client.updateDocuments([tank])

export const releaseTanks = (tanks: Tank[]) => client.updateDocuments(tanks)

export const bindTank = (tank: Tank) => client.updateDocuments([tank])

export const bindTanks = (tanks: Tank[]) => client.updateDocuments(tanks)

export const deleteTank = (id: string) => client.deleteDocument(id)

export const deleteTanks = (ids: string[]) => client.deleteDocuments(ids)
