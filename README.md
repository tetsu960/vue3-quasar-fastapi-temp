# 構築手順

```bash
$ git clone https://
$ cd <プロジェクト名>
$ npm i
```

## vue

### 起動（開発時）

```bash
$ cd vue
$ npm run dev
```

### 構築

```bash
$ cd vue
$ npm run build
```

## fastapi (python)

### 起動

```bash
$ python3 main.py
```



# テンプレート作成手順

## pythonのインストール

```bash
$ mkdir vue3-quasar-fastapi-temp
$ pip install fastapi uvicorn
```

```python:main.py
#
# FastAPI サーバーのサンプルコード
#
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# FastAPIのインスタンスを作成
app = FastAPI()

class Person(BaseModel):
    name: str
    age: int

@app.get("/api/hello")
def hello(params: Person):
    return {f"message": "Hello, World! {params.name}さん！"}

# 静的ファイルを提供するための設定
app.mount("/", StaticFiles(directory="public", html=True))

# FastAPIサーバーを起動
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="debug", reload=True)
```

## vue3のインストール

```bash
$ npm create vue@latest
```

セットアップは以下の通り（例）
```
┌  Vue.js - The Progressive JavaScript Framework
│
◇  Project name (target directory):
│  vue
│
◆  Select features to include in your project: (↑/↓ to navigate, space to select, a to toggle all, enter to confirm)
│  ◼ TypeScript
│  ◻ JSX Support
│  ◼ Router (SPA development)
│  ◼ Pinia (state management)
│  ◻ Vitest (unit testing)
│  ◻ End-to-End Testing
│  ◻ ESLint (error prevention)
│  ◻ Prettier (code formatting)
```

以下を実行する
```bash
$ cd vue
$ npm install --save quasar @quasar/extras
$ npm install --save-dev @quasar/vite-plugin sass-embedded@^1.80.2
$ npm install pinia-plugin-persistedstate
```

vue/src/main.tsを以下の内容で更新する
```ts:vue/src/main.ts
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/ja'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

const pinia = createPinia()
pinia.use(createPersistedState())

app.use(pinia)
app.use(router)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    lang: quasarLang,
  })
  
app.mount('#app')
```

vue/vite.config.tsを以下の内容で更新する
```ts:vue/vite.config.ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: '../public'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws: false,
      }
    }
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vueDevTools(),
    quasar({
      sassVariables: fileURLToPath(
        new URL('./src/quasar-variables.sass', import.meta.url)
      )
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
```

vue/src/quasar-variables.sassファイルを作成する
```sass:vue/src/quasar-variables.sass
$primary   : #1976D2
$secondary : #26A69A
$accent    : #9C27B0

$dark      : #1D1D1D

$positive  : #21BA45
$negative  : #C10015
$info      : #31CCEC
$warning   : #F2C037
```

vue/src/shims.d.tsファイルを作成する
```ts:vue/src/shims.d.ts
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
```

内容によりvue/src/assets/main.cssファイルからdisplay, grid-template-columnsをコメントアウトする
```css:vue/src/assets/main.css
  #app {
    /* display: grid; */
    /* grid-template-columns: 1fr 1fr; */
    padding: 0 2rem;
  }
```