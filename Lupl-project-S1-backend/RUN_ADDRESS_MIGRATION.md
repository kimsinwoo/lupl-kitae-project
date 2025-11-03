# User Address 필드 추가 마이그레이션

## Lupl 백엔드

Lupl 백엔드의 User 모델에 address 필드를 추가하기 위해 데이터베이스 마이그레이션을 실행해야 합니다.

### 1. 마이그레이션 실행

```bash
cd Lupl-project-S1-backend
npx prisma migrate dev --name add_user_address
npx prisma generate
```

### 2. 서버 재시작

마이그레이션 후 서버를 재시작하세요:

```bash
npm run dev
```

## 완료된 작업

### 백엔드
- ✅ Prisma schema에 User 모델에 `address Json?` 필드 추가

### 프론트엔드
- ✅ CheckoutPage에서 user 정보 자동 로드 및 기본값 설정
- ✅ "저장된 주소 사용" / "새로운 주소로 보내기" 옵션 추가
- ✅ AdminDashboard에서 주문 클릭 시 주소 정보 표시 Dialog 추가
- ✅ AdminContext의 Order 인터페이스에 shipping 정보 추가

## 사용 방법

1. **사용자 주소 저장**: MyPage의 Profile 탭에서 주소를 입력하고 저장하면 User 테이블에 저장됩니다.

2. **주문 시 주소 사용**:
   - 로그인한 사용자는 CheckoutPage에서 "저장된 주소 사용"을 선택하면 자동으로 주소가 입력됩니다.
   - "새로운 주소로 보내기"를 선택하면 직접 주소를 입력할 수 있습니다.

3. **어드민 주소 확인**: AdminDashboard의 Orders 탭에서 주문을 클릭하면 주소 정보가 포함된 상세 정보를 볼 수 있습니다.

