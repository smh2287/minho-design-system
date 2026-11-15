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

## NAS 프로젝트 홈 — 2026-11-15 확정

민호가 `_Personal Projects` 아래 폴더 생성을 승인했다.

- NAS 홈: `/volume1/02.S_Minho/01_Projects/_Personal Projects/MinhoDesignSystem`
- `code/`: 현재 코드·문서의 열람용 스냅샷. `.git`·자격 증명은 복사하지 않는다.
- `backups/`: 복원용 Git bundle과 파일 SHA256 목록. 자동 백업이 아닌 수동 검증 시점의 백업이다.
- 루트 `README.md`: 위치·역할·연결 안내.
- Obsidian: `01_Projects/_Personal Projects/MinhoDesignSystem/ProjectDash_MinhoDesignSystem.md`에서 상태·다음 행동 추적.

일반 NAS 파일 접근은 `ssh nas`를 사용한다. Drive API 로그인 만료는 SSH 접근과 무관하며 재로그인이 필요하지 않다.
활성 Git 작업은 PC/Linux 로컬 사본에서 한다. NAS와 `.git` 양방향 동기화를 구성하지 않는다.
기존 PC 경로는 보존하며 NAS 홈과 구별한다. NAS 코드 사본은 수정 전 Git 개발 사본으로 가져와 변경 이력을 남긴다.

## 작업 흐름

1. 작업 전 `git status`, 깨끗한 사본에서 `git pull --ff-only`.
2. 범위가 있는 개선은 `git switch -c design/작업명`에서 진행.
3. 변경 이유·실제 화면·검증 범위를 기록하고 커밋·푸시.
4. 한 작업 사본에서 만든 커밋을 다른 사본은 pull로 받는다. 활성 `.git` 폴더를 Drive/NAS 양방향 동기화로 공유하지 않는다.
5. 승인된 방향만 공통 토큰·부품으로 승격. Fable 보존본을 바꿀 때는 새 실험 디렉터리로 복사한다.

## 미리보기

현재는 파일 직접 열기 또는 README의 로컬 서버. GitHub 저장소는 렌더링된 사이트가 아니다.
GitHub 연동 미리보기는 접근 제어·호스팅 환경을 정해 별도 연결한다. 비공개 저장소가 사이트 비공개까지 보장하지 않는다.
NAS 수동 스냅샷·bundle과 외부 웹 배포·자동 동기화는 별개다. 외부 웹 배포와 자동 주기 동기화는 아직 미구성이다.
