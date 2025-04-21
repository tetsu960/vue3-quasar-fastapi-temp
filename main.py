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
