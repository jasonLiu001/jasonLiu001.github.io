---
layout: post
title:  "centos中改变Nginx默认web目录permission denied(403)"
date:   2017-11-09 14:22:30 +0800
---
centos中改变Nginx默认web目录错误解决
========

### 改变`nginx`默认目录时，需要执行以下命令

```shell
chcon -R -u system_u /网站目录/
chcon -R -t usr_t /网站目录/
```

说明： `CentOS`默认开启了`SELinux`（比文件类型更强的安全防护），可通过`getenforce`命令来查看，如果输出`Enforcing`表示安全防护中，如果你只是开发环境，你大可以直接关闭`selinux`，通过执行 `setenforce Permissive` 命令，使`selinux`保持宽容状态，正式生产环境不建议这么做，还是老实的通过`chcon`命令来修改安全上下文吧

### `CentOS`中的`nginx`配置时的其他问题

+ 使用`telnet`检测80端口时，提示：`Unable to connect to remote host: No route to host`

解决方法：将80端口添加到`firewall`的开放端口

```shell
firewall-cmd --zone=public --query-port=80/tcp
```

+ 使用`telnet`检测80端口时，提示：`Unable to connect to remote host: Connection refused`

`CentOS`的`SELinux`防护设置问题，需要通过以下命令，改变`nginx`网站目录的安装执行上下文，如上面提到的[改变`nginx`默认目录时需要执行的命令](#改变`nginx`默认目录时，需要执行以下命令)
 
+ `Ubuntu`下改变`Nginx`默认web目录提示权限403问题的解决
 
如果你的网站目录是在`/root`目录下的话， 需要在配置文件`/etc/nginx/nginx.conf`中的`user www-data`; 改为 `user root`;如果不想使用root用户运行，就不能把目录放在 /root/ 目录下了，可以选择在 /home/www 下创建目录，并赋予适当的权限，比如:`chmod 755 /home/www`，同样也可正常访问
