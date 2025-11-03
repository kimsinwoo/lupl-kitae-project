const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { prisma } = require('../config/database');
const emailService = require('./email.service');

const register = async (email, password, name, phone) => {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Create user with error handling for unique constraint violations
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    return user;
  } catch (error) {
    // Handle Prisma unique constraint violation
    if (error.code === 'P2002') {
      // Unique constraint failed
      throw new Error('Email already registered');
    }
    // Re-throw if it's already a custom error
    if (error.message === 'Email already registered') {
      throw error;
    }
    // Handle other Prisma errors
    console.error('Registration error:', error);
    throw new Error('Failed to register user');
  }
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  if (!user.password) {
    throw new Error('Please register first');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token
  };
};

const forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return true;
};

const resetPassword = async (token, password) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword }
    });

    return true;
  } catch (error) {
    throw new Error('Invalid or expired reset token');
  }
};

const kakaoLogin = async (accessToken) => {
  try {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const kakaoUser = response.data;
    const email = kakaoUser.kakao_account?.email;
    const nickname = kakaoUser.kakao_account?.profile?.nickname || kakaoUser.properties?.nickname;

    if (!email) {
      throw new Error('이메일 정보가 없습니다');
    }

    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      try {
        user = await prisma.user.create({
          data: {
            email,
            name: nickname,
            password: null,
            phone: null
          },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true
          }
        });
      } catch (createError) {
        // Handle race condition: user might have been created between findUnique and create
        if (createError.code === 'P2002') {
          // Unique constraint violation - user was created by another request
          user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              createdAt: true
            }
          });
        } else {
          throw createError;
        }
      }
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return {
      user,
      token
    };
  } catch (error) {
    throw new Error('카카오 로그인 실패: ' + error.message);
  }
};

// Send verification code for finding user ID
const sendFindIdVerification = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('User not found with this email');
  }

  await emailService.sendVerificationCode(email, 'findId');
  return true;
};

// Find user ID after email verification
const findUserId = async (email, code) => {
  // Verify code
  await emailService.verifyCode(email, code, 'findId');
  
  // Get user email (ID is email in this case)
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      email: true
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return { email: user.email };
};

// Send verification code for password reset
const sendResetPasswordVerification = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('User not found with this email');
  }

  await emailService.sendVerificationCode(email, 'resetPassword');
  return true;
};

// Reset password after email verification
const resetPasswordWithVerification = async (email, code, newPassword) => {
  // Verify code
  await emailService.verifyCode(email, code, 'resetPassword');
  
  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword }
  });

  return true;
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  kakaoLogin,
  sendFindIdVerification,
  findUserId,
  sendResetPasswordVerification,
  resetPasswordWithVerification
};

