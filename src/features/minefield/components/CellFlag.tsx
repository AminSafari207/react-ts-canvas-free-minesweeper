import clsx from 'clsx'
import './styles/flag.css'
import { CellFlagProps } from './types/CellFlagTypes'

export const CellFlag = ({ isFlagged, flagAnimPhase }: CellFlagProps) => {
  if (!isFlagged && flagAnimPhase !== 'out') return null

  return (
    <div className={clsx('flagContainer', isFlagged ? 'flagVisible' : 'flagHidden')}>
      <span className="flagIcon">🚩</span>
    </div>
  )
}
