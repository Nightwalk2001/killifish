import {store} from "@/libs"
import {atom}  from "recoil"

export const queryAtom = atom<string>({
    key: "query",
    default: "",
    effects: [
        ({setSelf}) => setSelf(store
            .get<Profile>("profile")
            .then(prev => prev != null ? prev.name : "")
        )
    ]
})
