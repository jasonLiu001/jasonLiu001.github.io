---
title: "BASH Shell: How to run several commands in Sequence or all at once"
date: 2017-11-29 11:48:00 +0800
---

References：[BASH Shell: How to run several commands in Sequence or all at once](https://www.cyberciti.biz/tips/run-several-commands-sequence-all-at-once.html)

If you need to run several commands chain them with a ; (semi colon). It is a control operator or metacharacter.
General Syntax:
**command1;command2;command3**

Commands separated by a ; are executed sequentially; the shell waits for each command to terminate in turn. The return status is the exit status of the last command executed.
```shell
$ clear;date
```

### Run command all at once
To run several commands all at once by putting an ampersand & at the end of the command line. For example start backup script:
```shell
# /root/ftpbackup.sh &
```
Now you don’t have to wait finishing /root/ftpbackup.sh script.


### Putting it all together
There might be thousands of *.bak file. You need to goto each directory and list all files in /tmp/list directory:
```shell
# for d in "/home/sales /home/dbs /data1"; do find $d -iname "*.bak" >> /tmp/list; done &
```