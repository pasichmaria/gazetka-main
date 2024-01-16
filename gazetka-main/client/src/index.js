import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import ReactDOM from 'react-dom'

import reportWebVitals from './reportWebVitals'
import App from './App'
import './index.css'
import './i18next'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={'loading ...'}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
