# vsr

Very simple request - Make simple request in Node.js

### Dependencies
none

### Compatibilities

Node: `>= 8`

### Interface 

```ts

declare module vsr {
  type Response = {
    data?: any,
    res: http.ServerResponse
  }
  
  export function get(url:string, obj?:any, headers?: { [key:string]: string }): Promise<Response, Error>
  export function post(url:string, obj?:any, headers?: { [key:string]: string }): Promise<Response, Error>
  export function put(url:string, obj?:any, headers?: { [key:string]: string }): Promise<Response, Error>
  export function delete(url:string, obj?:any, headers?: { [key:string]: string }): Promise<Response, Error>
  export function patch(url:string, obj?:any, headers?: { [key:string]: string }): Promise<Response, Error>
}

```

### Example
```js
const { post } = require('vsr')

const { res, data } = await post(
  'https://exemple.com',
  JSON.stringify({ yolo: 'You only live once' }),
  { Accept: 'application/json' }
)

if (res.statusCode === 200) console.log('😎')
console.log(data)

```
