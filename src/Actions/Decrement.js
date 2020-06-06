import { DEC_NUMBER } from "./ActionTypes";

export const DecrementNumber = (payload) => {
    return { type: DEC_NUMBER, payload }
}

export default DecrementNumber;