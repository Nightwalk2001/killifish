import {get}  from "@/libs"
import {atom} from "recoil"

export const profileAtom = atom({
    key: "profile",
    default: get<Profile>("profile"),
})
