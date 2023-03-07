import {atom} from 'recoil'

export const swiperScrolling = atom({
    key: 'swiperScrolling',
    default: true
})

export const currentGoalTemp = atom({
    key: 'currentGoalTemp',
    default: 0
})