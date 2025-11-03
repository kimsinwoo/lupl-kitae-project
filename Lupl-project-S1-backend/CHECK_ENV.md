# 환경 변수 확인 및 해결 방법

## 문제 해결 단계

### 1. .env 파일 위치 확인
`.env` 파일은 백엔드 루트 디렉토리에 있어야 합니다:
```
Lupl-project-S1-backend/
  ├── .env          ← 여기에 있어야 함
  ├── server.js
  ├── package.json
  └── ...
```

### 2. .env 파일 형식 확인

**올바른 형식:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_SERVICE=gmail
```

**잘못된 형식 (따옴표 불필요):**
```env
EMAIL_USER="your-email@gmail.com"  ← 따옴표 제거
EMAIL_PASSWORD="your-app-password"  ← 따옴표 제거
```

**특수문자가 있는 경우 따옴표로 감싸기:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD="your@password123"  ← @ 같은 특수문자 있으면 따옴표 필요
EMAIL_SERVICE=gmail
```

### 3. 서버 재시작 필수!

환경 변수를 추가하거나 수정한 후에는 **반드시 서버를 재시작**해야 합니다.

```bash
# 서버 중지 (Ctrl+C)
# 그 다음 다시 시작
npm run dev
```

### 4. 서버 시작 시 확인할 것

서버를 시작하면 다음과 같은 메시지가 표시됩니다:

```
✅ .env file loaded successfully

📧 Email Configuration on Startup:
EMAIL_USER: your***  ← 값이 보이면 정상
EMAIL_PASSWORD: ***SET***  ← 이게 보이면 정상
EMAIL_SERVICE: gmail (default)
```

만약 "NOT SET"이 보이면 환경 변수가 로드되지 않은 것입니다.

### 5. 추가 확인

인증 코드를 발송할 때 콘솔에 다음과 같은 디버그 정보가 나타납니다:

```
🔍 Email Configuration Check:
EMAIL_USER: your***
EMAIL_PASSWORD: ***SET***
EMAIL_SERVICE: gmail
EMAIL_HOST: NOT SET
EMAIL_PORT: 587
```

이 정보를 확인하여 어떤 값이 로드되었는지 확인하세요.

