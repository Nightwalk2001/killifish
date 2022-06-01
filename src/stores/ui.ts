import {atom} from "recoil"

export const showTopAtom = atom<boolean>({
    key: "show-top",
    default: false
})
