# project_MAP_front_my_code
<a href="https://github.com/alaliyo/final_project_MAP_front" target="_blank">클릭 시 프로젝트 개요, 아키텍처, 백엔드 팀 레포 등 더 상세한 내용을 확인할 수 있습니다</a>

<br>

<h2>1. 내가 구현한 기능</h2>
<ol>
  <li>웹 페이지의 html, css 설계 및 구현</li>
  <li>api를 ajax으로 연결 및 웹 페이지에 구현</li>
  <li>커뮤니티 페이징 처리 기능 프론트 엔드에서 구현</li>
  <li>로그인 시 스프링 환경에서 보내주는 토큰을 웹 페이지 쿠키에 저장</li>
  <li>CI/CD 기능 구축</li>
  <li>aws S3에 배포</li>
</ol>

#

<br>
<h2>2. 사용한 프로그래밍(마크업) 언어 및 라이브러리, 프레임 워크</h2>
<ul>
  <li>HTML, CSS, JavaScript</li>
  <li>jquery, ajax</li>
</ul>

#

<br>
<h2>3. 소통하는 방법</h2>
<p>&nbsp; 주로 api 설계부분에서 소통을 했으며 명세서를 작성하는 부분부터 백엔드 개발자들과 함께 진행했습니다.
<br> api 설계와 다르게 구성되어 있어 400포트의 오류가 발생하면 바로 백엔드 개발자와 대화로 해결을 하고
<br> 새롭게 기능을 추가하는데 기존의 api를 활용하여 프론트앤드에서 처리가 가능하면
<br> 백엔드 개발자와 소통하여 코드를 구성하였으며 하루하루 완성된 부분들을 다른 개발자들과 공유했습니다.
</p>

#

<br>
<h2>4. 트러블 슈팅</h2>
<span>
  <details>
    <summary>
      <h3>4.1. 스프링 환경에 처음으로 ajax을 이용해 api와 연결 시 오류</h3>
    </summary>
    <ul>
      <li>Python의 프레임 워크인 flask 환경에서 작성한 api만 연결을 했던 경험으로 ajax을 이용해 코드 구성함.</li>
      <li>10일 후 spring 환경에서 작성된 코드들이 ec2로 배포되어 코드가 작동이 되는지 테스트를 하는데 400포트 오류 발생</li>
      <details>
        <summary>수정 전 코드</summary>
        <pre><code>
  $.ajax({
    type: "POST",
    url: "/user/community/post",
    data: {title: title, content: content, created_at: created_at},
    success: function (response) {
      alert(response['msg']);
      window.location.reload();
        </code></pre>
      </details>
      <li>구글링하여 spring은 브라우저에서 XML을 조작하는 것은 JS인데 굳이 XML으로 전달하여 다시 JS로 파싱 할 필요가 없도고 판단하여 JSON 형태로 주고받게 설계되었음을 암.</il>
      <il>ajax GET은 데이터를 받기만 하는 부분이니 제외하고 POST, DELETE, PUT는 json 형태로 백엔드에 넘기게 전체적으로 코드 변경함.</li>
            <details>
        <summary>수정 후 코드</summary>
        <pre><code>
  $.ajax({
    type: "POST",
    url: "/user/community/post",
    data: {title: title, content: content, created_at: created_at},
    contentType: "application/json;",
    success: function (response) {
        console.log(response)
        alert(response['저장되었습니다.']);
        window.location.reload("/community.js");
        </code></pre>
      </details>
      <li>JSON 형태로 바꾸니 데이터들이 잘 넘기고 받을 수 있음을 암.</li>
    </ul>
  </details>
</span>

#

<span>
  <details>
    <summary>
      <h3>4.2. 닉네임을 비교해 삭제 기능 구현 시 버튼이 떴다 안 떳다 하는 </h3>
    </summary>
    <ul>
      <li>백엔드에서 게시물 유저 정보 조회 api, 웹페이지에 저장된 토큰을 조회해 유저 정보 조회 api를 이용해 닉네임이 겹칠 시 삭제 버튼 보이게 구현</li>
      <li>JS 코드 흐름을 잘 몰라 유저 정보를 조회하기 전에 게시물 조회를 해서 닉네임 값을 비교하지 못하는 상황도 생겨 버튼이 랜덤적으로 뜨는 오류 발생</li>
      <details>
        <summary>수정 전 코드 History</summary>
        <a href="https://github.com/alaliyo/final_project_MAP_front/commit/78a9bfb2dfc20823ef1102a2855a340da244c2b1">
        코드 링크</a>
      </details>
      <li> 함수 실행되는 흐름에 대해 공부 시작 <a href="https://doitnow-man.tistory.com/128">참조한 사이트 링크</a></li>
      <li> $(document).ready(function() {} 안에는 유저정보 함수를 넣고 유저 정보 함수 안 success: function () {} 안에 게시물 조회하고 붙이는 함수를 실행하게 하여 해결함.</li>
            <details>
        <summary>수정 후 코드 링크</summary>
        <a href="https://github.com/alaliyo/final_project_MAP_front/blob/06c680e2508edc9e3cca7737fd5d0f98641a27fd/JS/community_comment.js#L29;">
        코드 링크</a>
      </details>
    </ul>
  </details>
</span>


#


