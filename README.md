# typescript를 이용한 nodejs 웹어플리케이션 제작


## 개발 진행내용
1. 프로젝트 디렉토리 구성 및 개발환경 구축 (12/18)
2. tslint -> deprecated. So use eslint for development (12/18)
3. 라우팅은 controller -> router -> app 순서로 import (12/19)
4. mongodb 연결 및 user스키마 정의를 통한 controller, router처리 (12/21)
5. server.ts 에서 express서버의 설정 및 구동 통일화 (12/21)
6. eslint 코드 컨벤션 확정 및 적용 (12/22)


## 개발 목표
1. typescript의 타입체크 모든 변수 선언, 함수 선언, 인자 정의 등에서 적용
2. typescript의 interface, class의 유연한 활용
3. tsconfig를 사용한 컴파일 옵션, 타입 검수 적응
4. build파일과 dev파일의 분리 script설정
5. eslint <-> vscode 나에게 맞는 설정호환 맞추기
6. NoSQL의 mongodb 도입 및 튜닝 
7. mongoose 사용 및 레퍼런스 정독 + 이해 + 구글링
8. https설정 적용
