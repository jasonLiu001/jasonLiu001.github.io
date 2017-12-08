---
title: "React-Native学习笔记"
date: 2017-12-07 11:08:00 +0800
---



#### 【推荐这种方式】通过react-native-cli来创建及运行项目（命令行cli方式）

尽量不要按照`QuickStart`中配置，因为`QuickStart`中的例子是用expo的方式来创建的项目，所以在运行时候，可能会遇到expo项目遇到的问题。尽量按照`Build Project with Native Code`里面的说明来配置环境，可以避免自己少走弯路，节约学习时间和成本。



#### 【Demo项目推荐用，正式项目不推荐】通过Expo的xde来创建及运行项目

> 特别说明：
>
> 1. Expo创建的项目在有些场景下不合适，比如需要创建后台进程的应用，无法后台定位，无法使用蓝牙等限制
> 2. Expo创建的项目最终打包的体积都是比较大的，这个根据自己的项目情况来考虑

1. [安装xde](https://docs.expo.io/versions/latest/introduction/installation.html)

2. 启动android模拟器

3. 打开xde，通过菜单`Expo XDE->Install Android App`，安装expo到模拟器，并通过xde创建新项目

4. 修改项目根路径下的`package.json`文件，expo sdk和react-native的版本对应关系，如下图所示的对应关系

   ![Expo和React Native的版本对应关系](/assets/img/expo_support.png)

   修改expo自动生成的`package.json`文件，保持和上面版本的对应关系，下面是expo自动生成的json文件，需要对应修改有注释的地方

   ```json
   {
     "main": "node_modules/expo/AppEntry.js",
     "private": true,
     "scripts": {
       "test": "node ./node_modules/jest/bin/jest.js --watch"
     },
     "jest": {
       "preset": "jest-expo"
     },
     "dependencies": {
       "@expo/samples": "2.1.1",
       "expo": "^23.0.0",  //步骤1.这里需要修改为"23.0.0"
       "react": "16.0.0",
       "react-native": "https://github.com/expo/react-native/archive/sdk-23.0.0.tar.gz",   //步骤2.这里需要修改为："0.50.3"，和上面保持一致
       "react-navigation": "^1.0.0-beta.19"
     },
     "devDependencies": {
       "jest-expo": "^23.0.0"
     }
   }
   ```

5. 通过expo运行程序

   ​


#### Expo运行React Native问题汇总

通过Expo运行项目时报错，通常是expo sdk的版本和react-native的版本不一致导致，下面列出了两个常见问题

1. Expo运行React Native报错

> 错误信息： Couldn't start project on Android: Error running adb: Error running app. Error: Activity not started, unable to resolve Intent { act=android.intent.action.VIEW dat=exp://localhost:19000 flg=0x10000000 }

解决方法：需要提前在模拟器中安装`expo`客户端，然后再次运行程序即可，googleplay上的expo有可能是旧的apk，在expo运行的时候会提示upgrade，点击升级即可

2. There was an unhandled error: 23.0.0 is not a valid SDK version. Options are 18.0.0, 17.0.0, 16.0.0, 15.0.0, 14.0.0, 13.0.0, 12.0.0, 11.0.0, UNVERSIONED

   按照官网的Quick Start新建的项目，在expo中运行，出现了以上错误。

   导致原因：`expo sdk` 版本和`react native `的版本不一致导致

   解决步骤：

   1. 查看本机安装的react-native的版本

   ```shell
   npm view react-native version
   ```

   2. 修改expo sdk和react native的版本对应关系，参照上图的sdk对应关系设置即可

#### 配合react-native的包管理器，最好是都安装

1. [NPM](https://github.com/npm/npm)

2. [Yarn](https://yarnpkg.com/zh-Hans/docs/install#windows-tab)

   react-native安装包的时候会优先选择yarn，不是npm，可以大大缩短下载包的速度

   ```shell
   npm install --global yarn
   ```

3. （可选安装项） [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) 用于编译C++编写的node模块，安装这个工具的同时，会自动安装python

   ```shell
   npm install --global --production windows-build-tools
   ```

4. 安装[flow](https://flow.org/en/docs/install/)

   ```shell
   npm install --save-dev babel-cli babel-preset-flow
   ```

   ​

#### JSX学习

`jsx`不是字符串也不是html，它可以作为表达式来用，`()`在`jsx` 中没有什么特别的意思，`()`是一个整体的意思，不会守到js的[自动插入分号功能](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)影响

1. 冒号`""`和`{}`不能同时使用，`{}`在jsx是表达式的意思
2. 命名规则驼峰命名，首字母小写
3. tag必须有对应的结束标记
4. `jsx`本身支持`XSS`
5. DOM和html没有必然的联系，jsx和html类似都是用于描述dom的语言
6. `jsx`中体现了ES6的特性，在webstorm中对jsx有很好的支持
   + 在webstorm中如果启用对`jsx`的支持<http://babeljs.io/docs/editors>
   + ES6对应的几种转换器：Typescript、Traceur、Babel，参考文章<http://2ality.com/2015/04/deploying-es6.html>
   + 优秀文章，关于如何将ES6编写的脚步转换为ES5，<http://2ality.com/2015/04/deploying-es6.html>
7. 在.net中也可以使用JSX语法，参照<https://reactjs.net/>。在.net中通过babel提供的api也可以实现将jsx转换为普通的javascript，参考文档<http://babeljs.io/docs/setup/#installation>



#### React Native App在模拟中的操作

1. Ctrl+M 调出菜单，选择对应的菜单，可以启用实时编译等功能

#### OAT功能使用

待学习

