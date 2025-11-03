
## 시드 스크립트 실행

모든 테이블에 샘플 데이터를 추가하려면 다음 명령을 실행하세요:

```bash
npm run seed
```

또는 직접 실행:

```bash
node scripts/seedAll.js
```

## 생성되는 데이터

### 1. 사용자 (Users)
- **Admin**: admin@lupl.kr / admin123456
- **User**: user@lupl.kr / user123456

### 2. 카테고리 (Categories)
- 상의 (tops)
- 하의 (bottoms)
- 아우터 (outerwear)
- 악세서리 (accessories)

### 3. 아티스트 (Artists)
- 3명의 샘플 아티스트 정보

### 4. 상품 (Products)
- 5개의 샘플 상품 (각각 variants 포함)

### 5. 포트폴리오 카테고리 (Portfolio Categories)
- 미디어 아트
- 전시
- 패션
- 콘테스트
- 점자

### 6. 포트폴리오 항목 (Portfolio Items)
- 5개의 샘플 포트폴리오 항목

### 7. 리뷰 (Reviews)
- 2개의 샘플 리뷰

### 8. 주문 (Orders)
- 1개의 샘플 주문 (주문 항목 포함)

### 9. 공지사항 (Announcements)
- 2개의 샘플 공지사항

### 10. 파트너 (Partners)
- 2개의 샘플 파트너

### 11. 문의 (Contacts)
- 2개의 샘플 문의

## 주의사항

⚠️ **기존 데이터 삭제**: 스크립트는 실행 전 기존 데이터를 모두 삭제합니다. 프로덕션 환경에서는 사용하지 마세요!

## 문제 해결

만약 에러가 발생하면:
1. 데이터베이스 연결 확인 (`DATABASE_URL` 환경 변수)
2. 마이그레이션 실행: `npm run prisma:migrate`
3. Prisma 클라이언트 생성: `npm run prisma:generate`

