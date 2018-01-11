---
title: "React-Native学习笔记"
date: 2017-12-07 11:08:00 +0800
---

使用React Native必须具备的知识储备

1. React（包括jsx）
2. jsx
3. javascript、es6语法

能够有助你快速上手并且理解react native的其他知识，非必备知识储备

1. node
2. npm，yarn
3. es5
4. html，DOM
5. AMD、CMD、CommonJS、UMD
6. Java、C#、Objective-C中的一种



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
       "react-native": "https://github.com/expo/react-native/archive/sdk-23.0.0.tar.gz",   //步骤2.这里需要修改为："0.50.3"，和最新的React-Native版本保持一致
       "react-navigation": "^1.0.0-beta.19"
     },
     "devDependencies": {
       "jest-expo": "^23.0.0"
     }
   }
   ```

5. 通过expo运行程序



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

4. （可选安装）安装[flow](https://flow.org/en/docs/install/)

   如果用的是开发工具时Webstorm，建议安装

   ```shell
   npm install --save-dev babel-cli babel-preset-flow
   ```
5. （可选安装）安装[chocolatey](https://chocolatey.org/install)
    安装`chocolatey`的好处在于可以在命令行里进行软件的安装和卸载操作，非常方便
    ```shell
    #通过powershell安装
    Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    ```
       ​

#### JSX学习

`jsx`不是字符串也不是html，它可以作为表达式来用，`()`在`jsx` 中没有什么特别的意思，`()`是一个整体的意思，不会受到js的[自动插入分号功能](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)影响

1. 冒号`""`和`{}`不能同时使用，`{}`在jsx是表达式的意思

2. 命名规则驼峰命名，首字母小写，这个和html属性的规则有区别，html属性都是小写的，用过data自定义属性的就会深有体会，如果包含大写字符，是无法取到对应的属性的

3. tag必须有对应的结束标记

4. `jsx`本身支持`XSS`

5. DOM和html没有必然的联系，jsx和html类似都是用于描述dom的语言

6. `jsx`中体现了ES6的特性，在webstorm中对jsx有很好的支持
   + 在webstorm中如何[启用对`jsx`的支持](http://babeljs.io/docs/editors)
   + ES6对应的几种转换器：Typescript、Traceur、Babel，参考文章[deploying-es6](http://2ality.com/2015/04/deploying-es6.html)
   + 优秀文章，关于如何将ES6编写的脚步转换为ES5，[deploying-es6](http://2ality.com/2015/04/deploying-es6.html)

7. 在.net中也可以使用JSX语法，参照[reactjs.net](https://reactjs.net/)。在.net中通过babel提供的api也可以实现将jsx转换为普通的javascript，参考文档[Babel](http://babeljs.io/docs/setup/#installation)

8. jsx和普通模板语言的最大区别，jsx是在js中嵌入xml语言标记，其他类似xml语言都是在语言中嵌入js，比如html中如果使用模板语法，导入js，并且编写js脚本

9. 在子组件中有构造函数时，构造函数中需要调用super方法

10. 设计组件的原则：单责任原则，一个组件负责一件事

11. 最好在代码基础上添加类型检查，Flow或者Typescript，

12. 组件分为类组件和方法组件

13. 一定要熟练运用jsx和纯js的组件写法

14. fragments使用`<></>`

15. `Live Reloading`和`Hot Reloading`的区别

    >**Live reloading** reloads or refreshes the entire app when a file changes. For example, if you were four links deep into your navigation and saved a change, live reloading would restart the app and load the app back to the initial route.
    >
    >**Hot reloading** only refreshes the files that were changed without losing the state of the app. For example, if you were four links deep into your navigation and saved a change to some styling, the state would not change, but the new styles would appear on the page without having to navigate back to the page you are on because you would still be on the same page.



#### React Native App在模拟中的操作

1. Ctrl+M 调出菜单，选择对应的菜单，可以启用实时编译等功能

#### OAT功能使用

待学习

#### jsx调试

待学习

#### 集成React Native到已有的原生应用中

待学习

#### RN 调用原生模块的实现原理

待深入

#### RN 调用原生模块的异步实现原理

待深入

#### React学习

1. 元素是react的最小构成块，在屏幕中能够看到的都属于元素
2. 组件可看着是js中的方法，返回值是元素
3. jsx中用户定义的组件的所有属性会被当做一个对象，这个对象就是所说的"props"
4. 用户定义组件的首字母要大写，与dom中定义的tag区别开来


#### React Native运行时问题汇总

###### Could not create ADB Bridge

解决步骤：

1. 删除电脑中旧的android-sdk
2. 下载最新的android studio，通过android studio安装需要的android-sdk版本，其他的不需要可以不去安装，具体安装的版本参考[react native的官网说明](http://facebook.github.io/react-native/docs/getting-started.html)，按照上面的安装时没有问题的
3. 新的android-sdk安装完成后，最好重启电脑
4. 再次运行`react-native`应用，运行`react-native run-android`最好是 **通过管理员身份** 来运行，避免不必要的错误，自己在这个上面也耽误了不少时间

> 网上的很多都是通过adb kill-server来解决，但是在自己这死活不好使，重启电脑好使，哈哈

其他解决办法
1. 首先把模拟器返回到主屏，千万不要让上次运行的RN app开启，回到主屏界面
2. 然后执行的下面的命令：
```shell
# 停止adb deamon
adb kill-server
# 执行adb devices  在运行`run-android`命令的过程中
# 在node的窗口出现前，执行adb devices命令 2到3次才行，不知道为什么
# node窗口中出现Loading dependency graph,done.的提示，才表示正常，如果没有done，则会安装失败
adb devices
```
参见下面的截图
![android-can-not-adb-bridge](/assets/img/android-can-not-adb-bridge.png)



#### 使用Webstrom开发React Native App

参考文章：[Developing mobile apps with React Native in WebStorm](https://blog.jetbrains.com/webstorm/2016/12/developing-mobile-apps-with-react-native-in-webstorm/)

1. 在项目中排除了android和ios两个目录

2. 在webstorm中想通过node来调试的话，node版本需要7.0以上版本

3. 首先启动模拟器，新建配置文件，运行配置即可启动到调试状态

4. flow占有资源特别高，如果不想装，可以跳过这个，不用安装。[安装flow](https://flow.org/en/docs/install/)来对错误检查的增强，不需要全局安装，安装到具体项目就行

   ```shell
   #安装flow之前，需要首先安装编译器，
   npm install --save-dev babel-cli babel-preset-flow
   #在.babelrc中添加presets
   {
     "presets": ["flow"]
   }

   #安装flow
   npm install --save-dev flow-bin
   #在package.json中添加flow到npm scripts
   {
     "name": "my-flow-project",
     "version": "1.0.0",
     "devDependencies": {
       "flow-bin": "^0.41.0"
     },
     "scripts": {
       "flow": "flow"
     }
   }
   #首次运行
   npm run flow init
   #以后运行时，不需要加init，只有第一次才要加
   npm run flow
   ```

5. 调试app时，需要开启js远程调试，查看react 的dom结构的话，可以用react-devtools来查看

6. 调试js时，建议开启chrome的`Pause on caught exceptions`参考链接[javascript-is-there-a-way-to-get-chrome-to-break-on-all-errors](https://stackoverflow.com/questions/2233339/javascript-is-there-a-way-to-get-chrome-to-break-on-all-errors/17324511#17324511)

7. 调试有多种方法

   + 方法一：调试通过 [Create React App](https://github.com/facebookincubator/create-react-app)创建的React Native项目[Debugging React apps created with Create React App in WebStorm](https://blog.jetbrains.com/webstorm/2017/01/debugging-react-apps/)
   + 方法二：官网方法：开启in-app的远程调试结合react-devtools来调试。（为什么需要react-devtools?因为chrome的插件不支持react-native，所以需要单独的调试工具）
   + 方法三：通过webstorm来调试，参考文章[Developing mobile apps with React Native in WebStorm](https://blog.jetbrains.com/webstorm/2016/12/developing-mobile-apps-with-react-native-in-webstorm/)，这个文章里有一个地方，需要修改一下，就是需要手动运行run-android命令才行￥

#### ES6

1. `export default`一个模块中只有一个，`export`可以有多个
2. ​

#### 创建React Native项目

创建项目的前提条件：nodejs、jdk、npm、yarn、android-sdk，python2、react-native-cli、windows-build-tools都全部配置完成，其中node版本最好是7.0以上，jdk最低jdk8，python2和windows-build-tools安装其中一个即可，windows-build-tools中已经包含了python2，不需要重复安装，一切就绪，就可以安装下面的步骤来创建React-Native项目了

1. 切换到想要创建项目的目录下，通过

   ```powershell
   react-native init 项目名称
   ```

2. 首先启动模拟器，运行android应用

   ```shell
   react-native run-android
   ```

   运行错误：`Could not create ADB Bridge`，参见上面的[Could not create ADB Bridge](#Could not create ADB Bridge)解决方法

3. ​

   ​