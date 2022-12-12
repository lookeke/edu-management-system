import '@/assets/styles/global.css' // 全局样式

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store' // Redux ToolKit全局仓库位置

// React Query 客户端


ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
.render(
	<React.StrictMode>
			<Provider store={ store }>
				<App />
			</Provider>
	</React.StrictMode>,
)
