import {atom} from 'recoil'

/**
 * Atom 이름은 대문자로 할게요
 * 그래야 불러왔을때 네이밍 안꼬임
 */

export const swiperScrolling = atom({
    key: 'swiperScrolling',
    default: true
})

export const FanData = atom({
    key: 'FanData',
    default: {}
})

export const currentGoalTemp = atom({
    key: 'currentGoalTemp',
    default: 0
})

export const BmcTemperature = atom({
    key: 'BmcTemperature',
    default: 0
})