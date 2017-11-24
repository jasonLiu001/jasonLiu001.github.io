---
title: "Jekyll开发GitHub Pages环境搭建简介"
date: 2017-11-08 08:24:13 +0800
---

### 前提条件
1. `Linux`主机一台或虚拟机一台
2. `Linux`上安装了GCC和Make(通过gcc -v和make -v来检查是否已经安装)

### 环境搭建

#### Ubuntu
+ 安装`Ruby`

```shell
sudo apt-get install ruby-full
```

+ 通过`rubygems`安装`Jekyll`和`Bundler`

```shell
gem install jekyll bundler
```
> 说明：`rubygems`是`ruby`的包管理器，安装`Jekyll`时可参考[`Jekyll`官网](https://jekyllrb.com/docs/installation/)  
> `bundler`是什么？  
> bundler is a gem that manages other Ruby gems. It makes sure your gems and gem versions are compatible, and that you have all necessary dependencies each gem requires.

+ 在当前目录下创建网站

```shell
jekyll new .
```

+ 网站编译

```shell
#使用bundle exec可以使用Gemfile.lock中指定的gems的版本来编译网站，能最大兼容并且有效的减少依赖冲突
#当然你也可以直接使用`jekyll build`来编译网站，但是有的时候可能出现包不兼容问题
bundle exec jekyll build
```

#### CentOS
+ 安装`Ruby`

```shell
sudo yum install ruby
##通过yum安装的ruby版本太旧，此时需要安装rvm来安装其他的ruby版本
```

+ [可选]通过`rvm`来安装`ruby`  

```shell
##导入gpg
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

##安装rmv 安装完成后需要退出登录，再重新登录CentOS
curl -sSL https://get.rvm.io | bash -s stable 

##显示可安装的所有ruby版本
rvm list known

##通过rvm安装指定版本的ruby
rvm install 2.1

##通过rvm设置使用特定版本的ruby
rvm use 2.1

##通过rvm设置系统级的特定版本ruby
rvm use 2.1 --default   
```
> 安装[`RVM`](http://rvm.io/rvm/install)可参考官网:http://rvm.io/rvm/install

+ 通过`rubygems`安装`Jekyll`和`Bundler`，参考上面的`Ubuntu`的环境搭建
+ 在当前目录下创建网站，参考上面的`Ubuntu`环境搭建
+ 网站编译，参考上面的`Ubuntu`环境搭建

### 安装`GitHub Pages`相关的`gem`包
这个是确保你在本地编译通过的网站，在`GitHub Pages`上也同样能正常显示，所以你需要在本地配置一个类似于`GitHub Pages`的环境
+ 在`Gemfile`文件中添加

```shell
gem "github-pages", group: :jekyll_plugins
```

+ 安装`Github Page`相关的`gem`包

```shell
##Gemfile文件发生变化时，需要运行的命令，如果不清楚，可以用`npm install`来类比其功能
bundle update
```

### 参考文档
在`GitHub Pages`上支持的`Jekyll plugins`插件列表
1. [Adding Jekyll plugins to a GitHub Pages site](https://help.github.com/articles/adding-jekyll-plugins-to-a-github-pages-site/)

