---
layout: post
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
安装结果如下：
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


共享目录设置完成，可以把自己的文件拷贝到相应的目录下，并在虚拟机(centos)中正常访问了!!

> 参考链接
> 1. [ VirtualBox/SharedFolders](https://help.ubuntu.com/community/VirtualBox/SharedFolders)
