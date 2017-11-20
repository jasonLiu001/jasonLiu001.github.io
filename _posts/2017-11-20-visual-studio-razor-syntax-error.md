---
layout: post
title:  "visual studio 2015 razor视图提示：当前上下文不存在`ViewBag`"
date:   2017-11-20 11:12:30 +0800
---

解决当前上下文不存在`ViewBag`
=======
The name 'ViewBag' does not exist in the current context - Visual Studio 2015
--------

这段时间组里通过`Nuget`把`.NET MVC`的版本从4.0升级到了5.2.3，站点运行的时候倒没出现什么异常，但是每次通过`Visual Studio 2015`打开项目时，总是出现上下文不存在`ViewBag`的错误提示，视图中随之也出现了许多红色的波浪线，很是讨厌。

## 解决步骤

##### 1. 修改`Views`目录下的`Web.config`文件，程序集`System.Web.WebPages.Razor`的版本需要和项目中引用的版本保持一致，下面的3.0.0.0版本和`MVC`的5.2.3.0版本对应

*修改前*
```xml
    <sectionGroup name="system.web.webPages.razor" type="System.Web.WebPages.Razor.Configuration.RazorWebSectionGroup, System.Web.WebPages.Razor, Version=2.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35">
      <section name="host" type="System.Web.WebPages.Razor.Configuration.HostSection, System.Web.WebPages.Razor, Version=2.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" requirePermission="false" />
      <section name="pages" type="System.Web.WebPages.Razor.Configuration.RazorPagesSection, System.Web.WebPages.Razor, Version=2.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" requirePermission="false" />
    </sectionGroup>
```

*更新后*
```xml
    <sectionGroup name="system.web.webPages.razor" type="System.Web.WebPages.Razor.Configuration.RazorWebSectionGroup, System.Web.WebPages.Razor, Version=**3.0.0.0**, Culture=neutral, PublicKeyToken=31BF3856AD364E35">
      <section name="host" type="System.Web.WebPages.Razor.Configuration.HostSection, System.Web.WebPages.Razor, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" requirePermission="false" />
      <section name="pages" type="System.Web.WebPages.Razor.Configuration.RazorPagesSection, System.Web.WebPages.Razor, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" requirePermission="false" />
    </sectionGroup>
```

##### 2. 修改`appSettings.config`中的`webpages`版本

*修改前*
```xml
  <add key="webpages:Version" value="2.0.0.0"/>
  <add key="webpages:Enabled" value="false"/>
```

*更新后*
```xml
  <add key="webpages:Version" value="3.0.0.0"/>
  <add key="webpages:Enabled" value="false"/>
```

##### 修改`Views`目录下的`Web.config`中的相关`MVC`节点，版本号和项目中引用的`MVC`版本号保持一致

*修改前*
```xml
  <system.web.webPages.razor>
    <host factoryType="System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
    <pages pageBaseType="System.Web.Mvc.WebViewPage">
      <namespaces>
          ......
      </namespaces>
    </pages>
  </system.web.webPages.razor>

  <appSettings>
    <add key="webpages:Enabled" value="false" />
  </appSettings>

  <system.web>
    <httpHandlers>
      <add path="*" verb="*" type="System.Web.HttpNotFoundHandler"/>
    </httpHandlers>

    <!--
        在视图页面中启用请求验证将导致验证在
        控制器已对输入进行处理后发生。默认情况下，
        MVC 在控制器处理输入前执行请求验证。
        若要更改此行为，请对控制器或操作
        应用 ValidateInputAttribute。
    -->
    <pages
        validateRequest="false"
        pageParserFilterType="System.Web.Mvc.ViewTypeParserFilter, System.Web.Mvc, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35"
        pageBaseType="System.Web.Mvc.ViewPage, System.Web.Mvc, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35"
        userControlBaseType="System.Web.Mvc.ViewUserControl, System.Web.Mvc, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35">
      <controls>
        <add assembly="System.Web.Mvc, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" namespace="System.Web.Mvc" tagPrefix="mvc" />
      </controls>
    </pages>
  </system.web>
```

*更新后*
```xml
  <system.web.webPages.razor>
    <host factoryType="System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, Version=5.2.3.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
    <pages pageBaseType="System.Web.Mvc.WebViewPage">
      <namespaces>
          ......
      </namespaces>
    </pages>
  </system.web.webPages.razor>

  <appSettings>
    <add key="webpages:Enabled" value="false" />
  </appSettings>

  <system.web>
    <httpHandlers>
      <add path="*" verb="*" type="System.Web.HttpNotFoundHandler"/>
    </httpHandlers>

    <!--
        在视图页面中启用请求验证将导致验证在
        控制器已对输入进行处理后发生。默认情况下，
        MVC 在控制器处理输入前执行请求验证。
        若要更改此行为，请对控制器或操作
        应用 ValidateInputAttribute。
    -->
    <pages
        validateRequest="false"
        pageParserFilterType="System.Web.Mvc.ViewTypeParserFilter, System.Web.Mvc, Version=5.2.3.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35"
        pageBaseType="System.Web.Mvc.ViewPage, System.Web.Mvc, Version=5.2.3.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35"
        userControlBaseType="System.Web.Mvc.ViewUserControl, System.Web.Mvc, Version=5.2.3.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35">
      <controls>
        <add assembly="System.Web.Mvc, Version=5.2.3.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" namespace="System.Web.Mvc" tagPrefix="mvc" />
      </controls>
    </pages>
  </system.web>
```

##### （可选）清空`C:\Users\你的用户名\AppData\Local\Microsoft\VisualStudio\14.0\ComponentModelCache`下的所有文件

文件包括
```text
 Microsoft.VisualStudio.Default.cache
 Microsoft.VisualStudio.Default.catalogs
 Microsoft.VisualStudio.Default.err
 Microsoft.VisualStudio.Default.external

```

##### 重启`Visual Studio 2015`
至此，讨厌的错误提示顺利被消除了。

> 参考链接
> 1. [The name 'ViewBag' does not exist in the current context - Visual Studio 2015](https://stackoverflow.com/questions/29319189/the-name-viewbag-does-not-exist-in-the-current-context-visual-studio-2015)
