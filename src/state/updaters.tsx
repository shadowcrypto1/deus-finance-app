import ApplicationUpdater from './application/updater'
import DeiUpdater from './dei/updater'
import MulticallUpdater from './multicall/updater'
import TransactionUpdater from './transactions/updater'

export default function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <DeiUpdater />
      <MulticallUpdater />
      <TransactionUpdater />
    </>
  )
}
