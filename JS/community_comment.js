function get_cookie(name) {
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null; }


//페이지 입장 시 실행
$(document).ready(function() {
    comment_user_nickname();
})


// 전역변수 comment_user_nickname()가지고 있음
let comments_user_nicknames = [];
// 삭제 버튼을 위한 닉네임 조회
function comment_user_nickname() {
    const token = get_cookie("X-AUTH-TOKEN");
    $.ajax({
        type: "GET",
        url: "http://finalapp-env.eba-mcuzkehj.ap-northeast-2.elasticbeanstalk.com/user",
        data: {},
        contentType: "application/json;",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("X-AUTH-TOKEN", token);
        },
        success: function (user) {
            let nickname = user['nickname']
            comments_user_nicknames.push(nickname)
            commentGet();
    }
    })
}


//게시물 댓글 GET
function commentGet() {
    const token = get_cookie("X-AUTH-TOKEN");
    const para = document.location.href.split("=");
    const postId = para[1]
    $.ajax({
        type: "GET",
        url: `http://finalapp-env.eba-mcuzkehj.ap-northeast-2.elasticbeanstalk.com/user/community/post/${postId}/comment`,
        data: {},
        contentType: "application/json;",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("X-AUTH-TOKEN", token);
        },
        success: function (comments) {
            for (let i = 0; i < comments.length; i++) {
                function images() {
                    const image = comments[i]['img'];
                    if (image === '입력 없음') {
                        return "/static/MAP_logo.png"
                    } else {
                        return image
                    }
                }
                let comment_id = comments[i]['commentId']
                let nickname = comments[i]['nickname']
                let comment = comments[i]['comment']
                let img = images()
                let createdAt = comments[i]['createdAt'] + '+0000'
                let create_at = new Date(createdAt)
                let time_brfore = time2str(create_at)
                let temp_html = ``
                if (communitys_user_nickname == nickname) {
                    temp_html = `<div style="overflow:hidden; height: auto; ">
                                    <div class="profil_ring">
                                        <img class="profil" src="${img}" alt="Placeholder image" />
                                    </div>
                                    <div style="display: flex;">
                                        <p class="comment_profil">${nickname}:</p>
                                        <p class="comment_profil" style="margin-left: 7px;">${comment}</p>
                                        <div class="comment_part_box">
                                            <a class="comment_part" style="margin-right: 10px; right:24%;" id="comment_delete" onclick="comment_delete(${comment_id})">×</a>
                                            <p class="comment_part" style="">${time_brfore}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr style="margin-top: 5px; margin-bottom: 5px;">`
                } else {
                    temp_html = `<div style="overflow:hidden; height: auto; ">
                                    <div class="profil_ring">
                                        <img class="profil" src="${img}" alt="Placeholder image" />
                                    </div>
                                    <div style="display: flex;">
                                        <p class="comment_profil" >${nickname}:</p>
                                        <p class="comment_profil" style="margin-left: 7px; font-size: 14px;">${comment}</p>
                                        <div class="comment_part_box">
                                            <p class="comment_part" style="">${time_brfore}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr style="margin-top: 5px; margin-bottom: 5px;">`
                }
                    $('#comments').append(temp_html)
            }
        }
    })
}


// 게시물 댓글 POST
function comment_make() {
    const token = get_cookie("X-AUTH-TOKEN");
    const para = document.location.href.split("=");
    const postId = para[1]
    let comment = $('#comment_text_box').val();
    if (comment.length == 0) {
        alert('댓글 내용을 입력하세요.');
    } else if (comment.length > 40){
        alert('40자까지 입력가능합니다.')
    } else {
        $.ajax({
            type: "POST",
            url: `http://finalapp-env.eba-mcuzkehj.ap-northeast-2.elasticbeanstalk.com/user/community/post/${postId}/comment`,
            data: JSON.stringify({
                comment: comment,
            }),
            contentType: "application/json;",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-type","application/json");
                xhr.setRequestHeader("X-AUTH-TOKEN", token);
            },
            success: function () {
                window.location.reload();
            }
        })
    }
}


// 게시물 댓글 DELETE
function comment_delete(comment_id) {
    const token = get_cookie("X-AUTH-TOKEN");
    if (confirm('삭제하겠습니까?')) {
        $.ajax({
            type: "DELETE",
            url: `http://finalapp-env.eba-mcuzkehj.ap-northeast-2.elasticbeanstalk.com/user/community/post/comment/${comment_id}`,
            data: {
                commentId : comment_id
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-type","application/json");
                xhr.setRequestHeader("X-AUTH-TOKEN", token);
            },
            success: function () {
                window.location.reload(true);
            }
        })
        alert("삭제되었습니다.")
    } else {
        window.location.reload(true);
    }
}


// 게시물 시간
function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60  // 분

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 14) {
        return parseInt(time) + "일 전"
    }
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}


