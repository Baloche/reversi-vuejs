import { BLACK, WHITE, COLORS } from './constants'

export const getOpponent = (current) => current === BLACK ? WHITE : BLACK

export const getColor = code => COLORS[code]
