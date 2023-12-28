# 使用須知

1. 執行 docker-compose up.

2. npm run migrate

3. 手動在swagger內 新增一個 admin，取得access_token

4. 把取得的access_token 輸入 seed.ts 中 的AUTH_HEADER  
   const AUTH_HEADER = {
   Authorization:
   'Bearer`<your_access_token>`,
   }

5. npm run seed
