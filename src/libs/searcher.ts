import {MEILI_API_KEY, MEILI_URL} from "./constant"
import {MeiliSearch}              from "meilisearch"

const client = new MeiliSearch({
    host: MEILI_URL,
    apiKey: MEILI_API_KEY
})
    .index<Tank>("tanks")


export {client}
