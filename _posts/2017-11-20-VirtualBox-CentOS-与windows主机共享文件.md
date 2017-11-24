---
title:  "VirtualBox虚拟机(centos服务器)与windows文件共享设置"
date:   2017-11-20 15:54:13 +0800
---

## 步骤

#### 1. 选择对应的虚拟机，设置--共享文件夹--添加需要共享的文件夹
#### 2. 在windows中定位到VirtualBox的安装目录
比如，我的VirtualBox安装目录路径
```Batchfile
C:\Program Files\Oracle\VirtualBox
```
上传目录中的`VBoxGuestAdditions.iso`文件到虚拟机(centos)中，可以通过rz命令来完成
```shell
# 安装rz,sz
yum install lrzsz
# 上传本地文件到虚拟机
rz -ary --o-sync
```
执行rz命令后会弹出浏览对话框，选择`VBoxGuestAdditions.iso`后确定，自动执行上传操作

#### 3. 在`centos`中挂载上传的`VBoxGuestAdditions.iso`文件
```shell
mkdir /mnt/iso1
mount –o loop VBoxGuestAdditions.iso /mnt/iso1
```
切换到挂载目录`/mnt/iso1`，并执行安装操作
```shell
cd /mnt/iso1/
sudo ./VBoxLinuxAdditions.run
```
如果安装失败，按照下面步骤解决,如果下面步骤不能解决，考虑是VBoxLinuxAdditions.ios增强工具的版本问题，可以更换版本试试。我的就是通过降级版本成功的，原来是`5.1.20`更改为`5.0.10`就能正常安装了。下面是我降级安装的部分提示
```shell
./VBoxLinuxAdditions.run
Verifying archive integrity... All good.
Uncompressing VirtualBox 5.0.10 Guest Additions for Linux............  ## 安装低版本
VirtualBox Guest Additions installer
Removing installed version 5.1.20 of VirtualBox Guest Additions...  ##这里卸载了之前安装的高版本
......后面省略
......
```
下面是使用`5.1.20`版本时，尝试的安装失败解决方案，可惜都是失败，还怀疑是gcc版本问题，结果竟然是virtualbox增强工具的版本问题，真是大坑
```shell
# 查看具体的错误提示
cat /var/log/vboxadd-install.log | less
# 安装更新
sudo yum update
# 查看当前已经安装的所有内核
rpm -qa | grep kernel | sort
# 查看当前使用的内核
uname -r
# 安装kernel-devel和gcc,和当前内核版本匹配的devel
yum install kernel-devel-$(uname -r) gcc
# 设置内核版本环境变量
export KERN_DIR=/usr/src/kernels/$(uname -r) >> ~/.bashrc
export MAKE='/usr/bin/gmake -i'
# 检查设置的内核版本环境变量值是否正确
echo $KERN_DIR
yum install elfutils-libelf-devel dkms kernel-devel-$(uname -r)
yum erase kernel-debug-devel-$(uname -r)
cd /usr/src/kernels/$(uname -r)
make oldconfig && make prepare
# 再次执行安装增强工具
./VBoxLinuxAdditions.run
```

正常安装结果如下：
```shell
[liu@worker1 iso1]$ sudo ./VBoxLinuxAdditions.run 
Verifying archive integrity... All good.
Uncompressing VirtualBox 5.0.10 Guest Additions for Linux............
VirtualBox Guest Additions installer
Copying additional installer modules ...
Installing additional modules ...
Removing existing VirtualBox non-DKMS kernel modules[  确定  ]
Building the VirtualBox Guest Additions kernel modules
Building the main Guest Additions module[  确定  ]
Building the shared folder support module[  确定  ]
Building the OpenGL support module[失败]
(Look at /var/log/vboxadd-install.log to find out what went wrong. The module is not built but the others are.)
Doing non-kernel setup of the Guest Additions[  确定  ]
Starting the VirtualBox Guest Additions [  确定  ]
Installing the Window System drivers
Installing X.Org Server 1.17 modules[  确定  ]
Setting up the Window System to use the Guest Additions[  确定  ]
You may need to restart the the Window System (or just restart the guest system)
to enable the Guest Additions.

Installing graphics libraries and desktop services components[  确定  ]
```
提示`OpenGL`失败，可以忽略，我们服务器不需要图形界面

#### 4. 在虚拟机(centos)中挂载windows中的共享目录
```shell
[liu@worker1 ~]$ mkdir share
# 挂载windows中的共享目录，替换共享目录名称为自己的共享目录名称
sudo mount -t vboxsf {第1步中设置的共享目录名称} ~/share  
```

#### 5. 设置虚拟机(centos)中的share目录selinux安全上下文
暂时关闭selinux，启用selinux时，访问总是提示权限问题，尝试改变安全上下文失败，尝试[安装audit2allow](https://github.com/cronkeep/cronkeep/wiki/Developer-Guide)来解决也失败，最后无奈只能暂时关闭selinux来解决
```shell
[liu@manager1 ~]$ sudo setenforce 0
```

共享目录设置完成，可以把自己的文件拷贝到相应的目录下，并在虚拟机(centos)中正常访问了!!

> 参考链接
> 1. [ VirtualBox/SharedFolders](https://help.ubuntu.com/community/VirtualBox/SharedFolders)
