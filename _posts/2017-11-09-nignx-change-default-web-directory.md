---
layout: post
title:  "centos中改变Nginx默认web目录permission denied(403)"
date:   2017-11-09 14:22:30 +0800
---
centos中改变Nginx默认web目录错误解决
========
拒绝访问的原因：SELiunx的安全防护机制阻止了，不同SELinux类型中的进程互相访问时，默认是不允许直接访问的
解决思路： 查询Nginx默认web目录的SELinux类型，修改自定义目录对应的SELiunx类型，和Nginx默认的web目录SELinux类型保持一致即可

##### 1. 通过`ll -Z /usr/share/nginx`查看原来默认的nignx目录的SELinux上下文类型

```shell
[liuwang@manager1 ~]$ ll -Z /usr/share/nginx
drwxr-xr-x. root root system_u:object_r:httpd_sys_content_t:s0 html 
drwxr-xr-x. root root system_u:object_r:usr_t:s0       modules
```

上面命令的结果中`httpd_sys_content_t`就是我们需要查找的上下文类型，好了，下面我们把自己的自定义目录和它保持一样的上下文类型就可以了
通过以下命令来实现

##### 2. 修改自定义网站目录的对应的SELinux上下文类型

```shell
sudo chcon -R -t httpd_sys_content_t /你自己的网站目录/
```

说明： `CentOS`默认开启了`SELinux`（比文件类型更强的安全防护），可通过`getenforce`命令来查看，
如果输出`Enforcing`表示安全防护中。如果你只是开发环境，你大可以直接关闭`selinux`，
通过执行 `setenforce Permissive` 命令，使`selinux`保持宽容状态。如果是正式生产环境不建议这么做，还是老实的通过`chcon`命令来修改安全上下文吧，`SELinux`安全上下文格式：`user:role:type:level`，下面列出了简单的使用和配置

### `SELiunx`常用查询及操作命令简介

+ 查看`SELinux`状态

```shell
~]$ sestatus
SELinux status:                 enabled
SELinuxfs mount:                /selinux
Current mode:                   enforcing
Mode from config file:          enforcing
Policy version:                 24
Policy from config file:        targeted
```    

+ 查看`SELiunx`用户和`Linux`用户的对应关系`semanage login -l`

```shell
~]# semanage login -l

Login Name                SELinux User              MLS/MCS Range

__default__               unconfined_u              s0-s0:c0.c1023
root                      unconfined_u              s0-s0:c0.c1023
system_u                  system_u                  s0-s0:c0.c1023
```

+ 通过`ls -Z 文件名/目录`来查看文件或者目录的`SELinux`上下文

    ```shell
    ~]$ ls -Z /home
    drwxr-xr-x. root    root    system_u:object_r:user_home_dir_t:s0 jasonLiu001.github.io
    ##system_u:object_r:user_home_dir_t:s0这段就是SELinux上下文，包括用户，角色，类型，等级四个段
    ```
    
+ 通过`ps -eZ`查看应用程序运行的安全域

```shell
##查看httpd进程运行的安全域，下面显示的是unconfined_t，这个意味着它可以跨安全域访问其他域的文件
~]$ ps -eZ | grep httpd
unconfined_u:unconfined_r:unconfined_t:s0 7721 ?      00:00:00 httpd
unconfined_u:unconfined_r:unconfined_t:s0 7723 ?      00:00:00 httpd
unconfined_u:unconfined_r:unconfined_t:s0 7724 ?      00:00:00 httpd
unconfined_u:unconfined_r:unconfined_t:s0 7725 ?      00:00:00 httpd
unconfined_u:unconfined_r:unconfined_t:s0 7726 ?      00:00:00 httpd
unconfined_u:unconfined_r:unconfined_t:s0 7727 ?      00:00:00 httpd
unconfined_u:unconfined_r:unconfined_t:s0 7728 ?      00:00:00 httpd
unconfined_u:unconfined_r:unconfined_t:s0 7729 ?      00:00:00 httpd
unconfined_u:unconfined_r:unconfined_t:s0 7730 ?      00:00:00 httpd
```

+ 通过`chcon -t`改变进程运行的安全域（类型）

```shell
chcon -t usr_t /usr/sbin/httpd
```

+ 通过`restorecon`恢复到默认的SELinux上下文

```shell
~]# restorecon -v /usr/sbin/httpd
restorecon reset /usr/sbin/httpd context system_u:object_r:unconfined_exec_t:s0->system_u:object_r:httpd_exec_t:s0
```    

关于`SELinux`的相关参考文档：
1. [SELinux深入理解](http://blog.csdn.net/myarrow/article/details/9856095/)
2. [TOP THREE CAUSES OF PROBLEMS](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/security-enhanced_linux/sect-security-enhanced_linux-troubleshooting-top_three_causes_of_problems)


### `CentOS`中的`nginx`配置时的其他问题

+ 使用`telnet`检测80端口时，提示：`Unable to connect to remote host: No route to host`

解决方法：将80端口添加到`firewall`的开放端口

```shell
firewall-cmd --zone=public --query-port=80/tcp
```

+ 使用`telnet`检测80端口时，提示：`Unable to connect to remote host: Connection refused`

`CentOS`的`SELinux`防护设置问题，需要通过以上命令，改变`nginx`网站目录的安装执行上下文，如上面提到的[修改自定义网站目录的对应的SELinux上下文类型](#修改自定义网站目录的对应的SELinux上下文类型)

### `Ubuntu`下改变`Nginx`默认web目录提示权限403问题的解决
 
如果你的网站目录是在`/root`目录下的话， 需要在配置文件`/etc/nginx/nginx.conf`中的`user www-data`; 改为 `user root`;如果不想使用root用户运行，就不能把目录放在 /root/ 目录下了，可以选择在 /home/www 下创建目录，并赋予适当的权限，比如:`chmod 755 /home/www`，同样也可正常访问
