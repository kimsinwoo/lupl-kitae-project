# 이메일 환경 변수 수정 가이드

## 현재 문제

`.env` 파일에 `EMAIL_PASSWORD=Kimsw@1312`로 설정되어 있는데, 특수문자(`@`)가 포함되어 있어 따옴표로 감싸야 할 수 있습니다.

## 해결 방법

### 방법 1: 비밀번호를 따옴표로 감싸기

`.env` 파일을 열어서 다음처럼 수정하세요:

```env
EMAIL_USER=dev.sinwoo@gmail.com
EMAIL_PASSWORD="Kimsw@1312"
EMAIL_SERVICE=gmail
```

### 방법 2: Gmail 앱 비밀번호 사용 (권장)

Gmail을 사용하는 경우 **일반 비밀번호가 아닌 앱 비밀번호**를 사용해야 합니다.

1. Google 계정 설정: https://myaccount.google.com/
2. 보안 → 2단계 인증 활성화
3. 앱 비밀번호 생성:
   - Google 계정 → 보안 → 2단계 인증 → 앱 비밀번호
   - "앱 선택" → "메일"
   - "기기 선택" → "Windows 컴퓨터"
   - 16자리 비밀번호 생성 (예: `abcd efgh ijkl mnop`)

4. `.env` 파일 수정:
```env
EMAIL_USER=dev.sinwoo@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
EMAIL_SERVICE=gmail
```
(앱 비밀번호는 공백 없이 16자리입니다)

### 3. 서버 재시작 필수!

수정 후 반드시 서버를 재시작하세요:

1. 서버 중지 (Ctrl+C)
2. 서버 재시작: `npm run dev`

### 4. 확인

서버 시작 시 다음 메시지가 표시되면 정상입니다:

```
✅ .env file loaded successfully

📧 Email Configuration on Startup:
EMAIL_USER: dev.s***
EMAIL_PASSWORD: ***SET***
EMAIL_SERVICE: gmail (default)
```

## 문제 해결 체크리스트

- [ ] `.env` 파일이 `Lupl-project-S1-backend/` 디렉토리에 있는가?
- [ ] `EMAIL_USER`와 `EMAIL_PASSWORD`가 올바르게 설정되어 있는가?
- [ ] Gmail 사용 시 앱 비밀번호를 사용하는가? (일반 비밀번호 X)
- [ ] 서버를 재시작했는가?
- [ ] 서버 시작 시 환경 변수가 로드되었다는 메시지가 나오는가?

