
## 目录结构

|- public 渲染端非打包资源
|- src 主程序目录
    |- assets 前端静态组件 
    |- common 工具仓库
    |- main 主进程
        |- conf 配置相关
        |- controller 控制器，主进程和渲染进程的桥梁 
        |- database 本地数据库
        |- decorator 装饰器
        |- window 窗口管理
    |- preload
    |- render 渲染进程
        |- ...vue相关
    |- shared 主进程和渲染进程都需要的
    |- types ts类型
