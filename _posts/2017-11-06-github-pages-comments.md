---
layout: post
title: "github-pages-comments"
github_comments_issueid: "1"
tags:
---

文章正文

  {% if  github_comments_repository and github_comments_issueid=="1"  %}
     {% include github-comments.html %}
  {% endif %}