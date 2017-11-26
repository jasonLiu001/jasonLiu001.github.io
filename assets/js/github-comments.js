// Original code taken with permission from : https://github.com/dwilliamson/donw.io/blob/master/public/js/github-comments.js

// use of ajax vs getJSON for headers use to get markdown (body vs body_html)

function ParseLinkHeader(lnk) {
    var entries = lnk.split(",");
    var links = {};
    for (var i in entries) {
        var entry = entries[i];
        var link = {};
        link.name = entry.match(/rel="([^"]*)/)[1];
        link.url = entry.match(/<([^>]*)/)[1];
        link.page = entry.match(/page=(\d+).*$/)[1];
        links[link.name] = link;
    }
    return links;
}

/**
 *
 * @param commentUrl 评论地址
 * @param btnClass 评论按钮样式
 */
function getBtnComment(commentUrl, btnText, formClass, btnClass) {
    return "<form class='" + formClass + "' action='" + commentUrl + "' rel='nofollow'> <input class='" + btnClass + "' type='submit' value='" + btnText + "' /> </form>";
}

function ShowComments(repo_name, comment_id, page_id) {
    var api_comments_url = "https://api.github.com/repos/" + repo_name + "/issues/" + comment_id + "/comments" + "?page=" + page_id;

    $.ajax(api_comments_url, {
        headers: {Accept: "application/vnd.github.v3.html+json"},
        dataType: "json",
        success: function (comments, textStatus, jqXHR) {

            var commentUrl = "https://github.com/" + repo_name + "/issues/" + comment_id + "#new_comment_field";
            // Add post button to first page
            if (page_id == 1) {
                $("#gh-comments-list").append(getBtnComment(commentUrl, "说说你的想法", "", "btn btn-outline-primary btn-lg btn-block"));
            }

            // Individual comments
            $.each(comments, function (i, comment) {

                var date = new Date(comment.created_at);

                var t =
                    "<div class='row'>" +
                    "<div class='col-12 py-2'>" +
                    "<div id='gh-comment'>" +
                    "<div class='card'>";

                //评论框头部
                t += "<div class='card-header'><img class='rounded-circle' src='" + comment.user.avatar_url + "' width='30px' height='30px;'>";
                t += "<b><a class='badge badge-light' href='" + comment.user.html_url + "'>" + comment.user.login + "</a></b>";
                t += " 发表于 <em>" + moment(date).format('YYYY-MM-DD HH:mm:ss') + "</em>";
                t += getBtnComment(commentUrl, "来个评论", "d-inline-flex ml-2", "btn btn-outline-primary") + "</div>";

                //评论内容
                t += "<div class='card-body'><p class='card-text'>" + comment.body_html + "</p><div>";

                t +=
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                $("#gh-comments-list").append(t);
            });

            // Call recursively if there are more pages to display
            var linksResponse = jqXHR.getResponseHeader("Link");
            if (linksResponse) {
                var links = ParseLinkHeader(jqXHR.getResponseHeader("Link"));
                if ("next" in links) {
                    ShowComments(repo_name, comment_id, page_id + 1);
                }
            }
        },
        error: function () {
            $("#gh-comments-list").append("<p>加载评论失败...</p>");
        }
    });
}

function DoGithubComments(repo_name, comment_id) {
    $(document).ready(function () {
        ShowComments(repo_name, comment_id, 1);
    });
}
