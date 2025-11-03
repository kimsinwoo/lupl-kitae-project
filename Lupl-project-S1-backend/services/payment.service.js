const axios = require('axios');
const { prisma } = require('../config/database');

const approvePayment = async (paymentKey, orderId, amount) => {
  try {
    const secretKey = process.env.TOSS_SECRET_KEY;
    
    if (!secretKey) {
      throw new Error('TOSS_SECRET_KEY is not configured');
    }

    const response = await axios.post(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey,
        orderId,
        amount
      },
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Toss payment error:', error.response?.data || error.message);
    throw new Error('결제 승인 실패: ' + (error.response?.data?.message || error.message));
  }
};

const cancelPayment = async (paymentKey, cancelReason) => {
  try {
    const secretKey = process.env.TOSS_SECRET_KEY;
    
    const response = await axios.post(
      'https://api.tosspayments.com/v1/payments/' + paymentKey + '/cancel',
      {
        cancelReason
      },
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Toss cancel error:', error.response?.data || error.message);
    throw new Error('결제 취소 실패: ' + (error.response?.data?.message || error.message));
  }
};

const processOrderPayment = async (orderId, paymentKey, amount, tossOrderId) => {
  try {
    // 토스페이먼츠에 보낸 형식의 orderId 사용 (접두어 포함)
    const finalOrderId = tossOrderId || orderId;
    const paymentResult = await approvePayment(paymentKey, finalOrderId, amount);
    
    // 실제 주문 ID로 DB 업데이트 (orderId는 이미 접두어 없이 전달됨)
    // 결제 승인 시 받은 실제 금액(세금, 배송비 포함)을 total에 저장
    const finalAmount = Number(amount);
    console.log('💰 Storing final payment amount in DB:', {
      orderId,
      amount: finalAmount,
      note: 'This includes tax, shipping, and all fees'
    });
    
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'paid',
        status: 'processing',
        total: finalAmount // 결제 승인 시 받은 실제 금액 (세금, 배송비 모두 포함)
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
            variant: true
          }
        }
      }
    });

    return {
      order,
      payment: paymentResult
    };
  } catch (error) {
    // 실제 주문 ID로 DB 업데이트 (orderId는 이미 접두어 없이 전달됨)
    // 결제 실패 시에도 amount가 있다면 total에 저장 (실패한 금액 기록)
    const updateData = {
      paymentStatus: 'failed'
    };
    
    // amount가 제공된 경우 실패한 결제 금액도 저장
    if (amount) {
      updateData.total = Number(amount);
      console.log('💰 Storing failed payment amount in DB:', {
        orderId,
        amount: Number(amount),
        note: 'Payment failed but amount recorded'
      });
    }
    
    await prisma.order.update({
      where: { id: orderId },
      data: updateData
    });
    
    throw error;
  }
};

module.exports = {
  approvePayment,
  cancelPayment,
  processOrderPayment
};

