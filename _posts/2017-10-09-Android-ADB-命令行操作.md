---
title: "Android ADB及emulator  命令行操作笔记"
date: 2017-12-07 15:52:00 +0800
---

#### ADB--Android Debug Bridge

通过`adb devices`命令可以查看已经连接的所有Android设备（包括模拟器和真机）



#### AVD--Android Virtual Device

+ 显示所有的模拟器

   ```shell
     emulator -list-avds
   ```

+ 启动模拟器

  ```shell
  emulator @模拟器名称
  ```




#### 启动模拟器错误`/android/qt/qt_setup.cpp:28:Qt library not found`

解决：切换目录到`$ANDROID_HOME/tools`目录下，在`tools`目录下再次运行模拟器即可

```powershell
cd C:\Android\android-sdk\tools
emulator @模拟器名称
```





