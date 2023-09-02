// 引入Express框架和MySQL模块
const express = require('express');
const mysql = require('mysql');

// 创建Express应用
const app = express();

// 创建MySQL数据库连接
const db = mysql.createConnection({
  url: process.env.MYSQL_URL,         // 从环境变量中获取数据库主机地址
  database: process.env.MYSQLDATABASE,     // 从环境变量中获取数据库名称
  host: process.env.MYSQL_HOST,         // 从环境变量中获取数据库主机地址
  password: process.env.MYSQLPASSWORD, // 从环境变量中获取数据库密码
  password: process.env.MYSQLPROT, // 从环境变量中获取数据库密码
  user: process.env.MYSQLUSER,         // 从环境变量中获取数据库用户名
});

// 尝试连接到数据库
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + db.threadId);
});

// 创建一个HTTP GET路由，处理根路径请求
app.get('/', (req, res) => {
  // 查询数据库中的数据
  db.query('SELECT * FROM gpt_users', (err, results) => {
    if (err) {
      // 如果查询出错，返回HTTP 500错误
      res.status(500).send('Error retrieving data');
      return;
    }
    // 如果查询成功，将结果以JSON格式发送给客户端
    res.json(results);
  });
});

// 监听指定端口，开始服务器
const PORT = process.env.PORT || 3000; // 从环境变量中获取端口号，如果没有指定，则使用默认值3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

