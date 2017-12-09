---
title: "PowerShell 实用技巧整理"
date: 2017-11-26 17:07:26 +0800
---

#### 更改本机**Power Shell**默认的执行策略

```shell
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

#### 设置断点，调试，继续运行

+ **F9** 设置断点
+ **F5** 运行调试
+ **F5** 继续运行
+ **Shift-F5** 停止调试（或者在控制台中输入**Q**后，然后按**Enter**键）

####  在**Power Shell**中启动应用程序（多种方式）

> 参考链接
> [PowerShell: Running Executables](https://social.technet.microsoft.com/wiki/contents/articles/7703.powershell-running-executables.aspx)  

#### 查看及设置环境变量

```powershell
Get-ChildItem Env: #查看所有的环境变量
$env:Path  #查看path变量
$env:TEMP   #查看temp变量

#查看用户级环境变量
[Environment]::GetEnvironmentVariable("TestVariable","User")

#设置只对当前powershell会话有效的环境变量（当前会话有效）
$env:TestVariable = "This is a test environment variable."
#删除临时环境变量
Remove-Item Env:\TestVariable


#设置用户级环境变量（永久有效），设置系统级，把User修改为Machine即可
[Environment]::SetEnvironmentVariable("TestVariable", "Test value.", "User")
#删除用户及环境变量(删除后通过Get-ChildItem可能还会显示，需要重启电脑)
[Environment]::SetEnvironmentVariable("TestVariable",$null,"User")
```

#### 打开目录

```powershell
Invoke-Item  目录路径
#或者用别名ii
ii 目录路径
```

#### 分页查看命令帮助`out-host -paging`

```powershell
#out-host命令分页
some-cmdlet | out-host -paging

#或者用more命令分页
some-cmdlet | more
```

#### powershell 查看别名及设置别名

```powershell
#查看所有别名
Get-Alias

#给Get-ChildItem设置别名为list
PS C:\> Set-Alias -Name list -Value get-childitem
#或者不带-name和-value参数
PS C:\> Set-Alias list get-childitem

#还可以为应用程序设置别名
Set-Alias np c:\windows\notepad.exe
```

#### 静态成员操作符`::`

可以通过`::`调用`.net`类中的静态成员方法

```powershell
 [DateTime]::now
```

#### 设置powershell窗口的标题

```powershell
#之前cmd时代，设置cmd的标题方法，通过title命令，可以实现
title 标题

#powershell时代来临，设置powershell的标题方法，如下所示：
$host.UI.RawUI.WindowTitle = "New Title"
```

#### [alias在多个powershell中共享设置](https://technet.microsoft.com/en-us/library/ee176913.aspx)

在`powershell`的配置目录，新建文件夹`PSConfiguration`后，新建文件`Microsoft.PowerShell_profile.ps1`，在文件中添加类似下面的别名设置规则

```powershell
Set-Alias show Get-ChildItem
```

#### 创建目录或者文件

```powershell
#创建目录
New-Item c:\scripts\目录名称 -type directory

#创建文件
New-Item c:\scripts\new_file.txt -type file

#编辑文件
notepad 文件名

#删除文件
Remove-Item 文件名
```

