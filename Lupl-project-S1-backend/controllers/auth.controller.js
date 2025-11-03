const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const { email, password, name, phone } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    const user = await authService.register(email, password, name, phone);
    res.status(201).json({
      success: true,
      data: { user },
      message: 'User registered successfully'
    });
  } catch (error) {
    // Handle known errors with appropriate status codes
    if (error.message === 'Email already registered') {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    
    // Handle validation errors
    if (error.message.includes('required') || error.message.includes('Failed to register')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    // Pass other errors to error handling middleware
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json({
      success: true,
      data: result,
      message: 'Login successful'
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    res.json({
      success: true,
      message: 'Password reset link sent to your email'
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    await authService.resetPassword(token, password);
    res.json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    next(error);
  }
};

const kakaoLogin = async (req, res, next) => {
  try {
    const { accessToken } = req.body;
    const result = await authService.kakaoLogin(accessToken);
    res.json({
      success: true,
      data: result,
      message: 'Kakao login successful'
    });
  } catch (error) {
    next(error);
  }
};

// Send verification code for finding user ID
const sendFindIdVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }
    await authService.sendFindIdVerification(email);
    res.json({
      success: true,
      message: 'Verification code sent to your email'
    });
  } catch (error) {
    console.error('❌ Error in sendFindIdVerification:', error);
    const statusCode = error.message.includes('migration') ? 503 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || 'Failed to send verification code'
    });
  }
};

// Find user ID after verification
const findUserId = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const result = await authService.findUserId(email, code);
    res.json({
      success: true,
      data: result,
      message: 'User ID found'
    });
  } catch (error) {
    next(error);
  }
};

// Send verification code for password reset
const sendResetPasswordVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.sendResetPasswordVerification(email);
    res.json({
      success: true,
      message: 'Verification code sent to your email'
    });
  } catch (error) {
    next(error);
  }
};

// Reset password after verification
const resetPasswordWithVerification = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;
    await authService.resetPasswordWithVerification(email, code, password);
    res.json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  kakaoLogin,
  sendFindIdVerification,
  findUserId,
  sendResetPasswordVerification,
  resetPasswordWithVerification
};

