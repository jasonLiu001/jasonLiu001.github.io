---
layout: post
title:  "centos中改变Nginx默认web目录permission denied(403)"
date:   2017-11-09 14:22:30 +0800
---
centos中改变Nginx默认web目录错误解决
========

改变`nginx`默认目录时，需要执行以下命令

```shell
chcon -R -u system_u /网站目录/
chcon -R -t usr_t /网站目录/
```

说明： `CentOS`默认开启了`SELinux`（比文件类型更强的安全防护），可通过`getenforce`命令来查看，如果输出`Enforcing`表示安全防护中，如果你只是开发环境，你大可以直接关闭`selinux`，通过执行 `setenforce Permissive` 命令，使`selinux`保持宽容状态，正式生产环境不建议这么做
