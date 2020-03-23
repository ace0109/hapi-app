const Hapi = require('hapi')
require('env2')('./.env')
const config = require('./config')
const routesHelloHapi = require('./routes/hello-hapi')
const shops = require('./routes/shops')
const orders = require('./routes/orders')
// 引入自定义的 hapi-swagger 插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger')
const pluginHapiPagination = require('./plugins/hapi-pagination')

const server = new Hapi.Server()
// 配置服务器启动 host 与端口
server.connection({
  port: config.port,
  host: config.host
})

const init = async () => {
  await server.register([
    // 为系统使用 hapi-swagger
    ...pluginHapiSwagger,
    pluginHapiPagination
  ])
  server.route([...routesHelloHapi, ...shops, ...orders])
  // 启动服务
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()
