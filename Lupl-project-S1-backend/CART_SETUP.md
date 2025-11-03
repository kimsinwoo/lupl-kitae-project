# Cart API 설정 가이드

## 완료된 작업

1. ✅ Prisma 스키마에 Cart 및 CartItem 모델 추가
2. ✅ Cart 서비스 파일 생성 (`services/cart.service.js`)
3. ✅ Cart 컨트롤러 파일 생성 (`controllers/cart.controller.js`)
4. ✅ Cart 라우트 파일 생성 (`routes/cart.routes.js`)
5. ✅ 서버에 cart 라우트 등록 (`server.js`)
6. ✅ 인증 미들웨어 업데이트 (JWT 토큰 및 세션 지원)
7. ✅ 프론트엔드 API 인터셉터에 JWT 토큰 추가

## 다음 단계 (필수)

### 1. 데이터베이스 마이그레이션 실행

Prisma 스키마에 Cart 모델이 추가되었으므로 마이그레이션을 실행해야 합니다:

```bash
cd Lupl-project-S1-backend
npm run prisma:migrate
```

또는 직접 실행:

```bash
npx prisma migrate dev --name add_cart_models
```

### 2. Prisma 클라이언트 재생성

마이그레이션 후 Prisma 클라이언트를 재생성:

```bash
npm run prisma:generate
```

### 3. 백엔드 서버 재시작

변경사항을 적용하려면 서버를 재시작하세요:

```bash
npm run dev
```

## API 엔드포인트

모든 엔드포인트는 `/api/cart`로 시작하며 인증이 필요합니다.

### GET `/api/cart`
사용자의 장바구니 조회

### POST `/api/cart/add`
장바구니에 상품 추가
```json
{
  "productId": "product-id",
  "variantId": "variant-id",
  "quantity": 1
}
```

### PUT `/api/cart/update/:id`
장바구니 항목 수량 업데이트
```json
{
  "quantity": 2
}
```

### DELETE `/api/cart/remove/:id`
장바구니 항목 삭제

### DELETE `/api/cart/clear`
장바구니 전체 비우기

## 문제 해결

### 404 오류가 계속 발생하는 경우:

1. **마이그레이션 실행 확인**: Prisma 마이그레이션이 성공적으로 완료되었는지 확인
2. **서버 재시작**: 백엔드 서버를 완전히 재시작했는지 확인
3. **라우트 등록 확인**: `server.js`에 `/api/cart` 라우트가 등록되어 있는지 확인
4. **포트 확인**: 백엔드 서버가 올바른 포트(기본: 5001)에서 실행 중인지 확인

### 인증 오류가 발생하는 경우:

1. **로그인 확인**: 사용자가 올바르게 로그인되어 있는지 확인
2. **토큰 저장 확인**: 브라우저 개발자 도구 > Application > Local Storage에서 `token`이 저장되어 있는지 확인
3. **세션 확인**: 백엔드가 세션을 지원하는 경우 쿠키가 전송되는지 확인

