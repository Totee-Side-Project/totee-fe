import {atom, selector} from "recoil";

export const counterState = atom({
    key: 'counterState',
    default: 0
});
 
export const counterLabelSelector = selector({
    key: 'counterLabelSelector',
    get: ({ get }) => {
        const counter = get(counterState);
        return `현재 카운터는 ${counter} 입니다.`;
    }
});