import ReactDOM from 'react-dom/client'
import { App } from './App'

const rootEl = document.getElementById('root') as HTMLElement

if (!rootEl) throw new Error('Root element #root not found')

const root = ReactDOM.createRoot(rootEl)
root.render(<App />)
