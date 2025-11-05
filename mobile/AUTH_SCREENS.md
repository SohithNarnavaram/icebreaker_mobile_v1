# Authentication Screens Documentation

## Overview
Two new authentication screens have been added to the mobile app: **Sign In** and **Sign Up**. Both screens are currently static and follow the existing design system of the Icebreaker mobile app.

## Files Created
- `mobile/src/pages/SignIn.tsx` - Sign In screen
- `mobile/src/pages/SignUp.tsx` - Sign Up screen

## Design Features

### Common Design Elements
- **Dark Theme**: Black background (#000000) matching the app's theme
- **Color Scheme**:
  - Primary accent: Red (#ff3f41)
  - Secondary accent: Purple (#7856d4)
  - Text colors: White (#FFFFFF), Light gray (#E5E7EB), Medium gray (#9CA3AF)
- **Modern UI**: Rounded corners, semi-transparent backgrounds, smooth shadows
- **Icons**: lucide-react-native icons throughout
- **Responsive**: Keyboard-aware scrolling for better UX

### Sign In Screen Features
- **Header**:
  - Back button for navigation
  - "Sign In" title
- **Fields**:
  - Email input with mail icon and validation
  - Password input with lock icon and show/hide toggle
- **Validations**:
  - Email format validation
  - Password minimum length (6 characters)
  - Real-time error clearing on input
  - Red border on invalid inputs
  - Error messages with alert icons
- **Actions**:
  - Forgot Password link (static)
  - Sign In button (with validation)
  - Social login buttons (Google, Apple - static)
  - Link to Sign Up screen
- **UX Features**:
  - Email keyboard type
  - Password visibility toggle
  - Auto-capitalization disabled for email
  - Keyboard-avoiding view
  - Instant validation feedback

### Sign Up Screen Features
- **Header**:
  - Back button for navigation
  - "Create Account" title
  - 5-step progress bar (purple active, dark gray inactive)
- **Fields**:
  - Full Name input with user icon and validation
  - Email input with mail icon and validation
  - Age input with calendar icon (number pad) and validation
  - Password input with lock icon and show/hide toggle
  - Confirm Password input with lock icon and show/hide toggle
- **Validations**:
  - Name minimum length (2 characters)
  - Email format validation
  - Age range validation (18-100)
  - Password minimum length (8 characters)
  - Password match confirmation
  - Real-time error clearing on input
  - Red border on invalid inputs
  - Error messages with alert icons
- **Actions**:
  - Terms & Privacy Policy links (static)
  - Create Account button (with validation)
  - Social sign up buttons (Google, Apple - static)
  - Link to Sign In screen
- **UX Features**:
  - Appropriate keyboard types for each field
  - Password visibility toggles for both password fields
  - Proper auto-capitalization
  - Keyboard-avoiding view
  - **Dynamic 5-step progress indicator** (updates as fields are filled)
  - Instant validation feedback
  - Visual progress tracking

## Navigation Flow

```
Index Screen
├── "Get Started" → Sign Up Screen
├── "Sign In" → Sign In Screen
└── "Skip for now" → Main App

Sign In Screen
├── "Sign In" button → (Ready for implementation)
├── Social login buttons → (Ready for implementation)
└── "Sign Up" link → Sign Up Screen

Sign Up Screen
├── "Create Account" button → (Ready for implementation)
├── Social login buttons → (Ready for implementation)
└── "Sign In" link → Sign In Screen
```

## Updated Files
- `mobile/App.tsx` - Added SignIn and SignUp screens to navigation stack
- `mobile/src/pages/Index.tsx` - Updated to navigate to auth screens instead of auto-redirecting

## Implementation Status
✅ UI Design Complete
✅ Navigation Setup Complete
✅ Form Inputs Complete
✅ Password Visibility Toggles
✅ Keyboard Handling
✅ Header with Back Button
✅ Dynamic Progress Steps Bar (Sign Up)
✅ Form Validation Complete
✅ Real-time Error Messages
✅ Input Error States
⏳ Backend Integration (Pending)
⏳ Social Authentication (Pending)

## Form Validations

### Sign In Validations
- **Email**:
  - Required field
  - Must be valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Password**:
  - Required field
  - Minimum 6 characters

### Sign Up Validations
- **Name**:
  - Minimum 2 characters (after trimming)
- **Email**:
  - Must be valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Age**:
  - Must be a number
  - Must be between 18 and 100
- **Password**:
  - Minimum 8 characters
- **Confirm Password**:
  - Must match the password field

All validations show error messages with alert icons and red borders on invalid inputs. Errors clear automatically when the user starts typing.

## Next Steps (For Backend Integration)
1. Connect sign in form to authentication API
2. Connect sign up form to user registration API
3. Implement social authentication (Google, Apple)
4. Add loading states during submission
5. Implement "Forgot Password" flow
6. Add navigation to Main app after successful authentication
7. Connect step progression in Sign Up flow
8. Add server-side error handling

## Testing
To test the screens:
1. Run the mobile app
2. On the Index screen, click "Get Started" to see Sign Up screen
3. Click "Sign In" button on Index screen to see Sign In screen
4. Navigate between Sign In and Sign Up using the links at the bottom
5. Use "Skip for now" to access the main app without authentication

## Design Consistency
All design elements match the existing Profile screen and overall app theme:
- Same color palette
- Consistent button styles
- Matching input field designs
- Similar spacing and padding
- Cohesive icon usage

## Design Details

### **Steps Bar** (Sign Up only)
- 5 horizontal segments with dynamic progress
- **Active**: Purple (#7856d4) - matches app's primary color
- **Inactive**: Dark gray (rgba(46, 46, 46, 0.8))
- 3px height with 6px gaps between segments
- Rounded corners for modern look
- **Progress Logic**:
  - Step 1: Name field filled
  - Step 2: Name + Email filled
  - Step 3: Name + Email + Age filled
  - Step 4: Name + Email + Age + Password filled
  - Step 5: All fields filled (including Confirm Password)

### **Header Bar**
- Back button with left arrow icon
- Prominent title text
- Bottom border separator
- Consistent with app's dark theme

