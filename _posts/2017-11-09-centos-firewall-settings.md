---
layout: post
title:  "CentOS 7 firewall防火墙设置"
categories: centos firewall
---

CentOS 7 Firewall防火墙基本使用
====

### `firewall`基本使用
1. 启动

```shell
systemctl start firewalld
```

2. 添加新规则后，重新加载配置文件
 
```shell
firewall-cmd --reload
```

+ 停止

```shell
 systemctl stop firewalld
```

+ 禁用

```shell
systemctl disable firewalld
```

+ 添加开放端口

```shell
##添加后需要运行：firewall-cmd --reload 才会生效
firewall-cmd --zone=public --add-port=80/tcp --permanent
```

+ 删除开放端口

```shell
##删除后需要运行：firewall-cmd --reload 才会生效
firewall-cmd --zone=public --remove-port=80/tcp --permanent
```

### 查询操作

+ 查看所有的防火墙策略

```shell
firewall-cmd --list-all-zones
```

+ 查看特定端口状态

```shell
firewall-cmd --zone=public --query-port=80/tcp
```

+ 查看防火墙运行状态

```shell
##方法一
firewall-cmd --state

##方法二
systemctl status firewalld
```

