---
title: "PowerShell 实用技巧整理"
date: 2017-11-26 17:07:26 +0800
---

+ 更改本机Power Shell默认的执行策略
```powershell
#获取影响当前会话的所有执行策略，并按优先顺序显示它们
 Get-ExecutionPolicy -List
 
#获取当前用户作用域的执行策略
Get-ExecutionPolicy -Scope CurrentUser

#更改你的执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

#设置某个特定作用域中的执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

#删除本地计算机的所有用户的执行策略
Set-ExecutionPolicy Undefined
```

+ 设置断点，调试，继续运行
    + *F9* 设置断点
    + *F5* 运行调试
    + *F5* 继续运行
    + *Shift-F5* 停止调试（或者在控制台中输入*Q*后，然后按*Enter*键）
    

+ 在Power Shell中启动应用程序（多种方式）
> 参考链接
> [PowerShell: Running Executables](https://social.technet.microsoft.com/wiki/contents/articles/7703.powershell-running-executables.aspx)  
