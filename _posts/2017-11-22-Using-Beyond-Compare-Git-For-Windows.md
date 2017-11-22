---
layout: post
title:  "Using Beyond Compare with git for windows"
date:   2017-11-22 10:39:30 +0800
---
> 参考链接
> [Using Beyond Compare with Version Control Systems](https://www.scootersoftware.com/support.php?zz=kb_vcs)

## BC version 4

### Diff
At a Windows command prompt enter the commands:
```shell
  git config --global diff.tool bc3
  git config --global difftool.bc3.path "c:/Program Files (x86)/Beyond Compare 4/bcomp.exe"
```

Note: Git versions older than 2.2.0 (git --version) use "bc3" as the keyword for BC4. For Git 2.2.0+, use "bc". To launch a diff using Beyond Compare, use the command "git difftool foofile.txt".
### 3-way Merge Pro only
At a Windows command prompt, enter the commands:
```shell
  git config --global merge.tool bc3
  git config --global mergetool.bc3.path "c:/Program Files (x86)/Beyond Compare 4/bcomp.exe"
```

Note: Git versions older than 2.2.0 (git --version) use "bc3" as the keyword for BC4. For Git 2.2.0+, use "bc". To launch a 3-way merge using Beyond Compare, use the command "git mergetool foofile.txt".

## BC version 3
### Diff
At a Windows command prompt enter the commands:
```shell
  git config --global diff.tool bc3
  git config --global difftool.bc3.path "c:/Program Files (x86)/Beyond Compare 3/bcomp.exe"
```

To launch a diff using Beyond Compare, use the command "git difftool foofile.txt".
### 3-way Merge Pro only
At a Windows command prompt, enter the commands:
```shell
  git config --global merge.tool bc3
  git config --global mergetool.bc3.path "c:/Program Files (x86)/Beyond Compare 3/bcomp.exe"
```

To launch a 3-way merge using Beyond Compare, use the command "git mergetool foofile.txt".
