# 개발과 저장

## 역할

- GitHub private `smh2287/minho-design-system`: 코드·문서·토큰의 버전 기준.
- 작업 PC `E:\Design\MinhoDesignSystem\minho-design-system`: 로컬 Git 작업 사본.
- Linux `projects/minho-design-system`: 에이전트 개발 사본. 작업 PC와 동일 원격 사용.
- 기존 `seed-20261115-2044`: 이전 전달본 보존. 앞으로의 개발 원본으로 사용하지 않음.
- NAS: 대형 원본과 복원 가능한 별도 백업 역할. 아직 백업 자동화·복원 시험을 구성하지 않았다.
- Drive: 필요할 때 공유용 PDF·이미지. 별도 규칙 원본으로 쓰지 않음.

## 현재 연결 상태 (2026-11-15 갱신)

PC SSH 세션의 Windows Credential Manager 접근 오류를 계정 전체 설정 변경 없이 해결했다.
이 저장소에만 유효한 쓰기 가능한 GitHub deploy key를 PC에서 생성하고 공개키만 GitHub에 등록했다.
개인키는 PC의 로컬 `.git` 안에만 존재하며 저장소·NAS·서버로 복사하지 않는다.
GitHub 공식 meta API의 공개 호스트 키를 사용하고 strict host verification을 유지한다.
PC origin은 SSH URL이고 repo-local core.sshCommand로 이 키만 선택한다.
실제 fetch와 fast-forward, push dry-run에 성공했다. 자동 주기 동기화는 구성하지 않았다.

## NAS 프로젝트 홈 — 사용자 요청, 연결 대기

사용자가 임의의 `E:\Design`보다 기존 NAS project 아래를 프로젝트 홈으로 사용하기를 요청했다.
정확한 NAS project 경로는 확인 중이다. NAS API 인증은 HTTP 401로 만료 상태이며 재로그인이 필요하다.
현재 파일은 이동하지 않았다. 접근 복구 후 다음 구조로 배치한다 (경로는 제안).

- NAS `<기존 project>/MinhoDesignSystem/`: 프로젝트 안내·큰 자산·산출물·복원용 Git bundle.
- GitHub: 코드·문서 변경 이력의 기준 원본.
- PC 로컬 Git clone: 실행·편집용. NAS 홈과 링크로 연결하며 `.git`을 Drive 양방향 동기화하지 않는다.

NAS 홈이 생겼다고 GitHub 업로드·PC pull/push·백업이 모두 같은 기능이 되는 것은 아니다.
NAS 파일 업로드 후 실제 다운로드 해시 검증을 해야 전달 완료로 기록한다.
기존 `E:\Design` 사본은 새 배치 확인 전까지 보존하고 현재 경로를 임의 변경하지 않는다.

## 작업 흐름

1. 작업 전 `git status`, 깨끗한 사본에서 `git pull --ff-only`.
2. 범위가 있는 개선은 `git switch -c design/작업명`에서 진행.
3. 변경 이유·실제 화면·검증 범위를 기록하고 커밋·푸시.
4. 한 작업 사본에서 만든 커밋을 다른 사본은 pull로 받는다. 활성 `.git` 폴더를 Drive/NAS 양방향 동기화로 공유하지 않는다.
5. 승인된 방향만 공통 토큰·부품으로 승격. Fable 보존본을 바꿀 때는 새 실험 디렉터리로 복사한다.

## 미리보기

현재는 파일 직접 열기 또는 README의 로컬 서버. GitHub 저장소는 렌더링된 사이트가 아니다.
GitHub 연동 미리보기는 접근 제어·호스팅 환경을 정해 별도 연결한다. 비공개 저장소가 사이트 비공개까지 보장하지 않는다.
NAS 백업과 외부 웹 배포는 미구성 상태로 명시하고, GitHub 업로드를 이들의 완료로 간주하지 않는다.
