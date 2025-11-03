# 찜 기능 에러 해결 방법

## 문제
`500 (Internal Server Error)`가 `/api/favorites/toggle` 엔드포인트에서 발생했습니다.

## 해결 방법

### 1. 서버 재시작
Prisma Client가 업데이트되었으므로 서버를 재시작해야 합니다:

```bash
# 서버 중지 (Ctrl+C)
# 그 다음 재시작
npm run dev
```

또는 Windows에서:
```bash
# 서버 프로세스를 종료한 후
npm run dev
```

### 2. 확인 사항

마이그레이션이 성공적으로 적용되었는지 확인:
```bash
npx prisma migrate status
```

Prisma Client 재생성 (서버가 실행 중이 아닐 때):
```bash
npx prisma generate
```

### 3. 개선된 에러 핸들링

다음과 같이 개선되었습니다:
- ✅ Product 존재 여부 확인 추가
- ✅ 상세한 로그 추가 (디버깅용)
- ✅ Prisma 에러 코드별 처리 (P2002, P2003 등)
- ✅ 더 명확한 에러 메시지

### 4. 테스트

서버 재시작 후 다음을 테스트하세요:
1. 로그인 상태 확인
2. 상품 페이지에서 하트 버튼 클릭
3. 서버 콘솔에서 로그 확인:
   - `🔍 Toggle favorite request:`
   - `✅ Toggle favorite result:`
   - 또는 에러 메시지

### 5. 여전히 문제가 발생하면

서버 콘솔의 에러 메시지를 확인하고, 다음을 체크하세요:
- 데이터베이스 연결 상태
- User ID와 Product ID가 유효한지
- `favorites` 테이블이 생성되었는지 (MySQL에서 확인)

