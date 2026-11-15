# 개발과 저장

## 역할

- GitHub private `smh2287/minho-design-system`: 코드·문서·토큰의 버전 기준.
- 작업 PC `E:\Design\MinhoDesignSystem\minho-design-system`: 로컬 Git 작업 사본.
- Linux `projects/minho-design-system`: 에이전트 개발 사본. 작업 PC와 동일 원격 사용.
- 기존 `seed-20261115-2044`: 이전 전달본 보존. 앞으로의 개발 원본으로 사용하지 않음.
- NAS: 대형 원본과 복원 가능한 별도 백업 역할. 아직 백업 자동화·복원 시험을 구성하지 않았다.
- Drive: 필요할 때 공유용 PDF·이미지. 별도 규칙 원본으로 쓰지 않음.

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
