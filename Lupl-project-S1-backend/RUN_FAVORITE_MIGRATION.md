# Favorite 기능 마이그레이션 실행 방법

## Lupl 백엔드

Lupl 백엔드에 Favorite 기능을 추가하기 위해 데이터베이스 마이그레이션을 실행해야 합니다.

### 1. 마이그레이션 실행

```bash
cd Lupl-project-S1-backend
npx prisma migrate dev --name add_favorites
npx prisma generate
```

### 2. 서버 재시작

마이그레이션 후 서버를 재시작하세요:

```bash
npm run dev
```

## 완료된 작업

### 백엔드
- ✅ Prisma schema에 Favorite 모델 추가
- ✅ favorite.service.js 생성 (getFavorites, addFavorite, removeFavorite, toggleFavorite)
- ✅ favorite.controller.js 생성
- ✅ favorite.routes.js 생성
- ✅ server.js에 `/api/favorites` 라우트 등록

### 프론트엔드
- ✅ favorite.service.ts 개선 (toggleFavorite API 연동)
- ✅ UserContext에 API 연결 (favorites 로드, toggleFavorite)
- ✅ ProductCard에 하트 버튼 추가
- ✅ ProductDetailPage에 하트 버튼 추가
- ✅ MyPage favorites 탭 실제 데이터 표시

## API 엔드포인트

- `GET /api/favorites` - 찜 목록 조회
- `POST /api/favorites/add` - 찜 추가
- `POST /api/favorites/toggle` - 찜 토글 (추가/제거)
- `DELETE /api/favorites/remove/:productId` - 찜 제거

## 사용 방법

1. 사용자가 로그인하면 자동으로 찜 목록이 로드됩니다
2. ProductCard나 ProductDetailPage에서 하트 버튼을 클릭하면 찜이 추가/제거됩니다
3. MyPage의 "Favorites" 탭에서 찜한 상품을 확인할 수 있습니다

## 주의사항

- 모든 favorite 엔드포인트는 인증이 필요합니다 (authMiddleware)
- 로그인하지 않은 사용자가 찜을 시도하면 "Please login to add favorites" 메시지가 표시됩니다

