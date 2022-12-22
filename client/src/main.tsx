import '@/assets/styles/global.css' // 全局样式

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

// React Query 客户端

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
