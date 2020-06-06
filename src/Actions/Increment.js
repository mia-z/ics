import { INC_NUMBER } from "./ActionTypes";

export const IncrementNumber = (payload) => {
    return { type: INC_NUMBER, payload }
}

export default IncrementNumber;