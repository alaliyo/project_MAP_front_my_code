# project_MAP_front_my_code
<a href="https://github.com/alaliyo/final_project_MAP_front" target="_blank">클릭 시 프로젝트 개요, 아키텍터, 백엔드 팀레포 등 더 상세한 내용을 확인 할 수 있습니다</a>

<br>

<h2>1. 내가 구현한 기능</h2>
<ol>
  <li>웹 페이지의 html, css 설계 및 구현</li>
  <li>api를 ajax으로 연결 및 웹 페이지에 구현</li>
  <li>커뮤니티 기능에 프론트에서 페이징 처리 구현</li>
  <li>로그인 시 스프링환경에서 보내주는 토큰을 웹 페이지 쿠키에 저장</li>
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
<br> 백엔드 개발자와 소통하여 코드를 구성하였으며 하루 하루 완성된 부분들을 다른 개발자들과 공유했습니다.
</p>

#

<br>
<h2>4. 트러블 슈팅</h2>
<span>
  <details>
    <summary>
      <h3>4.1. 스프링 환경에 처음으로 ajax을 이용햐 api와 연결시 문제</h3>
    </summary>
    <ul>
      <li>Python의 프레임 워크인 flask 환경에서 작성한 api만 연결을 했던 경험으로 ajax을 이용해 코드구성함.</li>
      <li>10일 후 spring 환경에서 작성된 코드들이 ec2로 배포되어 코드가 작동이 되는지 테스트를 하는데 400포트 오류발생</li>
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
      <li>구글링하여 ajax이랑 spring은 GET은 상관없으나 POST, DELETE, PUT는 json현태로 넘겨주어야 한다는 것을 알아내어 전체적으로 코드 변경함.</li>
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
    </ul>
  </details>
</span>

#
