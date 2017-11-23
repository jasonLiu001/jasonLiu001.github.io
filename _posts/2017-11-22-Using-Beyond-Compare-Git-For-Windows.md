---
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

## *附录(使用vsdiffmerge为默认的merge工具)* 

使用`vsdiffmerge`作为默认的合并对比工具，参考链接[Setting up Diff and Merge for Git command line](https://github.com/Inmeta/Knowledge/wiki/Setting-Up-DiffMerge)   
Go to your `C:\Users\<username>\` directory. There will probably already be a **.gitconfig** file located there. If not, create one. That file is "global" to all your local repositories.

Open the file in Notepad, and add the following section:
```text
[diff]
	tool = vsdiffmerge
[difftool]
	prompt = true
[difftool "vsdiffmerge"]
	cmd = \"vsdiffmerge.exe\" \"$LOCAL\" \"$REMOTE\" //t
	keepbackup = false
	trustexistcode = true
[merge]
	tool = vsdiffmerge
[mergetool]
	prompt = true
[mergetool "vsdiffmerge"]
	cmd = \"vsdiffmerge.exe\" \"$REMOTE\" \"$LOCAL\" \"$BASE\" \"$MERGED\" //m
	keepbackup = false
	trustexistcode = true
```
This will ensure that when you use the command line, the Visual Studio diff/merge tool will be used, and you should avoid the dreaded ">>>HEAD" tags in your files.

NOTE1: This require that VS is in your path. It should be for VS command prompts, and Action command line, but if you get issues here, add the full path which shoule be something like 
`%VSINSTALLDIR%Common7\IDE\vsdiffmerge.exe`
```text
[difftool "vsdiffmerge"]
cmd = "'%VSINSTALLDIR%Common7/IDE/vsdiffmerge.exe' $LOCAL $REMOTE //t "
keepbackup = false
trustexistcode = true
[mergetool "vsdiffmerge"]
cmd = "'%VSINSTALLDIR%/Common7/IDE/vsdiffmerge.exe' $REMOTE $LOCAL $BASE $MERGED //m "
keepbackup = false
trustExitCode = true
```
